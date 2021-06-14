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
	description: 'Search results',
	async execute(receivedMessage, arguments) {
        const target = receivedMessage.mentions.users.first() || receivedMessage.author;
        const user = await inventory.findAll({ where: { userID: target.id } });
        itemsOwned = '';
        for(var i = 0; i < user.length; i++){
            itemsOwned += user[i].dataValues.itemname;
            itemsOwned += ", "
        }
        itemsOwned = itemsOwned.slice(0, -2);
        receivedMessage.channel.send(target.tag.slice(0, -5) + " currently has " + itemsOwned);
      //  if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
       // return receivedMessage.channel.send(`${target.tag} currently has ${items.map(i => `${i.item.itemname}`).join(', ')}`);

}}