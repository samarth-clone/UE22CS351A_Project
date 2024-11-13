import requests
from bs4 import BeautifulSoup
import webbrowser

# Function to fetch product data from your API
def fetch_product_data(url):
    response = requests.get(url)
    response.raise_for_status()  # Raise an error if the request fails
    return response.json()

# Function to search Google Images using the product name
def fetch_image_url(query):
    search_url = "https://www.google.com/search?hl=en&tbm=isch&q=" + query
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(search_url, headers=headers)
    response.raise_for_status()  # Raise an error if the request fails

    # Parse the HTML content
    soup = BeautifulSoup(response.text, "html.parser")

    # Find all the image elements
    img_tags = soup.find_all("img")
    if len(img_tags) > 1:
        # The second image tag usually contains the image we want
        return img_tags[1].get("src")  # The src attribute contains the image URL
    return None

# Function to fetch the first product, search for its image, and open the image
def fetch_first_product_and_image():
    product_url = "http://localhost:8080/products"  # URL to fetch product data
    try:
        products = fetch_product_data(product_url)
        
        # Get the first product from the list
        first_product = products[0]
        product_name = first_product["product_name"]
        
        print(f"Searching for image for: {product_name}")
        
        # Search for the image
        image_url = fetch_image_url(product_name)
        
        if image_url:
            print(f"Found image: {image_url}")
            # Open the image URL in the default web browser
            webbrowser.open(image_url)
        else:
            print("No image found for this product.")
        
    except Exception as e:
        print(f"Error: {e}")

# Run the script
if __name__ == "__main__":
    fetch_first_product_and_image()
