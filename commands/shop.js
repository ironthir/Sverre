const Discord = require('discord.js')
module.exports = {
	name: 'shop',
	description: 'Search results',
	execute(receivedMessage, arguments) {
        const shelf = new Discord.MessageEmbed()
            .setColor('#00cc99')
            .setTitle('Available items')
            .setThumbnail('https://i.imgur.com/uiFYsou.png')
            .addFields(
                { name: 'Titles', value: '\u200B' },
                { name: 'Master', value: '$2500' },
                { name: 'Grandmaster', value: '$2500' },
                { name: 'Earl', value: '$2500' },
                { name: 'Challenger', value: '$2500' },
                { name: 'Assassin', value: '$2500' },
                { name: 'King', value: '$2500' },
                { name: 'Queen', value: '$2500' },
                { name: 'Prince', value: '$2500' },
                { name: 'Racer', value: '$2500' },
                { name: 'Witcher', value: '$2500' },
                { name: 'Witch', value: '$2500' },
                { name: 'Sorceress', value: '$2500' },
                { name: 'TP Supervisor', value: '$2500' },
                
            )
            .setFooter("Type d!buy [item name]")
            .setTimestamp()
    receivedMessage.channel.send(shelf);

}}
