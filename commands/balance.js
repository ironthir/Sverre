const Discord = require('discord.js')
const Sequelize = require('sequelize')
module.exports = {
	name: 'balance',
	description: 'Account balance',
	async execute(receivedMessage, arguments) {
        const sequelize = new Sequelize('database', 'user', 'password', {
			host: 'localhost',
			dialect: 'sqlite',
			logging: false,
			// SQLite only
			storage: './storage/database.sqlite',
		});
      const money = require('../storage/money')(sequelize, Sequelize.DataTypes);
      let target = receivedMessage.mentions.users.first() || receivedMessage.author;
      let user = await money.findOne({where: {userID: target.id}});
      if(user){
          receivedMessage.channel.send(receivedMessage.guild.member(target).displayName + " has $" + user.balance);
          return;
      }
      else{
          receivedMessage.channel.send(receivedMessage.guild.member(target).displayName + " has $0");
          return;
      }

}}