import pyautogui
from time import sleep


screenX = 343
screenY = 506
screenW = 291
screenH = 1
offset = 10

def play():
    while True:
        img = pyautogui.screenshot(region = (screenX, screenY, screenW, screenH))    
        tileCol = int(screenW / 4) - offset
        for i in range(1, 5):
            pix = img.getpixel((tileCol * i, 0))
            if pix[0] < 100 and pix[2] > 150:
                actualX = tileCol * i + screenX - offset
                actualY = screenY + 1
                pyautogui.click(x = actualX, y = actualY)
            elif pix[0] < 50 and pix[1] < 50 and pix[2] < 50:
                actualX = tileCol * i + screenX - offset
                actualY = screenY + 1
                pyautogui.click(x = actualX, y = actualY)

print('Game starts in 5 sec')
sleep(5)
play()