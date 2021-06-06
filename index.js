﻿const Discord = require('discord.js')
const fs = require('fs');
const {prefix} = require('./config.json');
const client = new Discord.Client();
const Sequelize = require('sequelize');
const { send } = require('process');
const votekickCooldown = new Set();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});
const Prefixes = sequelize.define('prefixes', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	serverPrefix: Sequelize.STRING,
});
const money = sequelize.define('money', {
	userID: {
		type: Sequelize.STRING,
		unique: true,
	},
	balance: Sequelize.STRING,
});
client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("d!commands", {type: ("PLAYING")} )
    Prefixes.sync();
    money.sync();
})

//BOT WELCOMES YOU
client.on('message', async (receivedMessage) => {
    let oznaczenie = receivedMessage.mentions.users.first();
    if (oznaczenie == client.user) {
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
client.login(process.env.TOKEN);
