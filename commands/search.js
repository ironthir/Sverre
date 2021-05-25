const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'search',
	description: 'Search results',
	execute(receivedMessage, arguments) {
        let originalQ = arguments.join(' ');
		let question = arguments.join('%20');
		fetch("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?q=" + question + "&pageNumber=1&pageSize=10&autoCorrect=true", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": process.env.XRAPID_KEY,
            "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
	    }
        })
            .then(response => response.json())
            .then(data => {
				let results = new Discord.MessageEmbed()
						.setColor('#00cc99')
						.setTitle('Search results for ' + originalQ)
						.setAuthor(receivedMessage.member.displayName, receivedMessage.author.avatarURL())
						.setThumbnail('https://i.imgur.com/uiFYsou.png')
						.addFields(
							{ name: data.value[0].title, value: data.value[0].url },
							{ name: data.value[1].title, value: data.value[1].url },
							{ name: data.value[2].title, value: data.value[2].url },
							{ name: data.value[3].title, value: data.value[3].url },
							{ name: data.value[4].title, value: data.value[4].url },
							{ name: data.value[5].title, value: data.value[5].url },
							{ name: data.value[6].title, value: data.value[6].url },
							{ name: data.value[7].title, value: data.value[7].url },
							{ name: data.value[8].title, value: data.value[8].url },
							{ name: data.value[9].title, value: data.value[9].url },
						)
						.setFooter('via Web Search API')
						.setTimestamp();
				receivedMessage.channel.send(results);
            }).catch(err => console.log(err))

}}