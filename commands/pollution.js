
const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'pollution',
	description: 'Current air pollution data',
	execute(receivedMessage, arguments) {
		let city = arguments.join(' '); 
		fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + process.env.WEATHER_TOKEN)
			.then(response => response.json())
			.then(data => {
				city = data[0].name;
               fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + data[0].lat + '&lon='+ data[0].lon +'&appid=' + process.env.WEATHER_TOKEN)
               .then(response => response.json())
               .then(data => {
				   const currentPollution = new Discord.MessageEmbed()
					.setColor('#00cc99')
					.setTitle('Air pollution in ' + city)
					.setAuthor(receivedMessage.member.displayName, receivedMessage.author.avatarURL())
					.setDescription("Type d!pollutioninfo for explanation of these values")
					.setThumbnail('https://i.imgur.com/uiFYsou.png')
					.addFields(
						{ name: 'Air Quality Index', value:  data.list[0]['main']['aqi']},
						{ name: 'PM 2.5', value:  data.list[0]['components']['pm2_5'] + ' µg/m³'},
						{ name: 'PM 10', value:  data.list[0]['components']['pm10'] + ' µg/m³'},
						{ name: 'Carbon monoxide', value:  data.list[0]['components']['co'] + ' µg/m³'},
						{ name: 'Ozone', value:  data.list[0]['components']['o3'] + ' µg/m³'},
						{ name: 'Nitrogen monoxide', value:  data.list[0]['components']['no'] + ' µg/m³'},
						{ name: 'Nitrogen dioxide', value:  data.list[0]['components']['no2'] + ' µg/m³'},
						{ name: 'Sulphur dioxide', value:  data.list[0]['components']['so2'] + ' µg/m³'},
						{ name: 'Ammonia', value:  data.list[0]['components']['nh3'] + ' µg/m³'},
					)
					.setFooter('via OpenWeather')
					.setTimestamp();
				receivedMessage.channel.send(currentPollution);
                   
               }).catch(err => receivedMessage.channel.send("Air pollution data is unavailable for that location."));
			}).catch(err => receivedMessage.channel.send("You provided wrong city name, didn't provide city name at all or air pollution data is not available for this place"));

		


}}