package routes

import (
	"UE22CS351A_Project/controller"

	"github.com/gorilla/mux"
)

func RegisterRouter(r *mux.Router) {

	//Routes for customers
	r.HandleFunc("/customers", controller.GetAllCustomers).Methods("GET")
	r.HandleFunc("/customers/{id}", controller.GetCustomerByID).Methods("GET")
	r.HandleFunc("/customers", controller.CreateCustomer).Methods("POST")
	r.HandleFunc("/customers/{id}", controller.DeleteCustomer).Methods("DELETE")
	r.HandleFunc("/customers/login", controller.LoginCustomer).Methods("POST")

	//Routes for vendors
	r.HandleFunc("/vendors", controller.GetAllVendors).Methods("GET")                        // GET all vendors
	r.HandleFunc("/vendor", controller.GetVendorByID).Methods("GET")                         // GET vendor by ID
	r.HandleFunc("/vendor/create", controller.CreateVendor).Methods("POST")                  // POST create a new vendor
	r.HandleFunc("/vendor/update", controller.UpdateVendor).Methods("PUT")                   // PUT update a vendor
	r.HandleFunc("/vendor/delete", controller.DeleteVendor).Methods("DELETE")                // DELETE a vendor
	r.HandleFunc("/vendor/product/create", controller.CreateVendorProduct).Methods("POST")   // POST create a product for a vendor
	r.HandleFunc("/vendor/products", controller.GetVendorProducts).Methods("GET")            // GET all products for a specific vendor
	r.HandleFunc("/vendor/product/update", controller.UpdateVendorProduct).Methods("PUT")    // PUT update a vendor product
	r.HandleFunc("/vendor/product/delete", controller.DeleteVendorProduct).Methods("DELETE") // DELETE a vendor product

	r.HandleFunc("/products/getReview/{id}", controller.GetProductReview).Methods("GET")
	r.HandleFunc("/products", controller.GetProducts).Methods("GET")
	r.HandleFunc("/products/{id}", controller.GetProductByID).Methods("GET")
}
