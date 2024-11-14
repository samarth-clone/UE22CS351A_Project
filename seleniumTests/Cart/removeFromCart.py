from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Initialize the WebDriver
driver = webdriver.Chrome()

# Maximize the window for better visibility (optional)
driver.maximize_window()

# Step 1: Open the website
driver.get("http://localhost:5173/valid@gmail.com/cart")

# Wait for the page to load
time.sleep(2)

# Step 2: Find the button with "+" text and click it
add_button = driver.find_element(By.XPATH, "//button[text()='Remove']")
add_button.click()


# Wait for the action to complete
time.sleep(2)
# Step 6: Verify if login was successful by checking if redirected to the homepage
if "http://localhost:5173" in driver.current_url:
    print("Login successful and redirected to homepage.")
else:
    print("Login failed or credentials invalid.")

# Close the browser window
driver.quit()
