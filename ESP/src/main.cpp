#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <MQTT.h>
#include <ArduinoJson.h>
#include <time.h>

WiFiClient net;
MQTTClient mqtt;

const char *ssid = "IOT_TTPSC_TRAINING";
const char *password = "G@m3!is0nU";

void messageReceived(String &topic, String &message)
{
}

void setup()
{
    Serial.begin(115200);
    pinMode(D4, OUTPUT);
    digitalWrite(D4, HIGH);

    // WiFi
    WiFi.mode(WIFI_STA);
    WiFi.hostname("Smart Health");
    WiFi.begin(ssid, password);

    Serial.print("\nConnecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.print(" SUCCESS ");
    Serial.println(WiFi.localIP());

    // Time
    configTime(1 * 3600, 0, "pool.ntp.org", "time.nist.gov");

    // MQTT
    Serial.print("\nConnecting to MQTT");
    mqtt.begin("192.168.1.246", net);
    while (!mqtt.connect("SmartHealth")) {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" SUCCESS");

    digitalWrite(D4, LOW);
    // mqtt.onMessage(messageReceived);
    // mqtt.subscribe("led");
}

void loop()
{
    mqtt.loop();
    
    // Temperature and pulse
    StaticJsonDocument<200> object;
    String json;
    time_t now = time(nullptr);
    
    object["temp"] = (rand() % 3) + 35;
    object["pulse"] = (rand() % 30) + 70;
    object["date"] = now;

    serializeJson(object, json);
    mqtt.publish("sensor", json);

    // TODO: przerwanie na timerze
    delay(1000);
}