const Discord = require('discord.js')
const fetch = require("node-fetch");
module.exports = {
	name: 'joke',
	description: 'Entertain yourself',
	execute(receivedMessage, arguments) {
        let link = "https://jokeapi-v2.p.rapidapi.com/joke/Any?format=json";
        if(arguments.length > 0){
            arguments = arguments.join("%20");
            link = link.concat("&contains=" + arguments)
        }
        fetch(link, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.XRAPID_KEY,
                "x-rapidapi-host": "jokeapi-v2.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.type == "twopart"){
                receivedMessage.channel.send(data.setup + "\n" + data.delivery);
            }
            else{
                receivedMessage.channel.send(data.joke)
            }
        })
        .catch(err => {
            console.error(err);
        });
        
}}
