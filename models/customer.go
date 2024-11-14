package models

import (
	"database/sql"
	"errors"
	"log"
	"time"
)

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

func GetCustomerByEmail(email string) (Customer, error) {
	var customer Customer
	var dob []uint8
	query := "SELECT CustomerID, FirstName, LastName, DOB, Email, Contact FROM Customer WHERE Email = ?"
	err := db.QueryRow(query, email).Scan(&customer.CustomerID, &customer.FirstName, &customer.LastName, &dob, &customer.Email, &customer.Contact)
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
	var existingCustomerID int
	err := db.QueryRow("SELECT CustomerID FROM Customer WHERE Email = ?", customer.Email).Scan(&existingCustomerID)
	var id int
	if err != nil && err != sql.ErrNoRows {
		log.Print("no line error")
		return 0, err
	}

	if err == sql.ErrNoRows {
		result, err := db.Exec("INSERT INTO Customer (FirstName, LastName, DOB, Email, Password, Contact) VALUES (?, ?, ?, ?, ?, ?)",
			customer.FirstName, customer.LastName, customer.DOB, customer.Email, customer.Password, customer.Contact)
		if err != nil {
			log.Printf("Error inserting customer: %v", err)
			return 0, err
		}

		id, _ := result.LastInsertId()
		log.Println("New customer inserted with id: ", id)
		err = nil
	} else {
		log.Print("Some error")
		return 0, err
	}
	return int(id), err
}

func DeleteCustomer(id int) error {
	_, err := db.Exec("DELETE FROM Customer WHERE CustomerID = ?", id)
	return err
}

func LoginCustomer(email, password string) (int, error) {
	query := "SELECT CustomerID FROM Customer WHERE Email = ? AND Password = ?"
	row := db.QueryRow(query, email, password)
	log.Println(email, password)
	var customerID int
	err := row.Scan(&customerID)
	if err != nil {
		if err == sql.ErrNoRows {
			return 0, errors.New("invalid login credentials")
		}
		return 0, err
	}

	return customerID, nil
}
