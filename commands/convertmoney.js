const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'convertmoney',
	description: 'Exchanging money',
	execute(receivedMessage, arguments) {
        if(arguments.length < 3){
            return;
        }
        let amount = arguments[0];
        arguments.shift();
        let from = arguments[0];
        arguments.shift();
        let to = arguments[0];
		fetch("https://currency-exchange.p.rapidapi.com/exchange?to=" + to + "&from=" + from +"&q=" + amount, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.XRAPID_KEY,
                "x-rapidapi-host": "currency-exchange.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                let value = new Discord.MessageEmbed()
                    .setColor('#00cc99')
                    .addFields(
                        { name: amount + ' ' + from + ' is equal to ' + (data * amount).toFixed(2) + ' ' + to, value: '1 ' + from + " = " + data.toFixed(2) + ' ' + to},
                    )
                    .setFooter('Type d!currencies to see all supported exchange rates')
                    .setTimestamp();
				    receivedMessage.channel.send(value);
            }).catch(err => receivedMessage.channel.send("Correct usage: d!convertmoney [amount] [from] [to]. Example: d!convertmoney 5 EUR USD. List of supported currencies: d!currencies"))

}}