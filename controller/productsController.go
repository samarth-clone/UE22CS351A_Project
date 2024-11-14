package controller

import (
	"UE22CS351A_Project/models"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func GetProducts(w http.ResponseWriter, r *http.Request) {
	products, err := models.GetAllProducts()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

func GetProductByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	ProductID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid product ID", http.StatusBadRequest)
		return
	}

	product, vendorproductID, err := models.GetProductByID(ProductID)
	log.Println(product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Create a response struct that contains both product and vendorproductID
	response := struct {
		Product         interface{} `json:"product"`
		VendorProductID int         `json:"vendorProductID"`
	}{
		Product:         product,
		VendorProductID: vendorproductID,
	}

	// Set the header and encode the response as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func GetProductReview(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	// log.Println("Ping", vars)
	ProductID, err := strconv.Atoi(vars["id"])
	if err != nil {

		http.Error(w, "Invalid vendor ID", http.StatusBadRequest)
		return
	}

	reviews, err := models.GetReviewsByProductID(ProductID)
	if err != nil {
		log.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reviews)
}

func SetProductReview(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	productID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid product ID", http.StatusBadRequest)
		return
	}

	var review models.Review
	err = json.NewDecoder(r.Body).Decode(&review)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	review.OrderedProductID = productID // Set the product ID in the review
	err = models.SetReview(&review)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func CreateCart(w http.ResponseWriter, r *http.Request) {
	var cart models.Cart
	err := json.NewDecoder(r.Body).Decode(&cart)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Println(cart)

	cartID, err := models.CreateCart(cart)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Prepare the response with the created CartID
	response := map[string]int{"cart_id": cartID}

	// Set the response header to application/json
	w.Header().Set("Content-Type", "application/json")
	// Respond with the CartID in the JSON body
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func AddToCart(w http.ResponseWriter, r *http.Request) {
	var cartProduct models.CartProduct
	err := json.NewDecoder(r.Body).Decode(&cartProduct)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = models.AddToCart(&cartProduct)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func GetCartForCustomer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	customerID, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Print(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Print(customerID)
	cartProducts, err := models.GetCartForCustomer(customerID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cartProducts)
}

func DeleteCartProduct(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	log.Print(vars)
	cartProductID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid cart product ID", http.StatusBadRequest)
		return
	}

	err = models.DeleteCartProduct(cartProductID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func UpdateCartProductPlus(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	log.Print(vars)
	cartProductID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid cart product ID", http.StatusBadRequest)
		return
	}

	// Assign the extracted cartProductID from URL to the struct

	log.Print(cartProductID)
	// Call the model function to update the cart product in the database
	err = models.UpdateCartProductPlus(cartProductID)
	if err != nil {
		http.Error(w, "Failed to update cart product: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Set Content-Type to application/json and respond with a status code
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Cart product updated successfully"})
}

func UpdateCartProductMinus(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	log.Print(vars)
	cartProductID, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid cart product ID", http.StatusBadRequest)
		return
	}

	// Assign the extracted cartProductID from URL to the struct

	log.Print(cartProductID)
	// Call the model function to update the cart product in the database
	err = models.UpdateCartProductMinus(cartProductID)
	if err != nil {
		http.Error(w, "Failed to update cart product: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Set Content-Type to application/json and respond with a status code
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Cart product updated successfully"})
}
