const Discord = require('discord.js')
module.exports = {

	name: 'bug',
	description: 'Bug report form',
	execute(receivedMessage, arguments) {
        let issue = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Bug report')
        .setURL('https://docs.google.com/forms/d/1OI1u95YOFDQD-TvCLmIUPeGbLSQC_RNag-t6UZ4yXZ8/viewform?edit_requested=true')
        .setThumbnail('https://i.imgur.com/uiFYsou.png')
        .setDescription('Thank you for your help')
        .setTimestamp()
    receivedMessage.channel.send(issue);
        
}}