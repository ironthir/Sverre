const Discord = require('discord.js');
const Canvas = require('canvas');

const Sequelize = require('sequelize');
module.exports = {
	name: 'profile',
	description: 'Astronomical picture of the day',
	async execute(receivedMessage, arguments) {
		function calculateLogarithm(base, x) {
			var a = Math.log(x);
			var b = Math.log(base);
			return a / b;
		}
		const levels = [];
		
		for(var i = 0; i < 50; i++){
			levels[i] = Math.round(110 + Math.pow((i + 1 + 20 * calculateLogarithm(5, i + 1)), 2));
		}
		const sequelize = new Sequelize('database', 'user', 'password', {
			host: 'localhost',
			dialect: 'sqlite',
			logging: false,
			// SQLite only
			storage: './storage/database.sqlite',
		});
		const experience = require('../storage/experience')(sequelize, Sequelize.DataTypes);
		
		const applyText = (canvas, text) => {
			const context = canvas.getContext('2d');
			// Declare a base size of the font
			let fontSize = 40 ;
			let height = 125;
			while (context.measureText(text).width > canvas.width - 205);{
				// Assign the font to the context and decrement it so it can be measured again
				context.font = `${fontSize -= 6}px SeoulNamsan CM`;
				height -= 1;
				// Compare pixel width of the text to the canvas minus the approximate avatar size
			} 
		
			// Return the result to use in the actual canvas
			return [context.font, height];
		};
		const canvas = Canvas.createCanvas(552, 400);
		const context = canvas.getContext('2d');
		const background = await Canvas.loadImage('./template.png');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		let val = applyText(canvas, receivedMessage.member.displayName);
		let size = val[0];
		let h = val[1];
		context.font = size;
		context.fillStyle = '#ffffff';
		context.fillText(receivedMessage.member.displayName, 175, h);		
		const user = await experience.findOne({where: {serverid: receivedMessage.guild.id, userid: receivedMessage.author.id}})
		let percent = 0;
		if(user){
			percent = user.points / levels[user.level + 1];
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
		context.fillText("LV. " + user.level , 423, 55);
		
		const avatar = await Canvas.loadImage(receivedMessage.author.displayAvatarURL({ format: 'jpg' }));
		context.beginPath();
		context.arc(96, 113, 55, 0, Math.PI * 2, true);
		context.closePath();
		context.clip();

		

		context.drawImage(avatar, 36, 53, 120, 120);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile-card.png');
		
		receivedMessage.channel.send(attachment);
		
}}