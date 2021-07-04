const Discord = require('discord.js')
const Sequelize = require('sequelize')
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

const Prefixes = require('../storage/Prefixes')(sequelize, Sequelize.DataTypes);
module.exports = {
	name: 'changeprefix',
	description: 'Changing prefix for your server',
	async execute(receivedMessage, arguments) {
            if(!receivedMessage.member.hasPermission("ADMINISTRATOR")){
                receivedMessage.channel.send("You do not have permissions to change prefix on this server");
                return;
            }
            if(arguments.length == 0){
                receivedMessage.channel.send("You did not provide any prefix!")
                return;
            }
            try {
                const isInDb = await Prefixes.findOne({where: {name: receivedMessage.guild.id}})
                if(isInDb){
                    const changingPrefix = await Prefixes.update({ serverPrefix: arguments[0].toString()}, { where: { name: receivedMessage.guild.id} });  
                    return receivedMessage.channel.send("Sverre prefix for this server has been set to " + arguments[0])
                }
                else{
                    const addedPrefix = await Prefixes.create({
                        name: receivedMessage.guild.id,
                        serverPrefix: arguments[0].toString(),
                    });
                    return receivedMessage.channel.send("Sverre prefix for this server has been set to " + arguments)
                }
                
            }
            catch (e) {
                return console.log(e);
            }
            
        }
}
