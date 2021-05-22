const Discord = require('discord.js')
module.exports = {
	name: 'changelog',
	description: 'Latest changes!',
	execute(receivedMessage, arguments) {
		const patchNotes = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('List of changes since last build')
        .setThumbnail('https://i.imgur.com/uiFYsou.png')
        .addFields( 
            { name: 'Weather command introduced!', value: 'You can now check weather in any place on earth just by typing d!weather [city name]. Do not use diacritical marks.'},
            { name: 'Votekick reasons added!', value: 'Now you can announce why you want to kick a member. Optional feature, "No reason" is displayed when you do not provide one.'},
            { name: 'Disconnect command added!', value: 'It basically allows you to kick Sverre out of a voice channel'},
           
        )
        .setFooter('Build date: 22 of May, 2021', 'https://i.imgur.com/uiFYsou.png')
        .setTimestamp()
    receivedMessage.channel.send(patchNotes);
	},
};
