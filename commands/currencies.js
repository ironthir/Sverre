const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'currencies',
	description: 'All currencies supported for exchange',
	execute(receivedMessage, arguments) {
        let list = new Discord.MessageEmbed()
            .setColor('#00cc99')
            .setTitle('All supported currencies')
            .addFields(
                { name: 'USD', value: 'American dollar', inline: true},
                { name: 'EUR', value: 'Euro', inline: true},
                { name: 'GBP', value: 'Pound sterling', inline: true},
                { name: 'RUB', value: 'Russian ruble', inline: true},
                { name: 'CAD', value: 'Canadian dollar', inline: true},
                { name: 'DKK', value: 'Danish krone', inline: true},
                { name: 'AUD', value: 'Australian dollar', inline: true},
                { name: 'JPY', value: 'Japanese yen', inline: true},
                { name: 'MYR', value: 'Ringgit', inline: true},
                { name: 'SGD', value: 'Singapore dollar', inline: true},
                { name: 'CNH', value: 'Chinese Yuan Renminbi', inline: true},
                { name: 'NZD', value: 'New Zealand dollar', inline: true},
                { name: 'MXN', value: 'Mexican peso', inline: true},
                { name: 'IDR', value: 'Indonesian rupiah', inline: true},
                { name: 'TWD', value: 'New Taiwan dollar', inline: true},
                { name: 'THB', value: 'Thai baht', inline: true},
                { name: 'VND', value: 'Vietnamese đồng', inline: true},
            )
            .setTimestamp();
        receivedMessage.channel.send(list);

}}