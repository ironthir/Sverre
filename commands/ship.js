const Discord = require('discord.js')
const fetch = require("node-fetch");
module.exports = {
	name: 'ship',
	description: 'Calculate love percentage',
	execute(receivedMessage, arguments) {
        function processLovers(name){
            name = name.trim();
            name = name.split(" ");
            name = name.join("%20");
            return name;
        }
        if(!arguments.includes("&")){
            receivedMessage.channel.send("Correct usage: d!ship [first name] & [second name]");
            return;
        }
        arguments = arguments.join(" ")
        arguments = arguments.split("&")
        let fname = processLovers(arguments[0]);
        let sname = processLovers(arguments[1]);
        fetch("https://love-calculator.p.rapidapi.com/getPercentage?fname="+ fname +"&sname=" + sname, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.XRAPID_KEY,
                "x-rapidapi-host": "love-calculator.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(data => {
            switch(true){
                case parseInt(data.percentage, 10) === 0:
                    receivedMessage.channel.send("Great disappointment! There is absolutely no love between " + data.fname + " and " + data.sname + " :cold_face:");
                    break;
                case parseInt(data.percentage, 10) < 30:
                    receivedMessage.channel.send(data.fname + " and " + data.sname + " don't really like each other. Score: " + data.percentage + "% :broken_heart:");
                    break;
                case parseInt(data.percentage, 10) >= 30 && parseInt(data.percentage, 10) < 50:
                    receivedMessage.channel.send("Not great, not terrible. " + data.fname + " and " + data.sname + " are on a good path. Score: " + data.percentage + "% :cupid:");
                    break;
                case parseInt(data.percentage, 10) >= 50 && parseInt(data.percentage, 10) < 80:
                    receivedMessage.channel.send("Good, but not quite there yet. " + data.fname + " and " + data.sname + " scored " + data.percentage + "% on love calculator :heart:");
                    break;
                case parseInt(data.percentage, 10) >= 80 &&  parseInt(data.percentage, 10) < 100:
                    receivedMessage.channel.send(data.fname + " and " + data.sname + " are almost perfect match! They scored " + data.percentage + "% :two_hearts:");
                    break;
                case parseInt(data.percentage, 10) === 100:
                    receivedMessage.channel.send("PERFECT MATCH! " + data.fname + " and " + data.sname + " scored 100%! Quick! Arrange a wedding for these two! :revolving_hearts:");
                    break;
                default:
                    console.log("something went wrong");
            }

        })
        .catch(err => {
            console.error(err);
        });
        }
}
