import machine

class Serial:
  def __init__(self, tx_pin, rx_pin, baudrate):
    tx = machine.Pin(tx_pin)
    rx = machine.Pin(rx_pin)
    self._serial = machine.UART(0, baudrate=baudrate, tx=tx, rx=rx)

  def read(self):
    if self._serial.any():
      data = self._serial.readline()
      return data.decode().strip()
    else:
      return ""