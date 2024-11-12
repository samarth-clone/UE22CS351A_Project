package models

import (
	"database/sql"
	"log"
)

// GetAllVendors retrieves all vendors from the database
func GetAllVendors() ([]Vendor, error) {
	var vendors []Vendor
	rows, err := db.Query("SELECT VendorID, Name, Address, Email, Contact FROM Vendor")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var vendor Vendor
		if err := rows.Scan(&vendor.VendorID, &vendor.Name, &vendor.Address, &vendor.Email, &vendor.Contact); err != nil {
			return nil, err
		}
		vendors = append(vendors, vendor)
	}
	return vendors, nil
}

// GetVendorByID retrieves a vendor by their ID
func GetVendorByID(vendorID int) (Vendor, error) {
	var vendor Vendor
	query := "SELECT VendorID, Name, Address, Email, Contact FROM Vendor WHERE VendorID = ?"
	err := db.QueryRow(query, vendorID).Scan(&vendor.VendorID, &vendor.Name, &vendor.Address, &vendor.Email, &vendor.Contact)
	if err != nil {
		if err == sql.ErrNoRows {
			return vendor, nil // Return an empty vendor if no rows were found
		}
		return vendor, err
	}

	return vendor, nil
}

// CreateVendor adds a new vendor to the database
func CreateVendor(vendor Vendor) (int, error) {
	result, err := db.Exec("INSERT INTO Vendor (Name, Address, Email, Password, Contact) VALUES (?, ?, ?, ?, ?)",
		vendor.Name, vendor.Address, vendor.Email, vendor.Password, vendor.Contact)
	if err != nil {
		log.Printf("Error inserting vendor: %v", err)
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}
	log.Println("New vendor inserted with id: ", id)

	return int(id), nil
}

// UpdateVendor updates vendor information
func UpdateVendor(vendor Vendor) error {
	_, err := db.Exec("UPDATE Vendor SET Name = ?, Address = ?, Email = ?, Contact = ? WHERE VendorID = ?",
		vendor.Name, vendor.Address, vendor.Email, vendor.Contact, vendor.VendorID)
	return err
}

// DeleteVendor removes a vendor from the database
func DeleteVendor(id int) error {
	_, err := db.Exec("DELETE FROM Vendor WHERE VendorID = ?", id)
	return err
}

// CreateVendorProduct adds a new product for a vendor
func CreateVendorProduct(product VendorProduct) (int, error) {
	result, err := db.Exec("INSERT INTO VendorProduct (VendorID, ProductID, Price, Quantity, Description) VALUES (?, ?, ?, ?, ?)",
		product.VendorID, product.ProductID, product.Price, product.Quantity, product.Description)
	if err != nil {
		log.Printf("Error inserting vendor product: %v", err)
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}
	log.Println("New vendor product inserted with id: ", id)

	return int(id), nil
}

// GetVendorProducts retrieves all products for a specific vendor
func GetVendorProducts(vendorID int) ([]VendorProduct, error) {
	var products []VendorProduct
	rows, err := db.Query("SELECT VendorProductID, VendorID, ProductID, Price, Quantity, Description FROM VendorProduct WHERE VendorID = ?", vendorID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var product VendorProduct
		if err := rows.Scan(&product.VendorProductID, &product.VendorID, &product.ProductID, &product.Price, &product.Quantity, &product.Description); err != nil {
			return nil, err
		}
		products = append(products, product)
	}
	return products, nil
}

// UpdateVendorProduct updates an existing vendor product
func UpdateVendorProduct(product VendorProduct) error {
	_, err := db.Exec("UPDATE VendorProduct SET Price = ?, Quantity = ?, Description = ? WHERE VendorProductID = ?",
		product.Price, product.Quantity, product.Description, product.VendorProductID)
	return err
}

// DeleteVendorProduct removes a product from a vendor
func DeleteVendorProduct(id int) error {
	_, err := db.Exec("DELETE FROM VendorProduct WHERE VendorProductID = ?", id)
	return err
}
