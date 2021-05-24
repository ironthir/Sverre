const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'time',
	description: 'Current time in any city on Earth',
	execute(receivedMessage, arguments) {
		let cityName = arguments.join(' ');
		fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=50836ce1936b69e0671582e5558ff5c8')
            .then(response => response.json())
            .then(data => {
				city = data[0].name;
				fetch('http://api.timezonedb.com/v2.1/get-time-zone?key='+ process.env.TIMEZONE_TOKEN +'&format=json&by=position&lat='+ data[0].lat +'&lng=' + data[0].lon)
					.then(response => response.json())
					.then(data => {
						let a = new Date((data.timestamp - 7200) * 1000);
						let gmt = 'GMT+';
						if(data.gmtOffset < 0){
							gmt = 'GMT';
						}
						let currentTime = new Discord.MessageEmbed()
								.setColor('#00cc99')
								.setTitle('Current time in ' + city)
								.setAuthor(receivedMessage.member.displayName, receivedMessage.author.avatarURL())
								.setThumbnail('https://i.imgur.com/uiFYsou.png')
								.addFields(
									{ name: 'Time', value:  unixToStandard(a)},
									{ name: 'Time zone', value:  data.abbreviation, inline: true},
									{ name: 'GMT offset ', value: gmt.toString() + data.gmtOffset / 3600, inline: true },
									{ name: 'Country', value: data.countryName}
									
								)
								.setFooter('via timezonedb')
								.setTimestamp();
						receivedMessage.channel.send(currentTime);

					}).catch(err => receivedMessage.channel.send("Current time is not available for this location"))
            }).catch(err => receivedMessage.channel.send("Invalid location name or data is unavailable"))
    function unixToStandard(a){
        
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes().toString();
        let sec = a.getSeconds().toString();
        let currentDate = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
        return currentDate;
    }
}}