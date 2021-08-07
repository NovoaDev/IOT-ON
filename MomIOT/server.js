const Express = require('express')
const App = Express()
const Port = 3001

const Mqtt = require('mqtt')
const Client  = Mqtt.connect('mqtt://test.mosquitto.org')

let Lolat4zJson = ''
let JatomasJson = ''

const Id = 'jatomasraspi'
const Client_telemetry_topic = Id + '/telemetry'

Client.on('connect', function () {
	Client.subscribe(Client_telemetry_topic, function (err) {
		if (!err) {
			console.log('Mqtt Connectado')
		} else { 
			console.log(err)
		}
	})
})

Client.on('message', function (topic, message) {
	let JsonRes = JSON.parse(message)
	let environment = JsonRes.description
	switch (environment) {
		case 'lolat4z room':
			Lolat4zJson = JSON.parse(message.toString())
		  break;
		case 'jatomas room':
			JatomasJson = JSON.parse(message.toString())
		  break;
	  }
})

App.get('/lolat4z', (req, res) => {
	res.json(Lolat4zJson)
})

App.get('/jatomas', (req, res) => {
	res.json(JatomasJson)
})

App.listen(Port, () => {
	console.log(`MomIOT at http://localhost:${Port}`)
})	