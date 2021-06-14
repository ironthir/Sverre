const Discord = require('discord.js')
const  {Util} = require("discord.js");
const client = new Discord.Client();
module.exports = {
	name: 'disconnect',
	description: 'disconnecting bot from a voice channel',
	execute(receivedMessage, arguments) {
		if(receivedMessage.guild.me.voice.channel == undefined || receivedMessage.member.voice.channel == undefined){
			receivedMessage.reply("Either you or Sverre are not in a voice channel!");
			return;
		}
		if(receivedMessage.guild.me.voice.channel.id != receivedMessage.member.voice.channel.id){
			receivedMessage.reply("You are not on voice channel or bot is not on a voice channel");
			return;
		}
		receivedMessage.guild.me.voice.channel.leave();
}
}
