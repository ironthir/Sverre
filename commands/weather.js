
const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'weather',
	description: 'Current weather status for your city',
	execute(receivedMessage, arguments) {
		let city = arguments;
		fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&lang=en&appid=' + process.env.WEATHER_TOKEN)
			.then(response => response.json())
			.then(data => {
				const currentWeather = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setTitle('Weather in ' + data.name)
					.setAuthor(receivedMessage.member.displayName, receivedMessage.author.avatarURL())
					.setThumbnail('https://i.imgur.com/uiFYsou.png')
					.addFields(
						{ name: 'Description', value:  data.weather[0].description},
						{ name: 'Cloudiness', value:  data['clouds']['all'] + '%'},
						{ name: 'Rain last hour', value:  data['rain']['1h'] + ' mm'},
						{ name: 'Temperature', value: parseFloat(data['main']['temp'] - 273.15).toFixed(2) + ' °C', inline: true },
						{ name: 'Feels like', value: parseFloat(data['main']['feels_like'] - 273.15).toFixed(2) + ' °C', inline: true },
						{ name: '\u200B', value: '\u200B', inline: true },
						{ name: 'Maximum temperature', value: parseFloat(data['main']['temp_max'] - 273.15).toFixed(2) + ' °C', inline: true },
						{ name: 'Minumum temperature', value: parseFloat(data['main']['temp_min'] - 273.15).toFixed(2) + ' °C', inline: true },
						{ name: 'Humitity', value:  data['main']['humidity'] + '%'},
						{ name: 'Pressure', value:  data['main']['pressure'] + ' hPa'},
						{ name: 'Wind speed', value:  data['wind']['speed'] + ' m/s'},
						{ name: 'Longitude', value:  data['coord']['lon'], inline: true},
						{ name: 'Latitude', value:  data['coord']['lat'], inline: true},
					)
					.setTimestamp();
				receivedMessage.channel.send(currentWeather);
			}).catch(err => receivedMessage.reply("you provided wrong city name!"));

		


}}