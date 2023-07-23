import requests
import time

API_URL = 'http://localhost:8000/nmea'
TRIP_ID = 2

def getNmeaPacket():
  time_ms = round(time.time() * 1000)
  data = "$GPGGA,181908.00,3404.7041778,N,07044.3966270,W,4,13,1.00,495.144,M,29.200,M,0.10,0000*40"
  return {
    "timestamp": time_ms,
    "packet": data,
    "tripId": TRIP_ID,
    "token": ""
  }

req = requests.post(API_URL, json=getNmeaPacket())

print(req.status_code)
print(req.text)

# API: Request payload format
# {
#   "timestamp":"{{nmea_timestamp}}",
#   "packet":{{nmea_packet}},
#   "tripId":"{{trip_id}}",
#   "token":""
# }