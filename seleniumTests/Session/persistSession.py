from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Initialize the WebDriver
driver = webdriver.Chrome()

# Maximize the window for better visibility (optional)
driver.maximize_window()

# Step 1: Open the website
driver.get("http://localhost:5173")

# Wait for the page to load
time.sleep(2)

# Step 2: Click on the 'Login' button
login_button = driver.find_element(By.LINK_TEXT, "Login")
login_button.click()

# Wait for the login form to load
time.sleep(2)

# Step 3: Locate username and password fields and enter test credentials
username_input = driver.find_element(By.NAME, "email")  # Adjust based on the actual name attribute of the input
password_input = driver.find_element(By.NAME, "password")  # Adjust based on the actual name attribute of the input

username_input.send_keys("valid@gmail.com")  # Replace with valid credentials for actual testing
password_input.send_keys("valid")  # Replace with valid credentials for actual testing

# Step 4: Submit the form by pressing the Enter key in the password field
password_input.send_keys(Keys.RETURN)

# Step 5: Wait to observe the result of the login attempt
time.sleep(5)

product_button = driver.find_element(By.CLASS_NAME, "book-card")
product_button.click()

time.sleep(5)


# Step 6: Verify if login was successful by checking if redirected to the homepage
if "http://localhost:5173" in driver.current_url:
    print("Login successful and redirected to homepage.")
else:
    print("Login failed or credentials invalid.")

# Close the browser window
driver.quit()
