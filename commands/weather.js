const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'weather',
	description: 'Current weather status for your city',
	execute(receivedMessage, arguments) {
		let city = arguments.join(' '); 
		fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=en&appid='+ process.env.WEATHER_TOKEN)
			.then(response => response.json())
			.then(data => {
				const currentWeather = new Discord.MessageEmbed()
					.setColor('#00cc99')
					.setTitle('Weather in ' + data.name)
					.setAuthor(receivedMessage.member.displayName, receivedMessage.author.avatarURL())
					.setThumbnail('https://i.imgur.com/uiFYsou.png')
					.addFields(
						{ name: 'Description', value:  data.weather[0].description},
						{ name: 'Cloudiness', value:  data['clouds']['all'] + '%'},
						{ name: 'Temperature', value: parseFloat(data['main']['temp'] - 273.15).toFixed(2) + ' °C', inline: true },
						{ name: 'Feels like', value: parseFloat(data['main']['feels_like'] - 273.15).toFixed(2) + ' °C', inline: true },
						{ name: '\u200B', value: '\u200B', inline: true },
						{ name: 'Maximum temperature', value: parseFloat(data['main']['temp_max'] - 273.15).toFixed(2) + ' °C', inline: true },
						{ name: 'Minimum temperature', value: parseFloat(data['main']['temp_min'] - 273.15).toFixed(2) + ' °C', inline: true },
						{ name: 'Humidity', value:  data['main']['humidity'] + '%'},
						{ name: 'Pressure', value:  data['main']['pressure'] + ' hPa'},
						{ name: 'Wind speed', value:  data['wind']['speed'] + ' m/s'},
						{ name: 'Longitude', value:  data['coord']['lon'], inline: true},
						{ name: 'Latitude', value:  data['coord']['lat'], inline: true},
					)
					.setFooter('via OpenWeather')
					.setTimestamp();
				receivedMessage.channel.send(currentWeather);
			}).catch(err => receivedMessage.channel.send("You provided wrong city name or didn't provide city name at all"));
}}