﻿const Discord = require('discord.js')
const fs = require('fs');
const {prefix} = require('./config.json');
const client = new Discord.Client();
const Sequelize = require('sequelize');
const titles = require('./storage/titles');
const votekickCooldown = new Set();
const talkedRecently = new Set();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
function calculateLogarithm(base, x) {
	var a = Math.log(x);
    var b = Math.log(base);
    return a / b;
}
const levels = [];

for(var i = 0; i < 50; i++){
    levels[i] = Math.round(110 + Math.pow((i + 1 + 20 * calculateLogarithm(5, i + 1)), 2));
}

//databases
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: './storage/database.sqlite',
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
    let oznaczenie = receivedMessage.mentions.users.first();
    let temp = receivedMessage.toString();
    if (oznaczenie == client.user && temp.includes("prefix")) {
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
//leveling system
client.on('message', async receivedMessage => {
    if(!talkedRecently.has(receivedMessage.author.id) && !receivedMessage.author.bot){
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
            let pointsAdded = Math.floor(Math.random() * (20 - 14 + 1)) + 14;
            pointsAdded *= multiplier;
            pointsAdded = Math.round(pointsAdded);
            experience.increment('points', { by: pointsAdded, where: {userid: receivedMessage.author.id, serverid: receivedMessage.guild.id}});
            if(row.points > levels[row.level]){
                receivedMessage.channel.send("Congratulations <@" + receivedMessage.author.id + ">, you just reached level " + (parseInt(row.level, 10) + 1));
                experience.increment('level', {by: 1, where: {userid: receivedMessage.author.id, serverid: receivedMessage.guild.id}})
            }
           
        }
        else{
            let pointsAdded = Math.floor(Math.random() * (30 - 14 + 1)) + 14;
            pointsAdded = Math.round(pointsAdded * 1.5)
            experience.create({
                serverid: receivedMessage.guild.id,
                userid: receivedMessage.author.id,
                points: pointsAdded,
                level: 0,
            })
        }
        talkedRecently.add(receivedMessage.author.id);
        setTimeout(() => {
            talkedRecently.delete(receivedMessage.author.id)
        }, 30000);
    }
    
})
//TESTING IF USER TYPED A COMMAND
client.on('message', async receivedMessage => {
    if(receivedMessage.length > 3 && !receivedMessage.author.bot){
        const userID = await money.findOne({where: {userID: receivedMessage.author.id}})
        if(userID){
            money.update({ balance: Sequelize.literal('balance + 4') }, { where: { userID: receivedMessage.author.id } }); 
        }
        else{
            const createdAccount = await money.create({
                userID: receivedMessage.author.id,
                balance: 4,
            });
        }
    }
    const isInDb = await Prefixes.findOne({where: {name: receivedMessage.guild.id}})
    if (receivedMessage.content.startsWith(prefix) && !receivedMessage.author.bot && !isInDb) {
        processCommand(receivedMessage, prefix)
    }
    else if(isInDb){
            if(receivedMessage.content.startsWith(isInDb.serverPrefix) && !receivedMessage.author.bot){
                processCommand(receivedMessage, isInDb.serverPrefix)
            }
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
    }else if(command == "changeprefix"){
        if(!receivedMessage.member.hasPermission("ADMINISTRATOR")){
            receivedMessage.channel.send("You do not have permissions to change prefix on this server");
            return;
        }
        if(arguments.length == 0){
            receivedMessage.channel.send("You did not provide any prefix!")
            return;
        }
        try {
            const isInDb = await Prefixes.findOne({where: {name: receivedMessage.guild.id}})
            if(isInDb){
                const changingPrefix = await Prefixes.update({ serverPrefix: arguments[0].toString()}, { where: { name: receivedMessage.guild.id} });  
                return receivedMessage.channel.send("Sverre prefix for this server has been set to " + arguments[0])
            }
            else{
                const addedPrefix = await Prefixes.create({
                    name: receivedMessage.guild.id,
                    serverPrefix: arguments[0].toString(),
                });
                return receivedMessage.channel.send("Sverre prefix for this server has been set to " + arguments)
            }
           
        }
        catch (e) {
            return console.log(e);
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
client.login('ODExNjI5NTQwMDgyMzE5Mzgw.YC0-6Q.GCEgTn7kfRCbeCO9g7QFqtdTHhI');
