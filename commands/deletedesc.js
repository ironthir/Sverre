const fetch = require("node-fetch");
const Discord = require('discord.js');
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
});

const description = require("../storage/description")(sequelize, Sequelize.DataTypes);
module.exports = {
	name: 'deletedesc',
	description: 'Delete your global description',
	async execute(receivedMessage, arguments) {
		const row = await description.findOne({where: {userid: receivedMessage.author.id}})
        if(row){
            await description.destroy({where: {userid: receivedMessage.author.id}})
            receivedMessage.channel.send("Successfully removed your description.");
        }
        else{
           receivedMessage.channel.send("You do not have any description.")
           return;
        }
}}