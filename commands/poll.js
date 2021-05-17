const Discord = require('discord.js')
module.exports = {
	name: 'poll',
	description: 'Ask the people!',
	execute(receivedMessage, arguments) {
                if(arguments.length == 0){
                        receivedMessage.reply("You didn't ask any question!");
                        return;
                }       
                let sender = receivedMessage.member;
                let time = arguments[0];
                if(isNaN(time)){
                        receivedMessage.reply("Wrong usage!");
                        return;
                }
                arguments.shift();
                let question = arguments.join(' ');
                const pollMessage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(question)
                .setAuthor(sender.displayName, receivedMessage.author.avatarURL())
                .setDescription('React as you wish!')
                .setThumbnail('https://i.imgur.com/uiFYsou.png')
                .setTimestamp()
                .setFooter("Ending in " + time + " minutes.")
                receivedMessage.channel.send(pollMessage).then(sentEmbed => {
                        sentEmbed.react("✅");
                        sentEmbed.react("❌");
                        setTimeout(() => {
                                let votesNo = sentEmbed.reactions.cache.get('❌').count;
                                let votesYes = sentEmbed.reactions.cache.get('✅').count;
                                let results = new Discord.MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle(question)
                                        .setAuthor(sender.displayName, receivedMessage.author.avatarURL())
                                        .setDescription('Results from previous poll')
                                        .setThumbnail('https://i.imgur.com/uiFYsou.png')
                                        .addFields(
                                                { name: 'Votes in favour:', value: votesYes - 1, inline: true },
                                                { name: 'Votes against: ', value: votesNo - 1, inline: true },
                                        )
                                        .setTimestamp()
				receivedMessage.channel.send(results);
                                sentEmbed.delete();
                                receivedMessage.delete();
                        }, time * 60 * 1000);
                })
        }
}
