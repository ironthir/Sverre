const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL)

const inventory = require('../storage/inventory')(sequelize, Sequelize.DataTypes);
const Discord = require('discord.js');
module.exports = {
	name: 'equip',
	description: 'Equip owned items',
	async execute(receivedMessage, arguments) {
        let  stringArgs = arguments.join(' ');
        const itemIntended = inventory.findOne({where: {userID: receivedMessage.author.id, itemname: stringArgs}})
        if(!itemIntended){
            receivedMessage.channel.send("You do not have that item. Use **inventory** to see your inventory.");
            return;
        }
        const itemDeEquiped = inventory.findOne({where: {userID: receivedMessage.author.id, equipped: true}})
        if(itemDeEquiped){
            await inventory.update({ equipped: false}, { where: { userID: receivedMessage.author.id} });
        }
        await inventory.update({equipped: true}, {where: {userID: receivedMessage.author.id, itemname: stringArgs}})
        receivedMessage.channel.send("Equipped successfully");


}}