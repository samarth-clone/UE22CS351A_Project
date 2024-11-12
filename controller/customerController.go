package controller

import (
	"UE22CS351A_Project/models"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

// GET /customers -all customer data

func GetAllCustomers(w http.ResponseWriter, r *http.Request) {
	customers, err := models.GetAllCustomers()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(customers)
}

func GetCustomerByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "invalid ID", http.StatusInternalServerError)

	}

	customer, err := models.GetCustomerByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if (customer == models.Customer{}) {
		http.Error(w, "Customer not found", http.StatusNotFound)
		return
	}
	json.NewEncoder(w).Encode(customer)
}

func CreateCustomer(w http.ResponseWriter, r *http.Request) {
	var tempCustomer models.TempCustomer

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()
	if err := json.Unmarshal(body, &tempCustomer); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	dob, err := time.Parse("2006-01-02", tempCustomer.DOB)
	if err != nil {
		http.Error(w, "Invalid date format for DOB", http.StatusBadRequest)
		return
	}

	customer := models.Customer{
		CustomerID: tempCustomer.CustomerID,
		FirstName:  tempCustomer.FirstName,
		LastName:   tempCustomer.LastName,
		DOB:        dob,
		Email:      tempCustomer.Email,
		Password:   tempCustomer.Password,
		Contact:    tempCustomer.Contact,
	}
	_, err = models.CreateCustomer(customer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func DeleteCustomer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "invalid ID", http.StatusInternalServerError)

	}
	err = models.DeleteCustomer(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)

	}

}

func LoginCustomer(w http.ResponseWriter, r *http.Request) {

	var loginDetails struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&loginDetails); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	defer r.Body.Close()

	id, err := models.LoginCustomer(loginDetails.Email, loginDetails.Password)

	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	response := struct {
		CustomerID int `json:"customer_id"`
	}{
		CustomerID: id,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
