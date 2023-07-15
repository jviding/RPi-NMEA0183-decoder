# Prerequisites
Raspberry Pi is used for all the below.

# 1. Wire up
 *ESP8266*      *RPi*
> GND          - GND
> RX (GPIO 13) - TX (GPIO 14)
> TX (GPIO 15) - RX (GPIO 15)

# 2. Enable flash mode
Hold down [FLASH] and press [RST] on the ESP8266 board.
The blue led should blink once.

Alternative: With GPIO 00 (Flash) pulled down.
Pull the Reset pin low and release, to enter programming mode.

# 3. Flash the chip
> $ pip install esptool
> $ esptool.py -p /dev/ttyS0 -b 9600 -c esp8266 erase_flash

-p port, serial (UART TX/RX)
-b baudrate, 9600
-c chip, esp8266

# 4. Install firmware: MicroPython
https://docs.micropython.org/en/latest/esp8266/tutorial/intro.html#intro

Download the firmware package esp8266-<pkg>.bin and then install with:
> $ esptool.py -p /dev/ttyS0 -c esp8266 write_flash --flash_size=detect 0 esp8266-<version>.bin

Reset the device: Press [RST].
Alternative: Release the GPIO 00 and pull the Reset pin low and release.

# 5. Connect to REPL
> $ apt install picocom
> $ picocom /dev/ttyS0 -b115200

Press enter, and type >>> print('hello')
Press enter again, you should see 'hello' as output.
To quit, hold down [Ctrl] and press [X] then [A].

There's also the WebREPL that can be used over a Wi-Fi connection.
The ESP8266 launches as a WiFi AP after the initialization by default.

# 6. Create and execute programs
When the ESP8266 starts up, it will first execute boot.py and then main.py (if they exist).
These can be created and populated with the code that should be run when the device starts up.

The ESP8266 filesystem can be mounted on the RPi as a USB memory device.
For example, with mpremote: https://github.com/micropython/micropython/tree/master/tools/mpremote
> pip3 install --user mpremote

Note: The program fails to identify /dev/ttyS0
To have it being used, in commands.py, modify lines 37-45 to:
> state.transport = SerialTransport("/dev/ttyS0", baudrate=115200)
> return

You can verify that /dev/ttyS0 can now be used to connect:
> $ mpremote connect /dev/ttyS0

Mpremote commands:
https://pypi.org/project/mpremote/
https://docs.micropython.org/en/latest/reference/mpremote.html

For example, to list all files: 
> $ mpremote fs ls
Or to copy a file: 
> $ mpremote cp local :remote (from local to remote)
> $ mpremote cp :remote local (from remote to local)
