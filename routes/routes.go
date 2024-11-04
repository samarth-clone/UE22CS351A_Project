package routes

import (
	"UE22CS351A_Project/controller"

	"github.com/gorilla/mux"
)

func RegisterRouter(r *mux.Router) {
	r.HandleFunc("/customers", controller.GetAllCustomers).Methods("GET")
	r.HandleFunc("/customers/{id}", controller.GetCustomerByID).Methods("GET")
	r.HandleFunc("/customers", controller.CreateCustomer).Methods("POST")
	r.HandleFunc("/customers/{id}", controller.DeleteCustomer).Methods("DELETE")
}
