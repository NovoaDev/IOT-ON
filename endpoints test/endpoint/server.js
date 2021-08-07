const express = require('express')
const app = express()
const port = 3000

app.get('/lolat4z', (req, res) => {
	res.json(
		{
			tag: '#01',
			description: 'lolat4z room',
			picturl : 'ur',
			sensor: [
				{
					name: 'DHT11',
					sensordescription: 'Humedad y temperatura',
					value: 2
				}
			]
		}
	)
})

app.get('/stats', (req, res) => {
	res.json(
		{
			tag: '#02',
			description: 'jatomas room',
			picturl : 'ur',
			sensor: [
				{
					name: 'DHT11',
					sensordescription: 'Humedad y temperatura',
					value: 2
				},
				{
					name: 'xx12',
					sensordescription: 'Humedad suelo',
					value: 4
				}
			]
		} 
	)
})

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})

/*   
Ejemplo json schema 
{
	tag: '#01',
	description: 'lolat4z room',
	picturl : 'ur',
	sensor: [
	{
		name: 'DHT11',
		sensordescription: 'Humedad y temperatura',
		value: 2
	}
	]
}

{
	tag: '#02',
	description: 'jatomas room',
	picturl : 'ur',
	sensor: [
	{
		name: 'DHT11',
		sensordescription: 'Humedad y temperatura',
		value: 2
	},
	{
		name: 'xx12',
		sensordescription: 'Humedad suelo',
		value: 4
	}
	]
} */