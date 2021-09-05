﻿const Discord = require('discord.js')
const fs = require('fs');
const {prefix} = require('./config.json');
const client = new Discord.Client();
const Sequelize = require('sequelize');
const votekickCooldown = new Set();
const talkedRecentlyExp = new Set();
const talkedRecentlyMoney = new Set();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//databases
const sequelize = new Sequelize({
    database: "d6lsn880r2ke6u",
    username: "lkbyceoovbufyv",
    password: process.env.DB_PASSWORD,
    host: "ec2-63-34-97-163.eu-west-1.compute.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false 
      }
    },
    logging: false,
});

const Prefixes = require('./storage/Prefixes')(sequelize, Sequelize.DataTypes);
const experience = require('./storage/experience')(sequelize, Sequelize.DataTypes);
const money = require('./storage/money')(sequelize, Sequelize.DataTypes);
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("d!commands", {type: ("PLAYING")} )
   
})
//bot tells you its prefix
client.on('message', async (receivedMessage) => {
    let mention = receivedMessage.mentions.users.first();
    let temp = receivedMessage.toString();
    if (mention == client.user && temp.includes("prefix")) {
        let server = await Prefixes.findOne({ where: { name: receivedMessage.guild.id } });
        if(server){
            receivedMessage.channel.send("Hello " + receivedMessage.author.toString() + ". My prefix here is " + server.serverPrefix)
            return;
        }
        else{
            receivedMessage.channel.send("Hello " + receivedMessage.author.toString() + ". My prefix here is d!")
            return;
        }
    }
})
function expRequired(n){
    return 16 * n * n + 150 * n + 100;
}
client.on('message', receivedMessage =>{
    receivedMessageContent = receivedMessage.toString();
    if(receivedMessage.author.id === '273830402022572032' && receivedMessageContent.includes('d!send')){
        receivedMessageContent = receivedMessageContent.split(' ');
        channelID = receivedMessageContent[1];
        receivedMessageContent.shift();
        receivedMessageContent.shift();
        console.log(receivedMessageContent)
        receivedMessageContent = receivedMessageContent.join(' ');
        client.channels.cache.get(channelID.toString()).send(receivedMessageContent);
    }
})
//leveling system
client.on('message', async receivedMessage => {
    //triggering commands
    let mention = receivedMessage.mentions.users.first();
    if(mention == client.user){
        return;
    }
    const isInDb = await Prefixes.findOne({where: {name: receivedMessage.guild.id}})
    if (receivedMessage.content.startsWith(prefix) && !receivedMessage.author.bot && !isInDb) {
        processCommand(receivedMessage, prefix)
        return;
    }
    else if(isInDb){
            if(receivedMessage.content.startsWith(isInDb.serverPrefix) && !receivedMessage.author.bot){
                processCommand(receivedMessage, isInDb.serverPrefix)
                return;
            }
    }
    
    //gaining experience
    if(!talkedRecentlyExp.has(receivedMessage.author.id) && !receivedMessage.author.bot){
        const row = await experience.findOne({where: {serverid: receivedMessage.guild.id, userid: receivedMessage.author.id}})
        let multiplier = 1;
        if(receivedMessage.length < 4){
            multiplier = 0.5;
        }
        else if(receivedMessage.length > 3 && receivedMessage.length < 8){
            multiplier = 0.75;
        }
        else if(receivedMessage.length > 25){
            multiplier = 1.3;
        }
        if(row){
            let pointsAdded = Math.floor(Math.random() * (10 - 4 + 1)) + 4 ;
            pointsAdded *= multiplier;
            pointsAdded = Math.round(pointsAdded);
            experience.increment('points', { by: pointsAdded, where: {userid: receivedMessage.author.id, serverid: receivedMessage.guild.id}});
            if(row.points + pointsAdded > expRequired(row.level)){
                receivedMessage.channel.send("Congratulations <@" + receivedMessage.author.id + ">, you just reached level " + (parseInt(row.level, 10) + 1));
                experience.increment('level', {by: 1, where: {userid: receivedMessage.author.id, serverid: receivedMessage.guild.id}})
            }
           
        }
        else{
            let pointsAdded = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
            pointsAdded = Math.round(pointsAdded * 1.5)
            experience.create({
                serverid: receivedMessage.guild.id,
                userid: receivedMessage.author.id,
                points: pointsAdded,
                level: 0,
            })
        }
        talkedRecentlyExp.add(receivedMessage.author.id);
        setTimeout(() => {
            talkedRecentlyExp.delete(receivedMessage.author.id)
        }, 30000);
    }
     //earning money
    if(receivedMessage.toString().length > 5 &&  !receivedMessage.author.bot && !talkedRecentlyMoney.has(receivedMessage.author.id)){
        const userID = await money.findOne({where: {userID: receivedMessage.author.id}})
        if(userID){
            money.update({ balance: Sequelize.literal('balance + 5') }, { where: { userID: receivedMessage.author.id } }); 
        }
        else{
         await money.create({
                userID: receivedMessage.author.id,
                balance: 6,
            });
        }
        talkedRecentlyMoney.add(receivedMessage.author.id);
        setTimeout(() => {
            talkedRecentlyMoney.delete(receivedMessage.author.id)
        }, 15000);
    }
    
})
//CHCECKING WHICH COMMAND USER TYPED
async function processCommand(receivedMessage, currPrefix) {
    const arguments = receivedMessage.content.slice(currPrefix.length).trim().split(/ +/);
    const command = arguments.shift().toLowerCase();
    if(command.length == 0){
	    receivedMessage.reply('You did not provide any command to execute');
	    return;
    }
    if (command == "votekick"  ) {
        let member = receivedMessage.guild.member(receivedMessage.mentions.users.first())
        if (arguments.length == 0 || !receivedMessage.mentions.users.size) {
            receivedMessage.channel.send("Correct usage 'd!votekick [@user]'")
            //case when you don't provide anything after &votekick
        }else if (receivedMessage.mentions.users.first().bot) {
			receivedMessage.channel.send("We don't do that here")
			return;
		}else if (member.hasPermission('ADMINISTRATOR')) {
            receivedMessage.channel.send("This member has administrator permissions")
            return;
        }
        else if (votekickCooldown.has(receivedMessage.guild.id)) {
            receivedMessage.channel.send("Wait 3 minutes and 30 seconds before typing this again on this server.");
        }else {
            try {
                client.commands.get(command).execute(receivedMessage, arguments);
            } catch (error) {
                console.error(error);
                receivedMessage.reply('there was an error trying to execute that command!');
            }
            votekickCooldown.add(receivedMessage.guild.id);
            setTimeout(() => {
            votekickCooldown.delete(receivedMessage.guild.id);
         }, 210000);
    }
    }
    else{
        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(receivedMessage, arguments);
        } catch (error) {
            console.error(error);
        }
    }
    
    
}
client.login(process.env.TOKEN);
