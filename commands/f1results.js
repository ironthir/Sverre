const fetch = require("node-fetch");
const Discord = require('discord.js')
module.exports = {
	name: 'f1results',
	description: 'results of last Formula One race',
	execute(receivedMessage, arguments) {
		let movieName = arguments.join('+');
		fetch('http://ergast.com/api/f1/current/last/results.json')
            .then(response => response.json())
            .then(data => {
			        const lastRaceP1 = new Discord.MessageEmbed()
                    .setColor('#00cc99')
                    .setTitle(data.MRData.RaceTable.Races[0].raceName)
                    .setAuthor(receivedMessage.member.displayName, receivedMessage.author.avatarURL())
                    .setDescription(data.MRData.RaceTable.Races[0].Circuit.circuitName)
                    .setThumbnail('https://i.imgur.com/uiFYsou.png')
                    .addFields(
                        { name: 'P1', value: data.MRData.RaceTable.Races[0].Results[0].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[0].Driver.familyName, inline: true },
                        { name: 'Constructor', value: data.MRData.RaceTable.Races[0].Results[0].Constructor.name, inline: true },
                        { name: 'Status', value: data.MRData.RaceTable.Races[0].Results[0].status, inline: true },

                        { name: 'P2', value: data.MRData.RaceTable.Races[0].Results[1].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[1].Driver.familyName, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[1].Constructor.name, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[1].status, inline: true },

                        { name: 'P3', value: data.MRData.RaceTable.Races[0].Results[2].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[2].Driver.familyName, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[2].Constructor.name, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[2].status, inline: true },

                        { name: 'P4', value: data.MRData.RaceTable.Races[0].Results[3].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[3].Driver.familyName, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[3].Constructor.name, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[3].status, inline: true },

                        { name: 'P5', value: data.MRData.RaceTable.Races[0].Results[4].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[4].Driver.familyName, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[4].Constructor.name, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[4].status, inline: true },

                        { name: 'P6', value: data.MRData.RaceTable.Races[0].Results[5].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[5].Driver.familyName, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[5].Constructor.name, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[5].status, inline: true },
                        
                        { name: 'P7', value: data.MRData.RaceTable.Races[0].Results[6].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[6].Driver.familyName, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[6].Constructor.name, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[6].status, inline: true },
                        
                        { name: 'P8', value: data.MRData.RaceTable.Races[0].Results[7].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[7].Driver.familyName, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[7].Constructor.name, inline: true },
                        { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[8].status, inline: true },
                    )
                    .setTimestamp()
                    .setFooter('Page 1 out of 3');
                receivedMessage.channel.send(lastRaceP1);
                const lastRaceP2 = new Discord.MessageEmbed()
                .setColor('#00cc99')
                .setThumbnail('https://i.imgur.com/7yevjAj.png')
                .addFields(
                    { name: 'P9', value: data.MRData.RaceTable.Races[0].Results[8].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[8].Driver.familyName, inline: true },
                    { name: 'Constructor', value: data.MRData.RaceTable.Races[0].Results[8].Constructor.name, inline: true },
                    { name: 'Status', value: data.MRData.RaceTable.Races[0].Results[8].status, inline: true },

                    { name: 'P10', value: data.MRData.RaceTable.Races[0].Results[9].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[9].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[9].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[9].status, inline: true },

                    { name: 'P11', value: data.MRData.RaceTable.Races[0].Results[10].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[10].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[10].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[10].status, inline: true },

                    { name: 'P12', value: data.MRData.RaceTable.Races[0].Results[11].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[11].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[11].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[11].status, inline: true },

                    { name: 'P13', value: data.MRData.RaceTable.Races[0].Results[12].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[12].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[12].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[12].status, inline: true },

                    { name: 'P14', value: data.MRData.RaceTable.Races[0].Results[13].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[13].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[13].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[13].status, inline: true },
                    
                    { name: 'P15', value: data.MRData.RaceTable.Races[0].Results[14].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[14].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[14].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[14].status, inline: true },
                    
                    { name: 'P16', value: data.MRData.RaceTable.Races[0].Results[15].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[15].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[15].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[15].status, inline: true },
                )
                .setTimestamp()
                .setFooter('Page 2 out of 3');
            receivedMessage.channel.send(lastRaceP2);
            const lastRaceP3 = new Discord.MessageEmbed()
                .setColor('#00cc99')
                .setThumbnail('https://i.imgur.com/7yevjAj.png')
                .addFields(
                    { name: 'P17', value: data.MRData.RaceTable.Races[0].Results[16].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[16].Driver.familyName, inline: true },
                    { name: 'Constructor', value: data.MRData.RaceTable.Races[0].Results[16].Constructor.name, inline: true },
                    { name: 'Status', value: data.MRData.RaceTable.Races[0].Results[16].status, inline: true },

                    { name: 'P18', value: data.MRData.RaceTable.Races[0].Results[17].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[17].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[17].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[17].status, inline: true },

                    { name: 'P19', value: data.MRData.RaceTable.Races[0].Results[18].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[18].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[18].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[18].status, inline: true },

                    { name: 'P20', value: data.MRData.RaceTable.Races[0].Results[19].Driver.givenName + ' ' + data.MRData.RaceTable.Races[0].Results[19].Driver.familyName, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[19].Constructor.name, inline: true },
                    { name: '\u200B', value: data.MRData.RaceTable.Races[0].Results[19].status, inline: true },
                )
                .setTimestamp()
                .setFooter('Page 3 out of 3. via Ergast API');
            receivedMessage.channel.send(lastRaceP3);


            }).catch(err => receivedMessage.channel.send("Last race results are unavailable"))
}}