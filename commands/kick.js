module.exports = {
	name: 'kick',
	description: 'Getting rid of members that are not welcome',
	execute(receivedMessage, arguments) {
		let sender = receivedMessage.member;
		if(arguments.length == 0 || !receivedMessage.mentions.users.size){
            receivedMessage.reply("You didn't tell me who to kick!");
			return;
		}
		else if(!sender.hasPermission('KICK_MEMBERS')){
			receivedMessage.reply("You do not have permission to kick members!");
			return;
		}
		else{
			let member = receivedMessage.guild.member(receivedMessage.mentions.users.first());
			if(member.hasPermission('ADMINISTRATOR')){
				receivedMessage.reply("You can't kick members with administrator permission!");
				return;
			}
			arguments.shift();
			let stringArguments = arguments.join(' ');
			member.kick(stringArguments);
			receivedMessage.channel.send("You successfully kicked " + member.displayName);
		}
	
          
	},
};