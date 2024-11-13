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

	product, err := models.GetProductByID(ProductID)
	if err != nil {

		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(product)
}

func GetProductReview(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	log.Println("Ping", vars)
	ProductID, err := strconv.Atoi(vars["id"])
	if err != nil {

		http.Error(w, "Invalid vendor ID", http.StatusBadRequest)
		return
	}

	reviews, err := models.GetReviewsByProductID(ProductID)
	if err != nil {

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reviews)
}
