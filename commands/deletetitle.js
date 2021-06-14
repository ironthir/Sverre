const fetch = require("node-fetch");
const Discord = require('discord.js');
const Sequelize = require('sequelize')
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: './storage/database.sqlite',
});

const titles = require("../storage/titles")(sequelize, Sequelize.DataTypes);
module.exports = {
	name: 'deletetitle',
	description: 'Delete your global title',
	async execute(receivedMessage, arguments) {
		const row = await titles.findOne({where: {userid: receivedMessage.author.id}})
        if(row){
            await titles.destroy({where: {userid: receivedMessage.author.id}})
            receivedMessage.channel.send("Successfully removed your title.");
        }
        else{
           receivedMessage.channel.send("You do not have any title.")
           return;
        }
}}