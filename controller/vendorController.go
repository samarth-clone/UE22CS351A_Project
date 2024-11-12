package controller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"UE22CS351A_Project/models" // replace with your actual package path
)

// GetAllVendors handles GET requests to retrieve all vendors
func GetAllVendors(w http.ResponseWriter, r *http.Request) {
	vendors, err := models.GetAllVendors()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(vendors)
}

// GetVendorByID handles GET requests to retrieve a vendor by ID
func GetVendorByID(w http.ResponseWriter, r *http.Request) {
	vendorIDStr := r.URL.Query().Get("id")
	vendorID, err := strconv.Atoi(vendorIDStr)
	if err != nil {
		http.Error(w, "Invalid vendor ID", http.StatusBadRequest)
		return
	}

	vendor, err := models.GetVendorByID(vendorID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if vendor.VendorID == 0 {
		http.Error(w, "Vendor not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(vendor)
}

// CreateVendor handles POST requests to create a new vendor
func CreateVendor(w http.ResponseWriter, r *http.Request) {
	var vendor models.Vendor
	if err := json.NewDecoder(r.Body).Decode(&vendor); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	vendorID, err := models.CreateVendor(vendor)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]int{"vendor_id": vendorID})
}

// UpdateVendor handles PUT requests to update vendor information
func UpdateVendor(w http.ResponseWriter, r *http.Request) {
	var vendor models.Vendor
	if err := json.NewDecoder(r.Body).Decode(&vendor); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := models.UpdateVendor(vendor); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent) // 204 No Content
}

// DeleteVendor handles DELETE requests to remove a vendor
func DeleteVendor(w http.ResponseWriter, r *http.Request) {
	vendorIDStr := r.URL.Query().Get("id")
	vendorID, err := strconv.Atoi(vendorIDStr)
	if err != nil {
		http.Error(w, "Invalid vendor ID", http.StatusBadRequest)
		return
	}

	if err := models.DeleteVendor(vendorID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent) // 204 No Content
}

// CreateVendorProduct handles POST requests to create a new product for a vendor
func CreateVendorProduct(w http.ResponseWriter, r *http.Request) {
	var product models.VendorProduct
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	productID, err := models.CreateVendorProduct(product)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]int{"vendor_product_id": productID})
}

// GetVendorProducts handles GET requests to retrieve all products for a specific vendor
func GetVendorProducts(w http.ResponseWriter, r *http.Request) {
	vendorIDStr := r.URL.Query().Get("id")
	vendorID, err := strconv.Atoi(vendorIDStr)
	if err != nil {
		http.Error(w, "Invalid vendor ID", http.StatusBadRequest)
		return
	}

	products, err := models.GetVendorProducts(vendorID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}

// UpdateVendorProduct handles PUT requests to update a vendor product
func UpdateVendorProduct(w http.ResponseWriter, r *http.Request) {
	var product models.VendorProduct
	if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := models.UpdateVendorProduct(product); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent) // 204 No Content
}

// DeleteVendorProduct handles DELETE requests to remove a product from a vendor
func DeleteVendorProduct(w http.ResponseWriter, r *http.Request) {
	productIDStr := r.URL.Query().Get("id")
	productID, err := strconv.Atoi(productIDStr)
	if err != nil {
		http.Error(w, "Invalid product ID", http.StatusBadRequest)
		return
	}

	if err := models.DeleteVendorProduct(productID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent) // 204 No Content
}
