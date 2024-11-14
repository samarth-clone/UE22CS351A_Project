import os
import shutil
import time
from icrawler.builtin import GoogleImageCrawler
import requests

class ImGen:
    def __init__(self, root_dir='images'):
        self.gc = GoogleImageCrawler(
            feeder_threads=1,
            parser_threads=1,
            downloader_threads=1,
            storage={'root_dir': root_dir}
        )

    def gen_image(self, prompt: str, product_id: int) -> None:
        print(f"Generating image for: {prompt} with product ID: {product_id}")
        # Crawl the image and download it with a color filter
        self.gc.crawl(
            keyword=prompt,
            max_num=1  # Download 1 image per search
        )

        # Introduce a small delay to avoid overwhelming the server
        time.sleep(2)  # 2 seconds delay (can be adjusted based on your needs)

        # After crawling, move and rename the image
        self.move_image_to_product_folder(product_id)

    def move_image_to_product_folder(self, product_id: int):
        # Check the folder where the image is stored
        downloaded_folder = f'images/{product_id}'

        # Ensure the folder is created if it's missing
        if not os.path.exists(downloaded_folder):
            os.makedirs(downloaded_folder)

        # The downloaded image should be stored in a specific folder with a name like 00000001.jpg
        # Check that the folder exists and contains the image
        product_images_folder = 'product_images'  # The folder where images are temporarily stored
        if os.path.exists(product_images_folder):
            files = os.listdir(product_images_folder)
            print(f"Files in folder {product_images_folder}: {files}")

            if files:
                # Assuming the first image downloaded is the one we want to rename
                image_file = os.path.join(product_images_folder, files[0])  # This might be '00000001.jpg' or similar
                print(f"Found image: {image_file}")

                if os.path.exists(image_file):
                    new_image_path = f'{downloaded_folder}/{product_id}.jpg'  # Save image as product_id.jpg
                    shutil.move(image_file, new_image_path)  # Move the file to the correct folder
                    print(f"Image moved to: {new_image_path}")

                    # Optionally, remove all other images from the product_images folder
                    self.cleanup_product_images_folder()
                else:
                    print(f"Image file not found: {image_file}")
            else:
                print(f"No images found in folder: {product_images_folder}")
        else:
            print(f"Folder '{product_images_folder}' does not exist.")


    def cleanup_product_images_folder(self):
        # Clean up by removing all files from 'product_images' folder after the move
        product_images_folder = 'product_images'
        for file_name in os.listdir(product_images_folder):
            file_path = os.path.join(product_images_folder, file_name)
            if os.path.isfile(file_path):
                os.remove(file_path)
                print(f"Deleted: {file_path}")


# Function to fetch product data from your API
def fetch_product_data(url):
    response = requests.get(url)
    response.raise_for_status()  # Raise an error if the request fails
    return response.json()

# Function to enrich products with images
def enrich_products_with_images(products):
    # Initialize the image generator class
    imgen = ImGen(root_dir='product_images')

    for product in products:
        product_name = product["product_name"]
        product_id = product["product_id"]
        print(f"Processing product: {product_name} (ID: {product_id})")

        # Generate and download the image for the product name and product ID
        imgen.gen_image(product_name, product_id)
        
        # Optionally, you can update the product with the image path or URL
        product['image_path'] = os.path.join('images', f'{product_id}/{product_id}.jpg')

    return products

# Main function to orchestrate the workflow
def main():
    product_url = "http://localhost:8080/products"  # URL to fetch product data
    try:
        products = fetch_product_data(product_url)
        enriched_products = enrich_products_with_images(products)
        
        print("\nEnriched Product Data with Images:")
        for product in enriched_products:
            print(f"Product: {product['product_name']} (ID: {product['product_id']}), Image saved at: {product['image_path']}")
    
    except Exception as e:
        print(f"Error: {e}")

# Run the script
if __name__ == "__main__":
    main()
