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
const client = new Discord.Client();
client.login(process.env.TOKEN);
module.exports = {
	name: 'leaderboard',
	description: 'Displaying current leaderboard',
	async execute(receivedMessage, arguments) {
		const top10 = await experience.findAll({
            where: {
                serverid: receivedMessage.guild.id,
            },
            order: [
                ['points', 'DESC']
            ]
        })
        let message = '**Leaderboard for ' + receivedMessage.guild.name + '**\n';
        for(let i = 0; i < top10.length; i++){
            const User = await client.users.fetch(top10[i].dataValues.userid); 
            message = message.concat(i + 1, '. ', User.username, '#', User.discriminator, ' ', top10[i].dataValues.points, 'p ', '\n');
        }
        receivedMessage.channel.send(message)
	},
    
};