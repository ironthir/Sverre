module.exports = {
	name: 'remove',
	description: 'Getting rid of messages',
	execute(receivedMessage, arguments) {
        let sender = receivedMessage.member;
        if(!sender.hasPermission('ADMINISTRATOR')){
			receivedMessage.reply("You do not have permission to remove messages!");
			return;
		}
		if(arguments.length == 0){
            receivedMessage.reply("You didn't tell me amount of messages to delete!");
            return;
        }
        if(arguments[0] > 99){
            receivedMessage.reply("Discord bots are not allowed to remove more than 100 messages at once. Message with command also counts.");
            return;
        }
        if(arguments[0] < 1){
            receivedMessage.reply("Number of messages to delete has to be between 1 and 99")
            return;
        }
        receivedMessage.channel.bulkDelete(parseInt(arguments[0], 10), true);
}}