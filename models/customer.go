package models

import (
	"database/sql"
	"time"
)

type Customer struct {
	CustomerID int       `json:"customer_id"`
	FirstName  string    `json:"first_name"`
	LastName   string    `json:"last_name"`
	DOB        time.Time `json:"dob"`
	Email      string    `json:"email"`
	Password   string    `json:"-"`
	Contact    string    `json:"contact"`
}

type TempCustomer struct {
	CustomerID int    `json:"customer_id"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	DOB        string `json:"dob"`
	Email      string `json:"email"`
	Password   string `json:"-"`
	Contact    string `json:"contact"`
}

func GetAllCustomers() ([]Customer, error) {
	var customers []Customer
	rows, err := db.Query("SELECT CustomerID, FirstName, LastName, DOB, Email, Contact FROM Customer")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var customer Customer
		var dob []uint8
		if err := rows.Scan(&customer.CustomerID, &customer.FirstName, &customer.LastName, &dob, &customer.Email, &customer.Contact); err != nil {
			return nil, err
		}

		customer.DOB, err = time.Parse("2006-01-02", string(dob))
		if err != nil {
			return nil, err
		}

		customers = append(customers, customer)
	}
	return customers, nil

}

func GetCustomerByID(customerID int) (Customer, error) {
	var customer Customer
	var dob []uint8
	query := "SELECT CustomerID, FirstName, LastName, DOB, Email, Contact FROM Customer WHERE CustomerID = ?"
	err := db.QueryRow(query, customerID).Scan(&customer.CustomerID, &customer.FirstName, &customer.LastName, &dob, &customer.Email, &customer.Contact)
	if err != nil {
		if err == sql.ErrNoRows {
			return customer, nil // Return an empty customer if no rows were found
		}
		return customer, err
	}

	customer.DOB, err = time.Parse("2006-01-02", string(dob))
	if err != nil {
		return customer, err
	}

	return customer, nil
}

func CreateCustomer(customer Customer) (int, error) {

	result, err := db.Exec("INSERT INTO Customer (FirstName, LastName, DOB, Email, Password, Contact) VALUES (?, ?, ?, ?, ?, ?)",
		customer.FirstName, customer.LastName, customer.DOB, customer.Email, customer.Password, customer.Contact)
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	return int(id), err
}

func DeleteCustomer(id int) error {
	_, err := db.Exec("DELETE FROM Customer WHERE CustomerID = ?", id)
	return err
}
