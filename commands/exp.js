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
const experience = require('../storage/experience')(sequelize, Sequelize.DataTypes);
const Discord = require('discord.js')
module.exports = {
	name: 'exp',
	description: 'Current exp points amount',
	async execute(receivedMessage, arguments) {
        function expRequired(n){
			return 16 * n * n + 150 * n + 100;
		}
        const target = receivedMessage.mentions.users.first() || receivedMessage.author;
        const user = await experience.findOne({ where: { userid: target.id, serverid: receivedMessage.guild.id } });
        receivedMessage.channel.send(receivedMessage.guild.member(target).displayName + " currently has " + user.points + " experience points and is " + (expRequired(user.level) - user.points) + "pts away from level " + (user.level + 1));
       

}}