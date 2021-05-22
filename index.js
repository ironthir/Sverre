﻿const Discord = require('discord.js')
const fs = require('fs');
const {prefix} = require('./config.json');
const client = new Discord.Client();
const votekickCooldown = new Set();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("d!commands", {type: ("PLAYING")} )
})
//BOT WELCOMES YOU
client.on('message', (receivedMessage) => {
    let oznaczenie = receivedMessage.mentions.users.first();
    if (oznaczenie == client.user) {
        receivedMessage.channel.send("Hello " +
            receivedMessage.author.toString())
    }
})

//TESTING IF USER TYPED A COMMAND
client.on('message', (receivedMessage) => {
        if (receivedMessage.content.startsWith(prefix)) {
            processCommand(receivedMessage)
    }
    
})

//CHCECKING WHICH COMMAND USER TYPED
function processCommand(receivedMessage) {
    const arguments = receivedMessage.content.slice(prefix.length).trim().split(/ +/);
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
    }else{
        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(receivedMessage, arguments);
        } catch (error) {
            console.error(error);
        }
    }
    
    
}
client.login('ODExNjI5NTQwMDgyMzE5Mzgw.YC0-6Q.RQB6Xi3D4O9AqOxGkQyKTlUhbfo');
