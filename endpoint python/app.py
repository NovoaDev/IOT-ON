#pip3 install paho-mqtt
import json
import paho.mqtt.client as mqtt
import time
import board
import adafruit_dht

id = 'jatomasraspi'
client_name = id + 'TestLola'
client_telemetry_topic = id + '/telemetry'

mqtt_client = mqtt.Client(client_name)
mqtt_client.connect('test.mosquitto.org')

mqtt_client.loop_start()
print("MQTT connected!")
dhtDevice = adafruit_dht.DHT11(board.D4)

while True:
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
    telemetry = json.dumps(SensorJson)
   
    print("Sending telemetry ", telemetry)
    mqtt_client.publish(client_telemetry_topic, telemetry)