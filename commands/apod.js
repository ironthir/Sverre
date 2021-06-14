const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'apod',
	description: 'Astronomical picture of the day',
	execute(receivedMessage, arguments) {
		fetch('https://api.nasa.gov/planetary/apod?api_key=' + process.env.NASA_TOKEN)
            .then(response => response.json())
            .then(data => {
               let picture = new Discord.MessageEmbed()
                  .setColor('#00cc99')
                  .setTitle(data.title)
                  .setImage(data.url)
                  .setTimestamp()
                  .setFooter(data.copyright);
              receivedMessage.channel.send(picture);
      }).catch(err => receivedMessage.channel.send("You provided incorrect name or data for that movie is not available."))
}}