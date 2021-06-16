  module.exports = {
	name: 'commands',
	description: 'All commands',
	execute(receivedMessage) {
		const Discord = require('discord.js')
		const commandlist = new Discord.MessageEmbed()
    	.setColor('#00cc99')
    	.setTitle('All available commands')
		.setThumbnail('https://i.imgur.com/uiFYsou.png')
		.setDescription('All listed prefixes are the default ones. Type @Sverre prefix to see the prefix on your server')
		.addFields(
        { name: 'votekick', value: 'You can decide the fate of a member by using this command. Usage: d!votekick [@user] ?[reason]'},
		{ name: 'play and disconnect', value: 'Join a voice channel, then use d!play [YT URL] and Sverre will play it for you! Type d!disconnect to stop playing music'},
		{ name: 'movie', value: 'Get information about a movie by typing d!movie [movie name]'},
		{ name: 'f1results', value: 'Results of the latest Formula One race'},
		{ name: 'search', value: 'Search for anything in the internet. Usage d!search [query]'},
		{ name: 'image', value: 'Returns a random image. d!image [query]'},
		{ name: 'convertmoney', value: 'Currency converter. Usage d!convertmoney [amount] [from] [to]. List of supported currencies under d!currencies'},
        { name: 'love', value: 'Cute animal pics. Usage: d!love'},
        { name: 'coffee', value: 'Best wishes for your coffee (only in polish). Usage: d!coffee'},
		{ name: 'joke', value: 'Sverre tells you a joke. Usage: d!joke [theme]'},
		{ name: 'ship', value: 'Sverre will rate how much two people love each other. Usage: d!ship [first name] & [second name]'},
		{ name: 'set/delete description', value: 'Use d!setdescription and d!deldesc to set or delete your description'},
		{ name: 'buy, shop, equip, inventory', value: 'type buy, shop and equip to either purchase an item, equip it, see all available items with their prices or check what you already have'},
		{ name: 'balance and exp', value: `with your or a tagged user's with information about account balance or experience points respectively`},
		{ name: 'profile', value: `Display your or a tagged user's profile card`},
		{ name: 'weather', value: 'Current weather in nearly any city on Earth. Usage: d!weather [city name]. Do not use diacritical marks'},
		{ name: 'forecast', value: 'Weather forecast for your city. Usage: d!forecast [{number of days/hours}{h or d}] [city name] Example: d!forecast 3h warsaw. Do not use diacritical marks'},
		{ name: 'pollution', value: 'Current air pollution data for your city. Usage: d!pollution [city name]. Do not use diacritical marks'},
		{ name: 'apod', value: 'Use it, and Sverre will send you an astronomical picture of the day'},
		{ name: 'covid', value: 'Coronavirus stats for your country. Usage: d!covid [country name]'},
		{ name: 'time', value: 'Current time in nearly any city. Usage: d!time [city name]'},
		{ name: 'kick, ban', value: 'Usage: d!kick [@member] ?[reason] or d!ban [@member] ?[number of messages to remove] ?[reason]' },
		{ name: 'remove', value: 'Removing number of messages. Usage: d!remove [number]'},
		{ name: 'changeprefix', value: `Change Sverre's prefix for your server Usage: d!changeprefix [new prefix]`},
		{ name: 'bug', value: 'Use this to gain access to a Google form where you can report encountered issues'},
        )
    .setTimestamp()
    receivedMessage.channel.send(commandlist)
	},
};
