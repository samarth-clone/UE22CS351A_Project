CREATE DATABASE ECommerceDB;

USE ECommerceDB;

CREATE TABLE Customer
(
    CustomerID int AUTO_INCREMENT PRIMARY KEY,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    DOB date NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Contact varchar(255) NOT NULL
);


CREATE TABLE Country
(
    CountryID int AUTO_INCREMENT PRIMARY KEY,
    CountryName varchar(255) NOT NULL
);

CREATE TABLE Province
(
    ProvinceID int AUTO_INCREMENT PRIMARY KEY,
    ProvinceName varchar(255) NOT NULL
);

CREATE TABLE City
(
    CityID int AUTO_INCREMENT PRIMARY KEY,
    CityName varchar(255) NOT NULL
);

CREATE TABLE ZipCode
(
    ZipCodeID int AUTO_INCREMENT PRIMARY KEY,
    CityID int NOT NULL,
    ProvinceID int NOT NULL,
    CountryID int NOT NULL,
    FOREIGN KEY (CityID) REFERENCES City(CityID),
    FOREIGN KEY (ProvinceID) REFERENCES Province(ProvinceID),
    FOREIGN KEY (CountryID) REFERENCES Country(CountryID)
);

CREATE TABLE Address
(
    AddressID int AUTO_INCREMENT PRIMARY KEY,
    HouseNo varchar(255) NOT NULL,
    Street int NOT NULL,
    CustomerID int NOT NULL,
    ZipCodeID int NOT NULL,
    Area varchar(255) NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (ZipCodeID) REFERENCES ZipCode(ZipCodeID)
);

CREATE TABLE Category
(
    CategoryID int AUTO_INCREMENT PRIMARY KEY,
    CategoryName varchar(255) NOT NULL
);

CREATE TABLE Vendor
(
    VendorID int AUTO_INCREMENT PRIMARY KEY,
    Name varchar(255) NOT NULL,
    Address text NOT NULL,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Contact varchar(255) NOT NULL
);

CREATE TABLE Product
(
    ProductID int AUTO_INCREMENT PRIMARY KEY,
    ProductName varchar(255) NOT NULL,
    CategoryID int NOT NULL,
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);

CREATE TABLE VendorProduct
(
    VendorProductID int AUTO_INCREMENT PRIMARY KEY,
    VendorID int NOT NULL,
    ProductID int NOT NULL,
    Price decimal(19, 2) NOT NULL,
    Quantity int NOT NULL,
    Description text NOT NULL,
    FOREIGN KEY (VendorID) REFERENCES Vendor(VendorID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

CREATE TABLE Courier
(
    CourierID int AUTO_INCREMENT PRIMARY KEY,
    Name varchar(255) NOT NULL,
    Contact varchar(255) NOT NULL
);

CREATE TABLE VendorCourier
(
    VendorCourierID int AUTO_INCREMENT PRIMARY KEY,
    VendorID int NOT NULL,
    CourierID int NOT NULL,
    FOREIGN KEY (VendorID) REFERENCES Vendor(VendorID),
    FOREIGN KEY (CourierID) REFERENCES Courier(CourierID)
);

CREATE TABLE Orders
(
    OrderID int AUTO_INCREMENT PRIMARY KEY,
    CustomerID int NOT NULL,
    OrderDate date NOT NULL,
    AddressID int NOT NULL,
    VendorCourierID int NOT NULL,
    TrackingID varchar(255) NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (AddressID) REFERENCES Address(AddressID),
    FOREIGN KEY (VendorCourierID) REFERENCES VendorCourier(VendorCourierID)
);

CREATE TABLE OrderedProduct
(
    OrderedProductID int AUTO_INCREMENT PRIMARY KEY,
    VendorProductID int NOT NULL,
    OrderID int NOT NULL,
    Quantity int NOT NULL,
    FOREIGN KEY (VendorProductID) REFERENCES VendorProduct(VendorProductID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

CREATE TABLE Review
(
    ReviewID int AUTO_INCREMENT PRIMARY KEY,
    Rating tinyint NOT NULL,
    Comment text,
    CustomerID int NOT NULL,
    OrderedProductID int NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (OrderedProductID) REFERENCES OrderedProduct(OrderedProductID)
);

CREATE TABLE Cart
(
    CartID int AUTO_INCREMENT PRIMARY KEY,
    DateCreated date NOT NULL,
    CustomerID int NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE CartProduct
(
    CartProductID int AUTO_INCREMENT PRIMARY KEY,
    VendorProductID int NOT NULL,
    Quantity int NOT NULL,
    CartID int NOT NULL,
    FOREIGN KEY (VendorProductID) REFERENCES VendorProduct(VendorProductID),
    FOREIGN KEY (CartID) REFERENCES Cart(CartID)
);

-- New tables for payment gateway integration
CREATE TABLE PaymentMethod
(
    PaymentMethodID int AUTO_INCREMENT PRIMARY KEY,
    MethodName varchar(255) NOT NULL
);

CREATE TABLE Payment
(
    PaymentID int AUTO_INCREMENT PRIMARY KEY,
    OrderID int NOT NULL,
    PaymentMethodID int NOT NULL,
    Amount decimal(19, 2) NOT NULL,
    PaymentDate datetime NOT NULL,
    TransactionID varchar(255) NOT NULL UNIQUE,
    Status varchar(50) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethod(PaymentMethodID)
);

CREATE TABLE CustomerPaymentInfo
(
    CustomerPaymentInfoID int AUTO_INCREMENT PRIMARY KEY,
    CustomerID int NOT NULL,
    PaymentMethodID int NOT NULL,
    CardNumber varchar(255) NOT NULL,
    ExpirationDate varchar(10) NOT NULL,
    CVV varchar(4) NOT NULL,
    BillingAddressID int NULL, -- Optional
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethod(PaymentMethodID),
    FOREIGN KEY (BillingAddressID) REFERENCES Address(AddressID)
);

CREATE TABLE PaymentStatus
(
    PaymentStatusID int AUTO_INCREMENT PRIMARY KEY,
    StatusDescription varchar(255) NOT NULL
);

ALTER TABLE Payment
ADD PaymentStatusID int NOT NULL,
ADD CONSTRAINT fk_payment_status
FOREIGN KEY (PaymentStatusID) REFERENCES PaymentStatus(PaymentStatusID);

