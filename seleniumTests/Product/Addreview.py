from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize the WebDriver
driver = webdriver.Chrome()
driver.maximize_window()

# Step 1: Open the website
driver.get("http://localhost:5173")
time.sleep(2)  # Let the page load

# Step 2: Log in as before (if login is required)
login_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.LINK_TEXT, "Login"))
)
login_button.click()

# Enter credentials and log in
username_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.NAME, "email"))
)
password_input = driver.find_element(By.NAME, "password")
username_input.send_keys("valid@gmail.com")
password_input.send_keys("valid")
password_input.send_keys(Keys.RETURN)

# Wait for the page to load after login
time.sleep(5)

# Step 3: Click on the product to open the product page
product_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CLASS_NAME, "book-card"))
)
product_button.click()
time.sleep(2)

# Scroll down to bring the review bar into view
driver.execute_script("window.scrollBy(0, 500);")
time.sleep(2)

# Step 4: Select a rating by clicking on the 4th star (index 3 for a 4-star rating)
stars = WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CLASS_NAME, "star"))
)
stars[3].click()  # Click the 4th star (index starts at 0)

# Step 5: Enter a review comment
review_input = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, "review-bar-comment"))
)
review_input.send_keys("This is a great book!")

# Step 6: Click the submit button
submit_button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, "//button[text()='Submit Review']"))
)
submit_button.click()

# Wait to observe the result
time.sleep(5)
driver.get("http://localhost:5173/valid@gmail.com/product/1")
driver.execute_script("window.scrollBy(0, 700);")
time.sleep(5)


# Step 7: Verify if redirected to homepage or review submission was successful
if "http://localhost:5173" in driver.current_url:
    print("Login successful and redirected to homepage.")
else:
    print("Login failed or credentials invalid.")

# Close the browser window
driver.quit()
