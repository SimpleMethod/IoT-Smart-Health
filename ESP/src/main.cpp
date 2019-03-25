#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <MQTT.h>
#include <ArduinoJson.h>
#include <time.h>

// Config
//------------------------------------------------
const char *ssid = "NETGEAR2";
const char *password = "8bioniCl32";
const char *mqttAddress = "broker.mqttdashboard.com";
int mqttPort = 1883;

#define ESP_LED LED_BUILTIN
#define BUTTON_1 D4
#define BUTTON_2 D3
#define BUTTON_3 D1
#define TEMP_SENSOR A0

#define REG_LATCH D7
#define REG_CLOCK D6
#define REG_DATA D8
//------------------------------------------------

#define CELSIUS(x) (((x / 1024.0) * 3300) / 10)

WiFiClient net;
MQTTClient mqtt;

typedef enum {NONE = -1, GREEN, ORANGE, RED} LedValue;
typedef enum {DISEASE_3 = 4, DISEASE_2, DISEASE_1} DiseaseValue;
time_t buttons[] = {0, 0, 0};
byte registerData = 0;

void updateRegister()
{
    digitalWrite(REG_LATCH, LOW);
    shiftOut(REG_DATA, REG_CLOCK, LSBFIRST, registerData);
    digitalWrite(REG_LATCH, HIGH);
}

void clearRegister()
{
    registerData = 0;
    updateRegister();
}

void clearDiseaseRegister()
{
    bitClear(registerData, GREEN);
    bitClear(registerData, ORANGE);
    bitClear(registerData, RED);
    updateRegister();
}

void registerBitHigh(int bit)
{
    bitSet(registerData, bit);
    updateRegister();
}

void registerBitLow(int bit)
{
    bitClear(registerData, bit);
    updateRegister();
}

void controlLed(LedValue value)
{
    clearDiseaseRegister();
    registerBitHigh(value);
}

void messageReceived(String &topic, String &message)
{
    if (topic == "drug") {
        int number = message.toInt();
        switch (number) {
            case 0:
                controlLed(GREEN);
                break;
            case 1:
                controlLed(ORANGE);
                break;
            case 2:
                controlLed(RED);
                break;
            default:
                controlLed(NONE);
        }
    }
}

void changeButtonState(int button)
{
    if (buttons[button] != 0) {
        StaticJsonDocument<200> object;
        String json;

        object["from"] = buttons[button];
        object["to"] = time(nullptr);
        switch (button) {
            case 0:
                object["type"] = "Ból głowy";
                registerBitLow(DISEASE_1);
                break;
            case 1:
                object["type"] = "Ból brzucha";
                registerBitLow(DISEASE_2);
                break;
            case 2:
                object["type"] = "Ból stawów";
                registerBitLow(DISEASE_3);
                break;
            default:
                object["type"] = "Nieokreślona";
        }

        serializeJson(object, json);
        mqtt.publish("disease", json);

        buttons[button] = 0;
    } else {
        buttons[button] = time(nullptr);
        switch(button) {
            case 0:
                registerBitHigh(DISEASE_1);
                break;
            case 1:
                registerBitHigh(DISEASE_2);
                break;
            case 2:
                registerBitHigh(DISEASE_3);
                break;
        }
    }
}

void setup()
{
    pinMode(ESP_LED, OUTPUT);
    pinMode(BUTTON_1, INPUT_PULLUP);
    pinMode(BUTTON_2, INPUT_PULLUP);
    pinMode(BUTTON_3, INPUT_PULLUP);
    pinMode(REG_LATCH, OUTPUT);
    pinMode(REG_CLOCK, OUTPUT);
    pinMode(REG_DATA, OUTPUT);

    Serial.begin(115200);
    digitalWrite(ESP_LED, HIGH);

    // WiFi
    WiFi.mode(WIFI_STA);
    WiFi.hostname("Smart Health");
    WiFi.begin(ssid, password);

    Serial.print("\nConnecting to WiFi ...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.print(" SUCCESS ");
    Serial.println(WiFi.localIP());

    // Time
    configTime(1 * 3600, 0, "pool.ntp.org", "time.nist.gov");

    // MQTT
    Serial.print("\nConnecting to MQTT ...");
    mqtt.begin(mqttAddress, mqttPort, net);
    while (!mqtt.connect("SmartHealth")) {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" SUCCESS");

    digitalWrite(ESP_LED, LOW);
    mqtt.onMessage(messageReceived);
    mqtt.subscribe("drug");

    clearRegister();
}

void loop()
{
    mqtt.loop();

    // Diseases
    if (digitalRead(BUTTON_1) == LOW) {
        changeButtonState(0);
    }
    if (digitalRead(BUTTON_2) == LOW) {
        changeButtonState(1);
    }
    if (digitalRead(BUTTON_3) == LOW) {
        changeButtonState(2);
    }

    // Temperature and pulse
    StaticJsonDocument<200> object;
    String json;
    time_t now = time(nullptr);
    
    object["ip"] = WiFi.localIP().toString();
    object["temp"] = CELSIUS(analogRead(A0));
    object["pulse"] = (rand() % 30) + 70;
    object["date"] = now;

    serializeJson(object, json);
    mqtt.publish("sensor", json);

    delay(1000);
}