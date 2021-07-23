from flask import Flask, jsonify
app = Flask(name)

@app.route('/stats')
def index():
    import time
    import board
    import adafruit_dht

    dhtDevice = adafruit_dht.DHT11(board.D4)

    temperature_c = dhtDevice.temperature
    temperature_f = temperature_c * (9 / 5) + 32
    humidity = dhtDevice.humidity

    SensorJson = { 
        "tag": "#01",
        "description": "lolat4z room",
        "picturl" : "ur",
        "sensor": [
            {
                "name": "DHT11T1",
                "sensordescription": "DHT Temp Celsius",
                "value": str(temperature_c)
            },
            {
                "name": "DHT11T2",
                "sensordescription": "DHT Temp Fahrenheit",
                "value": str(temperature_f)
            },
            {
                "name": "DHT11T3",
                "sensordescription": "DHT Humedad",
                "value": str(humidity)
            }
        ]
    }
    return jsonify(SensorJson)

if name == "main":
    app.run(host='0.0.0.0')