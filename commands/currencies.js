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
                { name: 'USD', value: 'American dollar'},
                { name: 'EUR', value: 'Euro'},
                { name: 'GBP', value: 'Pound sterling'},
                { name: 'RUB', value: 'Russian ruble'},
                { name: 'CAD', value: 'Canadian dollar'},
                { name: 'DKK', value: 'Danish krone'},
                { name: 'AUD', value: 'Australian dollar'},
                { name: 'JPY', value: 'Japanese yen'},
                { name: 'MYR', value: 'Ringgit'},
                { name: 'SGD', value: 'Singapore dollar'},
                { name: 'CNH', value: 'Chinese Yuan Renminbi'},
                { name: 'NZD', value: 'New Zealand dollar'},
                { name: 'MXN', value: 'Mexican peso'},
                { name: 'IDR', value: 'Indonesian rupiah'},
                { name: 'TWD', value: 'New Taiwan dollar'},
                { name: 'THB', value: 'Thai baht'},
                { name: 'VND', value: 'Vietnamese đồng'},
            )
            .setTimestamp();
        receivedMessage.channel.send(list);

}}