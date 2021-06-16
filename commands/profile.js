const Discord = require('discord.js');
const Canvas = require('canvas');

const Sequelize = require('sequelize');
module.exports = {
	name: 'profile',
	description: 'Profile card',
	async execute(receivedMessage, arguments) {
		function expRequired(n){
			return 16 * n * n + 150 * n + 100;
		}
		const sequelize = new Sequelize('database', 'user', 'password', {
			host: 'localhost',
			dialect: 'sqlite',
			logging: false,
			// SQLite only
			storage: './storage/database.sqlite',
		});
		const experience = require('../storage/experience')(sequelize, Sequelize.DataTypes);
		const description = require('../storage/description')(sequelize, Sequelize.DataTypes);
		const inventory = require('../storage/inventory')(sequelize, Sequelize.DataTypes);
		const money = require('../storage/money')(sequelize, Sequelize.DataTypes);
		const applyText = (canvas, text) => {
			const context = canvas.getContext('2d');
			// Declare a base size of the font
			let fontSize = 40 ;
			let height = 125;
			while (context.measureText(text).width > canvas.width - 205);{
				context.font = `${fontSize -= 6}px SeoulNamsan CM`;
				height -= 1;
			} 
			return [context.font, height];
		};
		const canvas = Canvas.createCanvas(552, 400);
		const context = canvas.getContext('2d');
		const background = await Canvas.loadImage('./images/profile/template.png');
		const target = receivedMessage.mentions.users.first() || receivedMessage.author;
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		let val = applyText(canvas, target.tag.slice(0, -5));
		let size = val[0];
		let h = val[1];
		context.font = size;
		context.fillStyle = '#ffffff';
		context.fillText(target.tag.slice(0, -5), 175, h);

		const user = await experience.findOne({where: {serverid: receivedMessage.guild.id, userid: target.id}})
		let percent = 0;
		let userLevel = 0;
		if(user){
			userLevel = user.level;
			if(userLevel == 0){
				percent = user.points / 100;
			}
			else{
				percent = (user.points - expRequired(user.level - 1))/ (expRequired(user.level) - expRequired(user.level - 1));
			}
			
		}
		let distanceToFill = Math.round(345 * percent);
		percent = Math.round(percent * 100);
		context.fillStyle = "#009994";
    	context.fillRect(164, 174, distanceToFill, 37);
		
		context.font = '28px Saira';
		context.fillStyle = '#ffffff';
		context.fillText(percent + "%", 306, 200);

		context.font = '48px SeoulHangang CBL';
		context.fillStyle = '#ffffff';
		context.fillText("LV. " + userLevel , 418, 55);

		function wrapText(context, text, x, y, maxWidth, lineHeight) {
			var words = text.split(' ');
			var line = '';
	
			for(var n = 0; n < words.length; n++) {
			  var testLine = line + words[n] + ' ';
			  var metrics = context.measureText(testLine);
			  var testWidth = metrics.width;
			  if (testWidth > maxWidth && n > 0) {
				context.fillText(line, x, y);
				line = words[n] + ' ';
				y += lineHeight;
			  }
			  else {
				line = testLine;
			  }
			}
			context.fillText(line, x, y, 250);
		}
		const userDesc = await description.findOne({where: {userid: target.id}})
		if(userDesc){
			context.font = '16px Roboto';
			context.fillStyle = '#009994';
			wrapText(context, userDesc.desc, 253, 280, 245, 24)
		}
		
		const inv = await inventory.findOne({where: {userID: target.id, equipped: true}})
		if(inv){
			context.font = '25px SeoulNamsan CM';
			context.fillStyle = '#009994';
			context.textAlign = "right";
			context.fillText(inv.itemname, 197, 286);

		}
		 const bal = await money.findOne({where: {userID: target.id}})
		if(bal){
		 	context.font = '25px SeoulNamsan CM';
			context.fillStyle = '#009994';
			context.textAlign = "right";
		 	context.fillText("$" + bal.balance, 197, 376);
		 }
		 else{
			context.font = '25px SeoulNamsan CM';
			context.fillStyle = '#009994';
			context.textAlign = "right";
		 	context.fillText("$0");
		 }
		
		const avatar = await Canvas.loadImage(target.displayAvatarURL({ format: 'jpg' }));
		context.beginPath();
		context.arc(96, 113, 55, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();

		context.drawImage(avatar, 36, 53, 120, 120);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile-card.png');
		
		receivedMessage.channel.send(attachment);
		
}}
