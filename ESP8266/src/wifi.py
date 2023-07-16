import network

class WiFi:
  def __init__(self, ssid, password):
    wifi = network.WLAN(network.STA_IF)
    wifi.active(True)
    wifi.connect(ssid, password)
    while not wifi.isconnected():
      pass
    self._wifi = wifi
    print("WiFi: Connected")
    print("WiFi: IP address is", wifi.ifconfig()[0])
