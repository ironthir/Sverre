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
    logging: false,
});

const description = require("../storage/description")(sequelize, Sequelize.DataTypes);
module.exports = {
	name: 'setdescription',
	description: 'Set your description',
	async execute(receivedMessage, arguments) {
		let newDescription = arguments.join(' ');
        if(newDescription.length == 0){
            return;
        }
        if(newDescription.length > 128){
            receivedMessage.channel.send("Your description is too long!");
            return;
        }
        const row = await description.findOne({where: {userid: receivedMessage.author.id}})
        if(row){
            const settingDescription = await description.update({ desc: newDescription}, { where: { userid: receivedMessage.author.id} });
            receivedMessage.channel.send("Description has been set.");
        }
        else{
            const addedDescription = await description.create({
                userid: receivedMessage.author.id,
                desc: newDescription,
            });
            receivedMessage.channel.send("Description has been set.");
        }
}}