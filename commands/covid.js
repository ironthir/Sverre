const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'covid',
	description: 'Current weather status for your city',
	execute(receivedMessage, arguments) {
		let countryName = arguments.join('%20');
		fetch('https://covid19-api.com/country?name=' + countryName +  '&format=json')
            .then(response => response.json())
            .then(data => {
				let covidData = new Discord.MessageEmbed()
					.setColor('#00cc99')
                    .setTitle('Latest COVID-19 statistics for ' + data[0].country)
					.setAuthor(receivedMessage.member.displayName, receivedMessage.author.avatarURL())
                    .setThumbnail('https://i.imgur.com/uiFYsou.png')
                    .addFields(
                        { name: 'Confirmed', value: data[0].confirmed},
                        { name: 'Recovered', value: data[0].recovered },
                        { name: 'Critical', value: data[0].critical},
                        { name: 'Deaths', value: data[0].deaths},
                    )
                    .setTimestamp()
                    .setFooter('Stay safe, wear mask');

                receivedMessage.channel.send(covidData);
            }).catch(err => receivedMessage.channel.send("You provided incorrect name of country or data is unavailable"))
}}