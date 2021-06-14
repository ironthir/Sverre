const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: './storage/database.sqlite',
});
const experience = require('../storage/experience')(sequelize, Sequelize.DataTypes);
const Discord = require('discord.js')
module.exports = {
	name: 'exp',
	description: 'Search results',
	async execute(receivedMessage, arguments) {
        const target = receivedMessage.mentions.users.first() || receivedMessage.author;
        const user = await experience.findOne({ where: { userid: target.id, serverid: receivedMessage.guild.id } });
        receivedMessage.channel.send(target.tag + " currently has " + user.points + " experience points");
       

}}