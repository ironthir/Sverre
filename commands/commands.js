  module.exports = {
	name: 'commands',
	description: 'All commands',
	execute(receivedMessage) {
		const Discord = require('discord.js')
		const commandlist = new Discord.MessageEmbed()
    	.setColor('#0099ff')
    	.setTitle('All available commands')
		.setThumbnail('https://i.imgur.com/uiFYsou.png')
		.addFields(
        { name: 'changelog', value: 'Usage: d!changelog'},
        { name: 'votekick', value: 'You can decide fate of a member using this command. Usage: d!votekick [@user] ?[reason]'},
		{ name: 'play', value: 'Join a voice channel and then use d!play [YT URL] and Sverre will play it for you!'},
		{ name: 'disconnect', value: 'When Sverre is on a voice channel that you are in you can use this to kick him from it.'},
        { name: 'love', value: 'Cute animal pics. Usage: d!love'},
        { name: 'coffee', value: 'Best wishes for your coffee (only in polish). Usage: d!coffee'},
		{ name: 'poll', value: 'Simple yes/no poll. Usage: d!poll [time in minutes] [question to ask]'},
		{ name: 'weather', value: 'Current weather in any city on Earth. Usage: d!weather [city]. Do not use diacritical marks'},
		{ name: 'kick', value: 'Usage: d!kick [@member] ?[reason]'},
		{ name: 'ban', value: 'Usage: d!ban [@member] ?[number of messages to remove] ?[reason]'},
		{ name: 'remove', value: 'Removing number of messages. Usage: d!remove [number]'},
		{ name: 'bug', value: 'Use this to gain access to a Google form where you can report encountered issues'},
        )
    .setTimestamp()
    receivedMessage.channel.send(commandlist)
	},
};
