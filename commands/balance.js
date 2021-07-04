const Discord = require('discord.js')
const Sequelize = require('sequelize')
module.exports = {
	name: 'balance',
	description: 'Account balance',
	async execute(receivedMessage, arguments) {
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