  module.exports = {
	name: 'commands',
	description: 'All commands',
	execute(receivedMessage) {
		const Discord = require('discord.js')
		const commandlist = new Discord.MessageEmbed()
    	.setColor('#00cc99')
    	.setTitle('All available commands')
		.setThumbnail('https://i.imgur.com/uiFYsou.png')
		.addFields(
        { name: 'changelog', value: 'Usage: d!changelog'},
        { name: 'votekick', value: 'You can decide fate of a member using this command. Usage: d!votekick [@user] ?[reason]'},
		{ name: 'play', value: 'Join a voice channel and then use d!play [YT URL] and Sverre will play it for you!'},
		{ name: 'disconnect', value: 'When Sverre is on a voice channel that you are in you can use this to kick him from it.'},
		{ name: 'movie', value: 'Get information about a movie by typing d!movie [movie name]'},
		{ name: 'f1results', value: 'Results of a last Formula One race'},
		{ name: 'search', value: 'Search for anything in the internet. Usage d!search [query]'},
		{ name: 'image', value: 'Returns random image. d!image [query]'},
		{ name: 'convertmoney', value: 'Converts money value between currencies. Usage d!convertmoney [amount] [from] [to]. List of supported currencies under d!currencies'},
        { name: 'love', value: 'Cute animal pics. Usage: d!love'},
        { name: 'coffee', value: 'Best wishes for your coffee (only in polish). Usage: d!coffee'},
		{ name: 'joke', value: 'Sverre tells you a joke. Usage: d!joke [theme]'},
		{ name: 'ship', value: 'Love percentage between two people. Usage: d!ship [first name] & [second name]'},
		{ name: 'poll', value: 'Simple yes/no poll. Usage: d!poll [time in minutes] [question to ask]'},
		{ name: 'weather', value: 'Current weather in any city on Earth. Usage: d!weather [city name]. Do not use diacritical marks'},
		{ name: 'forecast', value: 'Weather forecast for your city. Usage: d!forecast [{number of days/hours}{h or d}] [city name] Example: d!forecast 3h warsaw. Do not use diacritical marks'},
		{ name: 'pollution', value: 'Current air pollution data for your city. Usage: d!pollution [city name]. Do not use diacritical marks'},
		{ name: 'covid', value: 'Coronavirus stats for your country. Usage: d!covid [country name]'},
		{ name: 'time', value: 'Current time in any city. Usage: d!time [city name]'},
		{ name: 'kick', value: 'Usage: d!kick [@member] ?[reason]'},
		{ name: 'ban', value: 'Usage: d!ban [@member] ?[number of messages to remove] ?[reason]'},
		{ name: 'remove', value: 'Removing number of messages. Usage: d!remove [number]'},
		{ name: 'changeprefix', value: 'Change prefix for your server. Usage: d!changeprefix [new prefix]'},
		{ name: 'bug', value: 'Use this to gain access to a Google form where you can report encountered issues'},
        )
    .setTimestamp()
    receivedMessage.channel.send(commandlist)
	},
};
