package models

import (
	"database/sql"
	"log"
)

func GetAllProducts() ([]ProductCard, error) {
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

	var products []ProductCard
	for rows.Next() {
		var product ProductCard
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

func GetProductByID(productID int) (ProductCard, int, error) {
	query := `SELECT 
		p.ProductID, 
		p.ProductName, 
		vp.Description, 
		vp.Price,
		vendorproductid
	FROM 
		product p
	INNER JOIN 
		vendorproduct vp ON p.ProductID = vp.ProductID
	WHERE 
		p.ProductID = ?
	;
	`

	row := db.QueryRow(query, productID)
	log.Print(row)
	var VendorProductID int
	var product ProductCard
	if err := row.Scan(&product.ProductID, &product.ProductName, &product.Description, &product.Price, &VendorProductID); err != nil {
		if err == sql.ErrNoRows {
			return ProductCard{}, 0, nil // or return an error indicating no product found
		}
		return ProductCard{}, 0, err
	}

	return product, VendorProductID, nil
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

func SetReview(review *Review) error {
	query := `INSERT INTO review (Rating, Comment, CustomerID, OrderedProductID) VALUES (?, ?, ?, ?);`
	result, err := db.Exec(query, review.Rating, review.Comment, review.CustomerID, review.OrderedProductID)
	if err != nil {
		return err
	}
	_, err = result.LastInsertId()
	if err != nil {
		return err
	}

	return nil
}

func CreateCart(cart Cart) (int, error) {
	result, err := db.Exec("INSERT INTO cart (CustomerID, DateCreated) VALUES (?, now())", cart.CustomerID)
	if err != nil {
		return 0, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

// fetch('http://localhost:8080/cart/createCart', {
// 	method: 'POST',
// 	headers: {
// 	  'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({ customer_id: 1 }),
//   })
// 	.then(response => response.json())
// 	.then(data => console.log(data))
// 	.catch(error => console.error('Error:', error));

func AddToCart(cartProduct *CartProduct) error {
	query := `INSERT INTO cartproduct (CartID, VendorProductID, Quantity) VALUES (?, ?, ?);`
	result, err := db.Exec(query, cartProduct.CartID, cartProduct.VendorProductID, cartProduct.Quantity)
	if err != nil {
		return err
	}
	_, err = result.LastInsertId()
	if err != nil {
		return err
	}

	return nil
}

// fetch('http://localhost:8080/cart/addToCart', {
// 	method: 'POST',
// 	headers: {
// 	  'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({ cart_id: 1,
// 		vendor_product_id: 1,
// 		quantity: 1}),
//   })
// 	.then(response => response.json())
// 	.then(data => console.log(data))
// 	.catch(error => console.error('Error:', error));

func GetCartForCustomer(customerID int) ([]ProductCart, error) {
	query := `
	SELECT 
    p.ProductName,
    cp.Quantity,
    vp.Price,
    p.ProductID,
	vp.VendorProductID
	FROM 
    cart c
	JOIN 
    cartproduct cp ON c.CartID = cp.CartID
	JOIN 
    vendorproduct vp ON cp.VendorProductID = vp.VendorProductID
	JOIN 
    product p ON vp.ProductID = p.ProductID
	WHERE 
    c.CustomerID = ?;
	`
	rows, err := db.Query(query, customerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []ProductCart
	for rows.Next() {
		var product ProductCart
		if err := rows.Scan(&product.ProductName, &product.Quantity, &product.Price, &product.ProductID, &product.VendorProductID); err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}
