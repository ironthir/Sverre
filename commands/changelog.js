const Discord = require('discord.js')
module.exports = {
	name: 'changelog',
	description: 'Latest changes!',
	execute(receivedMessage, arguments) {
		const patchNotes = new Discord.MessageEmbed()
        .setColor('#00cc99')
        .setTitle('List of changes since last build')
        .setThumbnail('https://i.imgur.com/uiFYsou.png')
        .addFields( 
            { name: 'Changing prefix is now awailable', value: 'Server administrator can now change prefix of Sverre for their server. Usage: d!changeprefix [new prefix]'},
            { name: 'Ship command added', value: 'Check wheter you are in a good relationship by typing d!ship [first name] [second name]'},
            { name: 'Sverre can tell jokes now', value: 'Type d!joke [optional words which joke must have] to entertain yourself!'},
            
        )
        .setFooter('Build date: 6 of June, 2021', 'https://i.imgur.com/uiFYsou.png')
        .setTimestamp()
    receivedMessage.channel.send(patchNotes);
	},
};
