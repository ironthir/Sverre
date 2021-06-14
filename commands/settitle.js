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
	name: 'settitle',
	description: 'Set your global title',
	async execute(receivedMessage, arguments) {
		let newTitle = arguments.join(' ');
        if(newTitle.length == 0){
            return;
        }
        const row = await titles.findOne({where: {userid: receivedMessage.author.id}})
        if(row){
            const changingTitle = await titles.update({ title: newTitle}, { where: { userid: receivedMessage.author.id} });
        }
        else{
            const addedTitle = await titles.create({
                userid: receivedMessage.author.id,
                title: arguments[0].toString(),
            });
        }
}}