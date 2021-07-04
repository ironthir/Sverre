const fetch = require("node-fetch");
const Discord = require('discord.js');
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const description = require("../storage/description")(sequelize, Sequelize.DataTypes);
module.exports = {
	name: 'deletedesc',
	description: 'Delete your global description',
	async execute(receivedMessage, arguments) {
		const row = await description.findOne({where: {userid: receivedMessage.author.id}})
        if(row){
            await description.destroy({where: {userid: receivedMessage.author.id}})
            receivedMessage.channel.send("Successfully removed your description.");
        }
        else{
           receivedMessage.channel.send("You do not have any description.")
           return;
        }
}}