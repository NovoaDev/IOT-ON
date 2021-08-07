import json
import paho.mqtt.client as mqtt
import time

id = 'jatomasraspi'
client_name = id + 'nightlight_client'
server_command_topic = id + '/commands'
client_telemetry_topic = id + '/telemetry'

mqtt_client = mqtt.Client(client_name)
mqtt_client.connect('test.mosquitto.org')

mqtt_client.loop_start()

print("MQTT connected!")

def handle_command(client, userdata, message):
    payload = json.loads(message.payload.decode())
    print("Message received:", payload)

    if payload['led_on']:
        print("ON")
    else:
        print("OFF")

mqtt_client.subscribe(server_command_topic)
mqtt_client.on_message = handle_command

i = 0

while True:
    SensorJson = { 
        "tag": "#01",
        "description": "lolat4z room",
        "picturl" : "ur",
        "sensor": [
            {
                "name": "DHT11T1",
                "sensordescription": "DHT Temp Celsius",
                "value": 100+i
            },
            {
                "name": "DHT11T2",
                "sensordescription": "DHT Temp Fahrenheit",
                "value": 200+i
            },
            {
                "name": "DHT11T3",
                "sensordescription": "DHT Humedad",
                "value": 300+i
            }
        ]
    }

    telemetry = json.dumps(SensorJson)

    print("Sending telemetry ", telemetry)

    mqtt_client.publish(client_telemetry_topic, telemetry)

    i += 1

    time.sleep(1)