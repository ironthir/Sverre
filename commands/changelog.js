const Discord = require('discord.js')
module.exports = {
	name: 'changelog',
	description: 'Latest changes!',
	execute(receivedMessage, arguments) {
		const patchNotes = new Discord.MessageEmbed()
        .setColor('#00cc99')
        .setTitle('List of changes since last build')
        .setThumbnail('https://i.imgur.com/uiFYsou.png')
        .addFields( 
            { name: 'Searching introduced', value: 'Search for anything in the internet. Usage d!search [query]'},
            { name: 'Images added', value: 'Returns random image. d!image [query]'},
            { name: 'Exchange rates added', value: 'Converts money value between currencies. Usage d!convertmoney [amount] [from] [to]. List of supported currencies under d!currencies'},
            { name: 'Current time', value: 'Type d!time [city name] to see what time is it in a designated city'},
            { name: 'F1 race results', value: 'Type d!f1results to see results of the last Formula One race'},
            { name: 'Movies', value: 'Type d!movie [movie name] for information about designated movie'},
            { name: 'COVID-19 stats', value: 'Type d!covid [country name] to get latest information about pandemic in your country.'},
            { name: 'Air pollution', value: 'Type d!pollution [city name] to see if you are breathing clean air in your city!'},
            { name: 'Weather forecast added!', value: 'Type d!forecast [{number of days/hours}{h or d}] [city name] to see weather forecast for your city! Example: d!forecast 3h warsaw'},
            { name: 'Weather command introduced!', value: 'You can now check weather in any place on earth just by typing d!weather [city name]. Do not use diacritical marks.'}, 
        )
        .setFooter('Build date: 25 of May, 2021', 'https://i.imgur.com/uiFYsou.png')
        .setTimestamp()
    receivedMessage.channel.send(patchNotes);
	},
};
