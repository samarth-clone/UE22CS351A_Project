package models

import "time"

type Customer struct {
	CustomerID int       `json:"customer_id"`
	FirstName  string    `json:"first_name"`
	LastName   string    `json:"last_name"`
	DOB        time.Time `json:"dob"`
	Email      string    `json:"email"`
	Password   string    `json:"password"`
	Contact    string    `json:"contact"`
}

type TempCustomer struct {
	CustomerID int    `json:"customer_id"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	DOB        string `json:"dob"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Contact    string `json:"contact"`
}

type Vendor struct {
	VendorID int    `json:"vendor_id"`
	Name     string `json:"name"`
	Address  string `json:"address"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Contact  string `json:"contact"`
}

type VendorProduct struct {
	VendorProductID int     `json:"vendor_product_id"`
	VendorID        int     `json:"vendor_id"`
	ProductID       int     `json:"product_id"`
	Price           float64 `json:"price"`
	Quantity        int     `json:"quantity"`
	Description     string  `json:"description"`
}

type VendorCourier struct {
	VendorCourierID int `json:"vendor_courier_id"`
	VendorID        int `json:"vendor_id"`
	CourierID       int `json:"courier_id"`
}

type CustomerPaymentInfo struct {
	CustomerPaymentInfoID int    `json:"customer_payment_info_id"`
	CustomerID            int    `json:"customer_id"`
	PaymentMethodID       int    `json:"payment_method_id"`
	CardNumber            string `json:"card_number"`
	ExpirationDate        string `json:"expiration_date"`
	CVV                   string `json:"cvv"`
	BillingAddressID      *int   `json:"billing_address_id,omitempty"`
}

type Payment struct {
	PaymentID       int       `json:"payment_id"`
	OrderID         int       `json:"order_id"`
	PaymentMethodID int       `json:"payment_method_id"`
	Amount          float64   `json:"amount"`
	PaymentDate     time.Time `json:"payment_date"`
	TransactionID   string    `json:"transaction_id"`
	Status          string    `json:"status"`
	PaymentStatusID int       `json:"payment_status_id"`
}

type OrderedProduct struct {
	OrderedProductID int `json:"ordered_product_id"`
	VendorProductID  int `json:"vendor_product_id"`
	OrderID          int `json:"order_id"`
	Quantity         int `json:"quantity"`
}

type Cart struct {
	CartID      int       `json:"cart_id"`
	DateCreated time.Time `json:"date_created"`
	CustomerID  int       `json:"customer_id"`
}

type Orders struct {
	OrderID         int       `json:"order_id"`
	CustomerID      int       `json:"customer_id"`
	OrderDate       time.Time `json:"order_date"`
	AddressID       int       `json:"address_id"`
	VendorCourierID int       `json:"vendor_courier_id"`
	TrackingID      string    `json:"tracking_id"`
}

type Product struct {
	ProductID   int    `json:"product_id"`
	ProductName string `json:"product_name"`
	CategoryID  int    `json:"category_id"`
}

type Review struct {
	ReviewID         int    `json:"review_id"`
	Rating           int    `json:"rating"`
	Comment          string `json:"comment,omitempty"`
	CustomerID       int    `json:"customer_id"`
	OrderedProductID int    `json:"ordered_product_id"`
}

type Courier struct {
	CourierID int    `json:"courier_id"`
	Name      string `json:"name"`
	Contact   string `json:"contact"`
}

type CartProduct struct {
	CartProductID   int `json:"cart_product_id"`
	VendorProductID int `json:"vendor_product_id"`
	Quantity        int `json:"quantity"`
	CartID          int `json:"cart_id"`
}

type PaymentStatus struct {
	PaymentStatusID   int    `json:"payment_status_id"`
	StatusDescription string `json:"status_description"`
}

type Country struct {
	CountryID   int    `json:"country_id"`
	CountryName string `json:"country_name"`
}

type Address struct {
	AddressID  int    `json:"address_id"`
	HouseNo    string `json:"house_no"`
	Street     string `json:"street"`
	CustomerID int    `json:"customer_id"`
	ZipCodeID  int    `json:"zip_code_id"`
	Area       string `json:"area"`
}

type City struct {
	CityID   int    `json:"city_id"`
	CityName string `json:"city_name"`
}

type ZipCode struct {
	ZipCodeID  int `json:"zip_code_id"`
	CityID     int `json:"city_id"`
	ProvinceID int `json:"province_id"`
	CountryID  int `json:"country_id"`
}

type PaymentMethod struct {
	PaymentMethodID int    `json:"payment_method_id"`
	MethodName      string `json:"method_name"`
}

type Province struct {
	ProvinceID   int    `json:"province_id"`
	ProvinceName string `json:"province_name"`
}

type Category struct {
	CategoryID   int    `json:"category_id"`
	CategoryName string `json:"category_name"`
}
