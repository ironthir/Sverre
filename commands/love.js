module.exports = {
	name: 'love',
	description: 'Lovely animals for you!',
	execute(receivedMessage) {
		imageNumber = Math.floor(Math.random() * 18) + 1;
        receivedMessage.channel.send( {files: ["./images/love/" + imageNumber +".jpg"]})
	},
};
