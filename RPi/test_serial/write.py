import time
import serial

PORT = '/dev/ttyS0'
BAUDRATE = 9600

ser = serial.Serial(PORT, BAUDRATE)

def writeSerial(counter):
	msg = "Count: {} \n".format(counter)
	ser.write(bytes(msg, "utf-8"))
	print(msg)

counter = 0

while 1:
	writeSerial(counter)
	counter += 1
	time.sleep(1)