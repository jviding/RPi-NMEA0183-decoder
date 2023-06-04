# Prerequisites
Raspberry Pi is used for all the below.

# 1. Install esptool on RPi
> $ pip install esptool

# 2. Wire up
 *ESP8266*      *RPi*
> GND          - GND
> RX (GPIO 13) - TX (GPIO 14)
> TX (GPIO 15) - RX (GPIO 15)

# 3. Enable flash mode
Hold down [FLASH] and press [RST] on the ESP8266 board.
The blue led should blink once.

Alternative: With GPIO 00 (Flash) pulled down.
Pull the Reset pin low and release, to enter programming mode.

# 4. Flash the chip
> $ esptool.py -p /dev/ttyS0 -b 9600 -c esp8266 erase_flash

-p port, serial (UART TX/RX)
-b baudrate, 9600
-c chip, esp8266

# 5. Install new firmware (MicroPython)
https://docs.micropython.org/en/latest/esp8266/tutorial/intro.html#intro

Download the firmware package: esp8266-<pkg>.bin
Install: $ esptool.py -p /dev/ttyS0 -c esp8266 write_flash --flash_size=detect 0 esp8266-<version>.bin

Reset the device: Press [RST].
Alternative: Release the GPIO 00 and pull the Reset pin low and release.

# 6. Connect to REPL
> $ apt install picocom
> $ picocom /dev/ttyS0 -b115200

Press enter, and type >>> print('hello')
Press enter again, you should see 'hello' as output.

There's also the WebREPL that can be used over a Wi-Fi connection.
The ESP8266 launches as a WiFi AP after the initialization by default.

When the ESP8266 starts up, it will first execute boot.py and then main.py (if they exist).
These can be created and populated with the code that should be run when the device starts up.