const fetch = require("node-fetch");
module.exports = {
	name: 'weather',
	description: 'Getting rid of messages',
	execute(receivedMessage, arguments) {
		fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=london&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html", {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "0f9373b1ddmshb1d5bce676adfbdp1a93d0jsn237c60847b17",
				"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
			}
		})
		.then(response => {
			console.log(response);
		})
		.catch(err => {
			console.error(err);
		});
}}