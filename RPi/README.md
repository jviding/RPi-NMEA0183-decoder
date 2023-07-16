# Serial UART communications with RPi

To locate your RPi in the local network
> $ sudo nmap -p 22 --open -sV <IP-ADDR>.0/24

## 1 - Test serial connection

Connect the TX (GPIO 14) and RX (GPIO 15) ports to one another.
Add a 470 ohm resistor between the connection.
Add a pull-down to GND with a 10k ohm resistor.

Run the scripts under ./test_serial
> $ python3 read.py
> $ python3 write.py

They should both now output: Count 1, 2, 3, ...

Troubleshoothing: 
The scripts assume serial is enabled on /dev/ttyS0.
If the scripts don't work, check the RPi configurations.

## 2 - Read NMEA with serial

Connect the TX and RX ports to the NMEA network.
Use a common ground, with the RPi GND.

Note: Resistors may be needed to protect the RPi TX and RX pins.
Some devices may send NMEA with >12V which may damage the RPi.

Run the script ./read_serial_NMEA.py
It should output NMEA packets from the network.
