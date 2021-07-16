module.exports = {
	name: 'Stats',
    description: "this command obtain IOT stats",
    execute(message, args, site){
		const Http = require('http')
		let EndPoint
		let Data = ''
		let Res

		switch (site) { 
			case 'Jatomas':
				EndPoint = 'http://127.0.0.1:3000/jatomas'
				break;
			case 'Lolat4z':
				EndPoint = 'http://127.0.0.1:3000/lolat4z'
				break;
		}

		Http.get(EndPoint, (resp) => {
		resp.on('data', (chunk) => {
			Data += chunk;
		})

		resp.on('end', () => {
			Res = Data 
			populate(message, Res)
		})
		
	}).on("error", (err) => {
		console.log("Error: " + err.message)
	})  
    }
}

function populate(message, res) {
	const Discord = require('discord.js');  
	let Sensors = []
	jsonRes = JSON.parse(res)
	Sensors = jsonRes.sensor
	let SensorsMap = Sensors.map(sensor => {
		return {
			name: sensor.name,
			description: sensor.sensordescription,
			value: sensor.value
		}})

		const Embed = new Discord.MessageEmbed()
		.setTitle(jsonRes.description)
		.setColor(0x00AE86)
		  
		for (i = 0; i < SensorsMap.length; i++) {
		  Embed.addField(SensorsMap[i].description, SensorsMap[i].value, true)
		}
		 
		//  Embed.setImage(res.picturl)
		message.channel.send(Embed) 
}