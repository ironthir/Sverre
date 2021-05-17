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
            { name: 'Votekick reasons added!', value: 'Now you can announce why you want to kick a member. Optional feature, "No reason" is displayed when you do not provide one.'},
            { name: 'Disconnect command added!', value: 'It basically allows you to kick Sverre out of a voice channel'},
            { name: 'Playing audio added!', value: 'd!play command has been introduced. It makes Sverre join the voice channel you are connected to. You need to provide a YT URL for it to work, however it is a very early version of this feature so you cannot skip, pause or queue songs.'},
            { name: 'Brand new admin commands', value: 'Kick, ban and remove are the very new commands to help with server administration. Their correct usage is demonstrated in d!commands.'},
            { name: 'Poll command', value: 'Command for making yes/no polls has been added. Polls with user defined options to be added in the future. Check d!commands for details'},
        )
        .setFooter('Build date: 17 of May, 2021', 'https://i.imgur.com/uiFYsou.png')
        .setTimestamp()
    receivedMessage.channel.send(patchNotes);
	},
};
