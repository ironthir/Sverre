const Discord = require('discord.js')
module.exports = {
	name: 'pollutioninfo',
	description: 'Current air pollution data',
	execute(receivedMessage, arguments) {
        const pollutionInfo = new Discord.MessageEmbed()
        .setColor('#00cc99')
        .setTitle('Information about air pollution values')
        .setAuthor(receivedMessage.member.displayName, receivedMessage.author.avatarURL())
        .setThumbnail('https://i.imgur.com/uiFYsou.png')
        .addFields(
            { name: 'Air Quality Index', value:  'Possible values: 1, 2, 3, 4, 5, where 1 means good air and 5 means very poor. [Wikipedia](https://en.wikipedia.org/wiki/Air_quality_index)'},
            { name: 'PM 2.5', value:  'Concentration of fine particles in the air [Wikipedia](https://en.wikipedia.org/wiki/Particulates)'},
            { name: 'PM 10', value:  'Concentration of coarse particulate matter in the air [Wikipedia](https://en.wikipedia.org/wiki/Particulates#Size,_shape_and_solubility_matter) '},
            { name: 'Carbon monoxide', value:  'Carbon monoxide is a colorless, odorless, and tasteless dangerous flammable gas that is slightly less dense than air. [Wikipedia](https://en.wikipedia.org/wiki/Carbon_monoxide)'},
            { name: 'Ozone', value:  'Ozone is a pale blue gas with a distinctively pungent smell. [Wikipedia](https://en.wikipedia.org/wiki/Ozone)'},
            { name: 'Nitrogen monoxide', value: 'An important intermediate in industrial chemistry, nitric oxide forms in combustion systems and can be generated by lightning in thunderstorms. In mammals, including humans, nitric oxide is a signaling molecule in many physiological and pathological processes. [Wikipedia](https://en.wikipedia.org/wiki/Nitric_oxide)'},
            { name: 'Nitrogen dioxide', value:  'Even small day-to-day variations in NO₂ can cause changes in lung function. Chronic exposure to NO₂ can cause respiratory effects including airway inflammation in healthy people and increased respiratory symptoms in people with asthma. [Wikipedia](https://en.wikipedia.org/wiki/Nitrogen_dioxide)'},
            { name: 'Sulphur dioxide', value:  'It is a toxic gas responsible for the smell of burnt matches. It is released naturally by volcanic activity and is produced as a by-product of copper extraction and the burning of fossil fuels contaminated with sulfur compounds. [Wikipedia](https://en.wikipedia.org/wiki/Sulfur_dioxide)'},
            { name: 'Ammonia', value:  'It is a common nitrogenous waste, particularly among aquatic organisms, and it contributes significantly to the nutritional needs of terrestrial organisms by serving as a precursor to food and fertilizers. [Wikipedia](https://en.wikipedia.org/wiki/Ammonia)'},
        )
        .setFooter('via Wikipedia, the free encyclopedia')
        .setTimestamp();
    receivedMessage.channel.send(pollutionInfo);
}}