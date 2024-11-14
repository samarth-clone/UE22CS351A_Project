package models

import (
	"database/sql"
)

func GetAllProducts() ([]productCard, error) {
	query := `SELECT 
    p.ProductID, 
    p.ProductName, 
    vp.Description, 
    vp.Price
	FROM 
    product p
	INNER JOIN 
    vendorproduct vp ON p.ProductID = vp.ProductID;
`
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []productCard
	for rows.Next() {
		var product productCard
		if err := rows.Scan(&product.ProductID, &product.ProductName, &product.Description, &product.Price); err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}

func GetProductByID(productID int) (productCard, error) {
	query := `SELECT 
		p.ProductID, 
		p.ProductName, 
		vp.Description, 
		vp.Price
	FROM 
		product p
	INNER JOIN 
		vendorproduct vp ON p.ProductID = vp.ProductID
	WHERE 
		p.ProductID = ?;
	`

	row := db.QueryRow(query, productID)

	var product productCard
	if err := row.Scan(&product.ProductID, &product.ProductName, &product.Description, &product.Price); err != nil {
		if err == sql.ErrNoRows {
			return productCard{}, nil // or return an error indicating no product found
		}
		return productCard{}, err
	}

	return product, nil
}

func GetReviewsByProductID(productID int) ([]getReview, error) {
	query := `
	SELECT 
    r.ReviewID, 
    r.Rating, 
    r.Comment, 
    CONCAT(c.FirstName, ' ', c.LastName) AS CustomerName, 
    r.OrderedProductID, 
    p.ProductName
	FROM 
		review r
	JOIN 
		orderedproduct op ON r.OrderedProductID = op.OrderedProductID
	JOIN 
		vendorproduct vp ON op.VendorProductID = vp.VendorProductID
	JOIN 
		product p ON vp.ProductID = p.ProductID
	JOIN 
		customer c ON r.CustomerID = c.CustomerID
	WHERE 
    p.ProductID = ? 
	`
	rows, err := db.Query(query, productID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reviews []getReview
	for rows.Next() {
		var review getReview
		if err := rows.Scan(&review.ReviewID, &review.Rating, &review.Comment, &review.CustomerName, &review.OrderedProductID, &review.ProductName); err != nil {
			return nil, err
		}
		reviews = append(reviews, review)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return reviews, nil
}
