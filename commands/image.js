const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'image',
	description: 'Search for images',
	execute(receivedMessage, arguments) {
        let originalQ = arguments.join(' ');
		let question = arguments.join('%20');
		fetch("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="+ question +"&pageNumber=1&pageSize=20&autoCorrect=true", {
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
                        .setImage(data.value[Math.floor(Math.random() * (20 - 0)) + 0].url)
                        .setFooter('via Web Search API')
                        .setTimestamp();
                receivedMessage.channel.send(results);
            }).catch(err => console.log(err))

}}