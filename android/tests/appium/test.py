import os
import time
from appium import webdriver

driver = webdriver.Remote(
    command_executor='http://127.0.0.1:4723/wd/hub',
    desired_capabilities={
        'app': os.path.expanduser('/Users/admin/Desktop/Training/react-native/reduxDemo/android/app/build/outputs/apk/debug/app-debug.apk'),
        'platformName': 'Android',
        'deviceName': 'Pixel3XL',
    })

# {
#   "platformName": "android",
#   "deviceName": "emulator-5554",
#   "app": "/Users/admin/Desktop/Training/react-native/reduxDemo/android/app/build/outputs/apk/debug/app-debug.apk",
#   "automationName": "UiAutomator2"
# }

# wait for app to load
time.sleep(3)

# find the link with the text "Click here" and click on it
btn = driver.find_element_by_xpath(
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.Button/android.widget.TextView')

assert btn is not None

btn.click()

# wait for the next screen to load
time.sleep(3)

welcome_text = driver.find_element_by_xpath(
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.TextView[1]')
# assert element found more than 1
assert len(welcome_text) > 0
print(' ====================  END APP ====================')
# make sure the correct "Success" result is on the page
# driver.find_element_by_xpath('//*[@text="Success"]')

# important; you will not be able to launch again if this does not happen
driver.quit()
