const Twich = require("tmi.js");

const Options = {
	options: {
		debug: true
		},
		connection: {
			reconnect: true
		},
		identity: {
			username: process.env.PLANTIOT_USERNAME,
			password: process.env.PLANTIOT_TOKEN
		},
		channels: [process.env.PLANTIOT_CHANNEL]
    }

const TwichClient = new Twich.client(Options)

TwichClient.connect()

TwichClient.on("connected", () => {
  	TwichClient.action(process.env.PLANTIOT_CHANNEL,'Holisss holissss')
})

TwichClient.on("chat", (target, ctx, message, self) => {
	//if (self) return
	
	const CommandName = message.trim()

	switch (CommandName) { 
	case '!statslolat4z':
		GetSensorValue(target,'Lolat4z')
		break
	case '!statsjatomas':
		GetSensorValue(target,'Jatomas')
		break
	}
})

function GetSensorValue(target, site) {
	const Http = require('http')
	let EndPoint
	let Data = ''
	let Res

	switch (site) { 
		case 'Jatomas':
			EndPoint = 'http://127.0.0.1:3001/jatomas'
			break;
		case 'Lolat4z':
			EndPoint = 'http://127.0.0.1:3001/lolat4z'
			break;
	}

	Http.get(EndPoint, (resp) => {
	resp.on('data', (chunk) => {
		Data += chunk;
	})
	resp.on('end', () => {
		Res = Data 
		Populate(target, Res)
	})
	}).on("error", (err) => {
		console.log("Error: " + err.message)
	})  
}

function Populate(target, res) {
	let Sensors = []
	JsonRes = JSON.parse(res)
	Sensors = JsonRes.sensor
	let SensorsMap = Sensors.map(sensor => {
		return {
			name: sensor.name,
			description: sensor.sensordescription,
			value: sensor.value
	}})

	let Message = JsonRes.description
	
	for (i = 0; i < SensorsMap.length; i++) {
		Message += ' | ' + SensorsMap[i].description + ': ' + SensorsMap[i].value
	}
	
	TwichClient.say(target, Message)
}