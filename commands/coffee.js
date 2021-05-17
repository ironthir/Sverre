module.exports = {
	name: 'coffee',
	description: 'Best wishes for your coffee!',
	execute(receivedMessage) {
		imageNumber = Math.floor(Math.random() * (7 - 1)) + 1;
        receivedMessage.channel.send( {files: ["./images/coffee/" + imageNumber +".jpg"]})
	},
};