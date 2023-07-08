import serial

PORT = "/dev/ttyS0"
BAUDRATE = 9600

ser = serial.Serial(PORT, BAUDRATE)

while 1:
  msg = ser.readline().decode().rstrip()
  if msg:
    print(msg)
  msg = ""
