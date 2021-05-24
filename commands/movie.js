const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'movie',
	description: 'Current weather status for your city',
	execute(receivedMessage, arguments) {
		let movieName = arguments.join('+');
		fetch('http://www.omdbapi.com/?t=' + movieName + '&apikey=' + process.env.OMDB_TOKEN)
            .then(response => response.json())
            .then(data => {
                const movieData = new Discord.MessageEmbed()
                    .setColor('#00cc99')
                    .setTitle(data.Title)
                    .setAuthor(data.Director)
                    .setDescription(data.Plot)
                    .setThumbnail('https://i.imgur.com/uiFYsou.png')
                    .addFields(
                        { name: 'Released', value: data.Released },
                        { name: 'Runtime', value: data.Runtime },
                        { name: 'Genre', value: data.Genre},
                        { name: 'Writer', value: data.Writer},
                        { name: 'Actors', value: data.Actors},
                        { name: 'Language', value: data.Language},
                        { name: 'Country', value: data.Country},
                        { name: 'Awards', value: data.Awards},
                        { name: 'Internet Movie Database', value: data.Ratings[0]['Value'], inline: true},
                        { name: 'Rotten Tomatoes', value: data.Ratings[1]['Value'], inline: true},
                        { name: 'Metacritic', value: data.Ratings[2]['Value'], inline: true},
                        { name: 'IMDB votes', value: data.imdbVotes},
                        { name: 'Box Office', value: data.BoxOffice},
                        { name: 'Production', value: data.Production},
                    )
                    .setImage(data['Poster'])
                    .setTimestamp()
                    .setFooter('via OMDb API');

                receivedMessage.channel.send(movieData);
            }).catch(err => receivedMessage.channel.send("You provided incorrect name or data for that movie is not available."))
}}