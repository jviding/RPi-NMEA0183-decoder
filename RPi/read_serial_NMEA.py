import serial

PORT = '/dev/ttyS0'
BAUDRATE = 9600

ser = serial.Serial(PORT, BAUDRATE)

def getBufferedBytes():
  bytes_buffered = ser.in_waiting
  if bytes_buffered > 0:
    return ser.read(bytes_buffered)
  return ''

global data
data = ''

while 1:

  new_data = getBufferedBytes()

  if new_data == '$':
    print(data)
    data = ''

  if new_data:
    data += new_data

  new_data = ''
