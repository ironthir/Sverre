const Discord = require('discord.js')
const Sequelize = require('sequelize')
module.exports = {
	name: 'balance',
	description: 'Search results',
	async execute(receivedMessage, arguments) {
        const sequelize = new Sequelize('database', 'user', 'password', {
			host: 'localhost',
			dialect: 'sqlite',
			logging: false,
			// SQLite only
			storage: './storage/database.sqlite',
		});
      const money = require('../storage/money')(sequelize, Sequelize.DataTypes);
      let user = await money.findOne({where: {userID: receivedMessage.author.id}});
      if(user){
          receivedMessage.channel.send("You have $" + user.balance);
          return;
      }
      else{
          receivedMessage.channel.send("You have $0");
          return;
      }

}}