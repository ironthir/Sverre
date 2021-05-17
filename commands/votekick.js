module.exports = {
	name: 'votekick',
	description: 'Tag a member of whom you want to decide fate',
	cooldown: 300,
	execute(receivedMessage, arguments) {
		const Discord = require('discord.js');
		if (receivedMessage.mentions.members.first() && receivedMessage.guild) {
			let member = receivedMessage.guild.member(receivedMessage.mentions.users.first());
			let id = receivedMessage.mentions.users.first().avatarURL();
			let limit = 6;
			arguments.shift();
			let stringReason = arguments.join(' ');
			if(stringReason.length == 0){
				stringReason = 'No Reason';
			}
			const vtkick = new Discord.MessageEmbed()
					.setColor('RED')
					.setTitle('You are kicking ' + member.displayName)
					.setThumbnail(id)
					.addFields(
						{ name: 'Reason', value: stringReason },
					)
					.setDescription('Three minutes to vote, vote advantage of three is needed!')
					.setTimestamp()
					.setFooter('', '');
				receivedMessage.channel.send(vtkick).then(sentEmbed => {
					sentEmbed.react("✅");
					sentEmbed.react("❌");
					setTimeout(() => {
						let votesNo = sentEmbed.reactions.cache.get('❌').count;
						let votesYes = sentEmbed.reactions.cache.get('✅').count;
						if(votesYes > votesNo && votesYes - votesNo >= 3){
							member.kick()
							const afterkicking = new Discord.MessageEmbed()
							.setColor('RED')
							.setTitle('We kicked ' + member.displayName)
							.setThumbnail(id)
							.addFields(
								{ name: 'Reason', value: stringReason },
							)
							.setDescription('Nobody will miss them')
							.setTimestamp()
							.setFooter('', '');
						receivedMessage.channel.send(afterkicking)
						}
						else {
							const notKicked = new Discord.MessageEmbed()
								.setColor('GREEN')
								.setTitle('You are safe ' + member.displayName)
								.setThumbnail(id)
								.setDescription('For now...')
								.setTimestamp()
								.setFooter('', '');
								receivedMessage.channel.send(notKicked);
						}
						sentEmbed.delete();
						receivedMessage.delete();
					  }, 180000);
				})  	
		}
		
	},
};
