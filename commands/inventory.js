const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database: "d6lsn880r2ke6u",
  username: "lkbyceoovbufyv",
  password: process.env.DB_PASSWORD,
  host: "ec2-63-34-97-163.eu-west-1.compute.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  },
  logging: false,
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