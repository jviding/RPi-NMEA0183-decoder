import re
import serial
import binascii
from threading import Thread

SERIAL_PORT = '/dev/ttyS0'
SERIAL_BAUDRATE = 9600
SERIAL_TIMEOUT = 1

ser = serial.Serial(
  port=SERIAL_PORT,
  baudrate=SERIAL_BAUDRATE,
  parity=serial.PARITY_NONE,
  stopbits=serial.STOPBITS_ONE,
  bytesize=serial.EIGHTBITS,
  timeout=SERIAL_TIMEOUT
)

def getBufferedBytes():
  bytes_buffered = ser.in_waiting
  if bytes_buffered > 0:
    return ser.read(bytes_buffered)
  else:
    return ''

while 1:
  data_new = ''
  data_old = ''
  nmea_message = ''

  if data_new:
    data_old = data_new
    data_new = ''

  data_old += getBufferedBytes()

  if re.search("\r\n", data_old):
    nmea_message, data_new = data_old.split("\r\n")
    print(nmea_message)
    data_old = ''

