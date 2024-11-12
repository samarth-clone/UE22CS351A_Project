package routes

import (
	"UE22CS351A_Project/controller"
	"net/http"

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
	r.HandleFunc("/vendors", controllers.GetAllVendors)                     // GET all vendors
	r.HandleFunc("/vendor", controllers.GetVendorByID)                      // GET vendor by ID
	r.HandleFunc("/vendor/create", controllers.CreateVendor)                // POST create a new vendor
	r.HandleFunc("/vendor/update", controllers.UpdateVendor)                // PUT update a vendor
	r.HandleFunc("/vendor/delete", controllers.DeleteVendor)                // DELETE a vendor
	r.HandleFunc("/vendor/product/create", controllers.CreateVendorProduct) // POST create a product for a vendor
	r.HandleFunc("/vendor/products", controllers.GetVendorProducts)         // GET all products for a specific vendor
	r.HandleFunc("/vendor/product/update", controllers.UpdateVendorProduct) // PUT update a vendor product
	r.HandleFunc("/vendor/product/delete", controllers.DeleteVendorProduct) // DELETE a vendor product

}
