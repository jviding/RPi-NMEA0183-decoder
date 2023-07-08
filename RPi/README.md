# Test UART serial transmission with RPi

Connect TX to RX (GPIO 14 to 15) with 470 ohm resistor.
Add a pull down to GND with 10k ohm resistor.

Run the scripts at ./test_serial
> $ python3 read.py
> $ python3 write.py

They should both start printing Count 1, 2, 3, ...
