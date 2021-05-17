module.exports = {
	name: 'ban',
	description: 'Getting rid of members that are not welcome',
	execute(receivedMessage, arguments) {
		let sender = receivedMessage.member;
		if(arguments.length == 0 || !receivedMessage.mentions.users.size){
            receivedMessage.reply("You didn't tell me who to ban!");
			return;
		}
		else if(!sender.hasPermission('BAN_MEMBERS')){
			receivedMessage.reply("You do not have permission to ban members!");
			return;
		}
		else{
			let member = receivedMessage.guild.member(receivedMessage.mentions.users.first());
			if(member.hasPermission('ADMINISTRATOR')){
				receivedMessage.reply("You can't ban members with administrator permission!");
				return;
			}
			if(arguments[1] >= 0 && arguments[1] <= 7){
				let day = arguments[1];
				arguments.shift();
				arguments.shift();
				stringArguments = arguments.join(' ');
				member.ban({days: day, reason: stringArguments});
				receivedMessage.channel.send("You successfully banned " + member.displayName);
			}
			else{
				member.ban({reason: arguments.slice(1)});
				receivedMessage.channel.send("You successfully banned " + member.displayName);
			}
			
		}
	
          
	},
};