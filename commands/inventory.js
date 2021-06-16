const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: './storage/database.sqlite',
});
const inventory = require('../storage/inventory')(sequelize, Sequelize.DataTypes);
const Discord = require('discord.js')
module.exports = {
	name: 'inventory',
	description: 'Displaying user inventory',
	async execute(receivedMessage, arguments) {
        const target = receivedMessage.mentions.users.first() || receivedMessage.author;
        const user = await inventory.findAll({ where: { userID: target.id } });
        if(user.length == 0){
            receivedMessage.channel.send(target.tag + " has nothing");
            return;
        }
        itemsOwned = '';
        for(var i = 0; i < user.length; i++){
            itemsOwned += user[i].dataValues.itemname;
            itemsOwned += ", "
        }
        itemsOwned = itemsOwned.slice(0, -2);
        receivedMessage.channel.send(target.tag.slice(0, -5) + " currently has " + itemsOwned);

}}