const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: './storage/database.sqlite',
});
const money = require('../storage/money')(sequelize, Sequelize.DataTypes);
const inventory = require('../storage/inventory')(sequelize, Sequelize.DataTypes);
const shop = require('../storage/shop')(sequelize, Sequelize.DataTypes);
const Prefixes = require('../storage/Prefixes')(sequelize, Sequelize.DataTypes);
module.exports = {
	name: 'buy',
	description: 'Buying',
	async execute(receivedMessage, arguments) {
        let namePassed = arguments.join(' ');
		let itemIntended = await shop.findOne({where: {name: namePassed}})
        let currPrefix = "d!";
        let dbPrefix = await Prefixes.findOne({where: {name: receivedMessage.guild.id}})
        if(dbPrefix){
            currPrefix = dbPrefix.serverPrefix; 
        }
        if(!itemIntended){
            receivedMessage.channel.send("Item that you want to buy is not available in the shop. Type " + currPrefix + "shop to get the list of all items.");
            return;
        }
        let userBalance = await money.findOne({where: {userID: receivedMessage.author.id}});
        if(!userBalance){
            receivedMessage.channel.send("Something went wrong! You probably do not have any money :c");
            return;
        }
        if(itemIntended.cost > userBalance.balance){
            receivedMessage.channel.send("You do not have enough money to afford that!");
            return;
        }
        let userInv = await inventory.findOne({where: {userID: receivedMessage.author.id, itemname: namePassed}})
        if(userInv){
            receivedMessage.channel.send("You already have that item!");
            return;
        }
        await money.decrement('balance', { by: itemIntended.cost, where: {userID: receivedMessage.author.id}});
        receivedMessage.channel.send("You successfully bought " + namePassed);
        const itemBought =  await inventory.create({
            userID: receivedMessage.author.id,
            itemname: namePassed,
            equiped: false,
        })
        
        
}};