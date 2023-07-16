#import machine
#import time
#import network
#import urequests
from firebase import Firebase
#from serial import Serial
#from wifi import WiFi
#import json
#import time

## PARAMS ##

WIFI_SSID = ""
WIFI_PWD = ""

SERIAL_TX_PIN = 1 # GPIO 01
SERIAL_RX_PIN = 3 # GPIO 03
SERIAL_BAUDRATE = 9600

FIREBASE_KEY = "./secrets/private-key.json"
FIREBASE_URL = "https://nmea-racedata-default-rtdb.europe-west1.firebasedatabase.app/"
FIREBASE_PATH = "/test"

FIREBASE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxFfv9FHQFcQUn\nz4CxGc4NrHu0flmlGrcgGON0/DoaJc3CSHcKwKbSryb3rS31L/Kr+QlG7SUlI0ts\nZu6wi1eTRMx4gK9SdzrzzR3wVrUSLd1EfVINjFXsfZpw+YDYZ4DhGnpt1Nr/aJp2\nablLVARUPj2+iwwmR3ZJOVFIgC2pzHL6yOZTCKRADrvXZcPdBgbqn7Mc/osfwQnN\nZv+wa+gpCI/vhfOgZq8W9kXJogUoTi8Z2bK9RouWG9cW4UZsbeIZiID9Y8+usEPv\nE84Rkym9uswncAsq/hZ3W/EBIFk5yC2cMRUa0lvUeH7zFkOm0RjuZqO/s/s/mI3X\npl/wvPLtAgMBAAECggEAUk7Skd340zKl38wdl7NTx5083ja/+fKB3URULGKzqsWZ\nbkz6L6A9qb1JUmNG8ih4FaCpxDKjSjCudNMe7CXH7aZTl0rQsnbCiuDyomvau3lf\n196bzbpFkacLqqj9TxhEmdwRvYzqwT3gVVtsiWuim3lWf4Lngb9DZmNiuV0CXGHn\n0DXSXg9XHBhsA2dEzxaje9IAcFTNtqurK75ESkyfWoLh0bOgm2Z5hgEGifvADSVX\nsul9F2YNrVKy3t8IMW48WUh/o4kXl4LJnuqG0wN5eQMgpRwv9yLNQOJXWOzTADMu\nMndpBb1gqhWyBGmB7BWCNmAFwOnFJeV92hjwVOzobQKBgQD0yT9ZFtVgRqnTjPo+\npYovmDP+bt5AXf8+HpsHT2EIGBAUxb7OE7VVljD2rQH3QooE2UFjVECbtIQkptE9\nq7tfRvtz8EaY9Mh6Ctnne2P4Fx2cCbC4GT8OaQXMmfHeGaot45Kla+ggndx7YjxO\nWtIzsauPGrpFGTmg2x/CqKX8kwKBgQC5MsaacGr+BcCUUUiqmp2lduYz++nMg3hp\nXfyfLj+QZLmMOimOoH4K7aAmSMDQQxdrElqBeZYtcFFYC8BE/XS70t8iplMiTIe1\n+d/GwWVsDkzDQ12s8ww0MGTHxRSDPDxvf/YN4eiBSr4q7h3eoDO4wTzXGeG3kIkZ\nnbp0ypaCfwKBgQCtBS6MlxIdKfVR/ZzH+RRSjd96YP0hPA905gcoRJhOM0vyks9K\nNC4BH9beFO2Fyvdpc/K+9cdxB0g769mMIL2hG7gSe+w6oxKtCMx6zQGdUyFvsH3D\nsryaP+uEce++0B80rl1yJXJ+03YLlCUSMSnQti2QShENVEYih5/MZI5mlwKBgFRk\nNuwZXifzJxZvE9XqLvw/ehcmLBvtrOkW0w8WXBDIVWT4/AbqS4VfUyMe8/3zFLDN\n5EArz6tVCzw73pmRhagxJ0z6zddLWGwsOTSw3C6pNYGlKQKunlkJ1GLUA8zpngCR\nJuackv6XuKCHcUUJa4g9RiQevySO0GrD3TtrNbqxAoGBALixBHP8oqLCmglcfQf8\nDifPKRTMEGiLPykNxbUuTOKRIvrBbEpIO6+KFRN9g4VGTdbm29B2IbNZxOtWF7p4\nKh0TxsjyI0WLfAW3J7Hg1Bub6Ku+M2E2R0gumXUGs07h1AGOgzPrzbzdqto5IaDp\nZ0Lyi8+4gHBhu/cesmAwGAqE\n-----END PRIVATE KEY-----\n"
  

## INIT ##

_firebase = Firebase(FIREBASE_URL)
_firebase.authenticate(FIREBASE_PRIVATE_KEY)


#_serial = Serial(SERIAL_TX_PIN, SERIAL_RX_PIN, SERIAL_BAUDRATE)

#_wifi = WiFi(WIFI_SSID, WIFI_PWD)

## MAIN ##

"""while True:
  data = Serial.read()
  if data:
    if data.startswith("$") and data.endswith("\r\n"):
      print(data)
    else:
      print("Not NMEA data: " + data)"""

# Save to DB
# Add timestamp {"timestamp":"Nmea"}

#_firebase.save('{"k2":"v2"}')
print("Completed")