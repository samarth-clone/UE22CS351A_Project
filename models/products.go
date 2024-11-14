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
	vp.VendorProductID,
	cp.CartProductID
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
		if err := rows.Scan(&product.ProductName, &product.Quantity, &product.Price, &product.ProductID, &product.VendorProductID, &product.CartProductID); err != nil {
			return nil, err
		}
		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return products, nil
}

func DeleteCartProduct(cartProductID int) error {
	log.Print(cartProductID)
	query := `DELETE FROM cartproduct WHERE CartProductID = ?;`
	_, err := db.Exec(query, cartProductID)
	if err != nil {
		return err
	}

	return nil
}

// fetch('http://localhost:8080/cart/deleteCartProduct/1', {
// 	method: 'DELETE',
//   })
// 	.then(response => {
// 	  if (response.ok) {
// 		console.log("Item deleted successfully");
// 	  } else {
// 		console.error("Failed to delete item");
// 	  }
// 	})
// 	.catch(error => console.error("Error:", error));

func UpdateCartProductPlus(cartProductID int) error {
	query := `
        UPDATE cartproduct 
        SET Quantity = Quantity + 1 
        WHERE CartProductID = ?;
    `

	_, err := db.Exec(query, cartProductID)
	if err != nil {
		return err
	}

	return nil
}

// fetch('http://localhost:8080/cart/updateCartProductPlus/39', {
// 	method: 'PATCH',
// 	headers: {
// 	  'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({
// 	  // No need to send Quantity, since the backend will increment it
// 	}),
//   })
// 	.then(response => {
// 	  if (response.ok) {
// 		console.log("Quantity incremented successfully");
// 	  } else {
// 		console.error("Failed to update quantity");
// 	  }
// 	})
// 	.catch(error => console.error("Error:", error));

func UpdateCartProductMinus(cartProductID int) error {
	query := `
        UPDATE cartproduct 
        SET Quantity = Quantity - 1 
        WHERE CartProductID = ?;
    `

	_, err := db.Exec(query, cartProductID)
	if err != nil {
		return err
	}

	return nil
}

// fetch('http://localhost:8080/cart/updateCartProductMinus/39', {
// 	method: 'PATCH',
// 	headers: {
// 	  'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({
// 	  // No need to send Quantity, since the backend will increment it
// 	}),
//   })
// 	.then(response => {
// 	  if (response.ok) {
// 		console.log("Quantity incremented successfully");
// 	  } else {
// 		console.error("Failed to update quantity");
// 	  }
// 	})
// 	.catch(error => console.error("Error:", error));

// get cart id for user id
func GetCartID(customerID int) (int, error) {
	query := `SELECT CartID FROM cart WHERE CustomerID = ?;`
	row := db.QueryRow(query, customerID)
	var cartID int
	if err := row.Scan(&cartID); err != nil {
		return 0, err
	}
	return cartID, nil
}

//delete cart for user id

func DeleteCart(cartID int) error {
	query := `DELETE FROM cartproduct WHERE CartID = ?;`
	_, err := db.Exec(query, cartID)
	if err != nil {
		return err
	}
	return nil
}
