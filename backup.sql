/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.3-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: ECommerceDB
-- ------------------------------------------------------
-- Server version	11.4.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Current Database: `ECommerceDB`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ECommerceDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `ECommerceDB`;

--
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Address` (
  `AddressID` int(11) NOT NULL AUTO_INCREMENT,
  `HouseNo` varchar(255) NOT NULL,
  `Street` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `ZipCodeID` int(11) NOT NULL,
  `Area` varchar(255) NOT NULL,
  PRIMARY KEY (`AddressID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `ZipCodeID` (`ZipCodeID`),
  CONSTRAINT `Address_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`CustomerID`),
  CONSTRAINT `Address_ibfk_2` FOREIGN KEY (`ZipCodeID`) REFERENCES `ZipCode` (`ZipCodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Address`
--

LOCK TABLES `Address` WRITE;
/*!40000 ALTER TABLE `Address` DISABLE KEYS */;
/*!40000 ALTER TABLE `Address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cart` (
  `CartID` int(11) NOT NULL AUTO_INCREMENT,
  `DateCreated` date NOT NULL,
  `CustomerID` int(11) NOT NULL,
  PRIMARY KEY (`CartID`),
  KEY `CustomerID` (`CustomerID`),
  CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`CustomerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart`
--

LOCK TABLES `Cart` WRITE;
/*!40000 ALTER TABLE `Cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CartProduct`
--

DROP TABLE IF EXISTS `CartProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CartProduct` (
  `CartProductID` int(11) NOT NULL AUTO_INCREMENT,
  `VendorProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `CartID` int(11) NOT NULL,
  PRIMARY KEY (`CartProductID`),
  KEY `VendorProductID` (`VendorProductID`),
  KEY `CartID` (`CartID`),
  CONSTRAINT `CartProduct_ibfk_1` FOREIGN KEY (`VendorProductID`) REFERENCES `VendorProduct` (`VendorProductID`),
  CONSTRAINT `CartProduct_ibfk_2` FOREIGN KEY (`CartID`) REFERENCES `Cart` (`CartID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CartProduct`
--

LOCK TABLES `CartProduct` WRITE;
/*!40000 ALTER TABLE `CartProduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `CartProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `City`
--

DROP TABLE IF EXISTS `City`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `City` (
  `CityID` int(11) NOT NULL AUTO_INCREMENT,
  `CityName` varchar(255) NOT NULL,
  PRIMARY KEY (`CityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `City`
--

LOCK TABLES `City` WRITE;
/*!40000 ALTER TABLE `City` DISABLE KEYS */;
/*!40000 ALTER TABLE `City` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Country` (
  `CountryID` int(11) NOT NULL AUTO_INCREMENT,
  `CountryName` varchar(255) NOT NULL,
  PRIMARY KEY (`CountryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Courier`
--

DROP TABLE IF EXISTS `Courier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Courier` (
  `CourierID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Contact` varchar(255) NOT NULL,
  PRIMARY KEY (`CourierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Courier`
--

LOCK TABLES `Courier` WRITE;
/*!40000 ALTER TABLE `Courier` DISABLE KEYS */;
/*!40000 ALTER TABLE `Courier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer`
--

DROP TABLE IF EXISTS `Customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer` (
  `CustomerID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Contact` varchar(255) NOT NULL,
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer`
--


--
-- Table structure for table `CustomerPaymentInfo`
--

DROP TABLE IF EXISTS `CustomerPaymentInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CustomerPaymentInfo` (
  `CustomerPaymentInfoID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerID` int(11) NOT NULL,
  `PaymentMethodID` int(11) NOT NULL,
  `CardNumber` varchar(255) NOT NULL,
  `ExpirationDate` varchar(10) NOT NULL,
  `CVV` varchar(4) NOT NULL,
  `BillingAddressID` int(11) DEFAULT NULL,
  PRIMARY KEY (`CustomerPaymentInfoID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `PaymentMethodID` (`PaymentMethodID`),
  KEY `BillingAddressID` (`BillingAddressID`),
  CONSTRAINT `CustomerPaymentInfo_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`CustomerID`),
  CONSTRAINT `CustomerPaymentInfo_ibfk_2` FOREIGN KEY (`PaymentMethodID`) REFERENCES `PaymentMethod` (`PaymentMethodID`),
  CONSTRAINT `CustomerPaymentInfo_ibfk_3` FOREIGN KEY (`BillingAddressID`) REFERENCES `Address` (`AddressID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CustomerPaymentInfo`
--

LOCK TABLES `CustomerPaymentInfo` WRITE;
/*!40000 ALTER TABLE `CustomerPaymentInfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `CustomerPaymentInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderedProduct`
--

DROP TABLE IF EXISTS `OrderedProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OrderedProduct` (
  `OrderedProductID` int(11) NOT NULL AUTO_INCREMENT,
  `VendorProductID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  PRIMARY KEY (`OrderedProductID`),
  KEY `VendorProductID` (`VendorProductID`),
  KEY `OrderID` (`OrderID`),
  CONSTRAINT `OrderedProduct_ibfk_1` FOREIGN KEY (`VendorProductID`) REFERENCES `VendorProduct` (`VendorProductID`),
  CONSTRAINT `OrderedProduct_ibfk_2` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderedProduct`
--

LOCK TABLES `OrderedProduct` WRITE;
/*!40000 ALTER TABLE `OrderedProduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `OrderedProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `OrderID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerID` int(11) NOT NULL,
  `OrderDate` date NOT NULL,
  `AddressID` int(11) NOT NULL,
  `VendorCourierID` int(11) NOT NULL,
  `TrackingID` varchar(255) NOT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `AddressID` (`AddressID`),
  KEY `VendorCourierID` (`VendorCourierID`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`CustomerID`),
  CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`AddressID`) REFERENCES `Address` (`AddressID`),
  CONSTRAINT `Orders_ibfk_3` FOREIGN KEY (`VendorCourierID`) REFERENCES `VendorCourier` (`VendorCourierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Payment` (
  `PaymentID` int(11) NOT NULL AUTO_INCREMENT,
  `OrderID` int(11) NOT NULL,
  `PaymentMethodID` int(11) NOT NULL,
  `Amount` decimal(19,2) NOT NULL,
  `PaymentDate` datetime NOT NULL,
  `TransactionID` varchar(255) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `PaymentStatusID` int(11) NOT NULL,
  PRIMARY KEY (`PaymentID`),
  UNIQUE KEY `TransactionID` (`TransactionID`),
  KEY `OrderID` (`OrderID`),
  KEY `PaymentMethodID` (`PaymentMethodID`),
  KEY `fk_payment_status` (`PaymentStatusID`),
  CONSTRAINT `Payment_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`OrderID`),
  CONSTRAINT `Payment_ibfk_2` FOREIGN KEY (`PaymentMethodID`) REFERENCES `PaymentMethod` (`PaymentMethodID`),
  CONSTRAINT `fk_payment_status` FOREIGN KEY (`PaymentStatusID`) REFERENCES `PaymentStatus` (`PaymentStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentMethod`
--

DROP TABLE IF EXISTS `PaymentMethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PaymentMethod` (
  `PaymentMethodID` int(11) NOT NULL AUTO_INCREMENT,
  `MethodName` varchar(255) NOT NULL,
  PRIMARY KEY (`PaymentMethodID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentMethod`
--

LOCK TABLES `PaymentMethod` WRITE;
/*!40000 ALTER TABLE `PaymentMethod` DISABLE KEYS */;
/*!40000 ALTER TABLE `PaymentMethod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentStatus`
--

DROP TABLE IF EXISTS `PaymentStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PaymentStatus` (
  `PaymentStatusID` int(11) NOT NULL AUTO_INCREMENT,
  `StatusDescription` varchar(255) NOT NULL,
  PRIMARY KEY (`PaymentStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentStatus`
--

LOCK TABLES `PaymentStatus` WRITE;
/*!40000 ALTER TABLE `PaymentStatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `PaymentStatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Product` (
  `ProductID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `CategoryID` (`CategoryID`),
  CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Province`
--

DROP TABLE IF EXISTS `Province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Province` (
  `ProvinceID` int(11) NOT NULL AUTO_INCREMENT,
  `ProvinceName` varchar(255) NOT NULL,
  PRIMARY KEY (`ProvinceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Province`
--

LOCK TABLES `Province` WRITE;
/*!40000 ALTER TABLE `Province` DISABLE KEYS */;
/*!40000 ALTER TABLE `Province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Review` (
  `ReviewID` int(11) NOT NULL AUTO_INCREMENT,
  `Rating` tinyint(4) NOT NULL,
  `Comment` text DEFAULT NULL,
  `CustomerID` int(11) NOT NULL,
  `OrderedProductID` int(11) NOT NULL,
  PRIMARY KEY (`ReviewID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `OrderedProductID` (`OrderedProductID`),
  CONSTRAINT `Review_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`CustomerID`),
  CONSTRAINT `Review_ibfk_2` FOREIGN KEY (`OrderedProductID`) REFERENCES `OrderedProduct` (`OrderedProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendor`
--

DROP TABLE IF EXISTS `Vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vendor` (
  `VendorID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Address` text NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Contact` varchar(255) NOT NULL,
  PRIMARY KEY (`VendorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendor`
--

LOCK TABLES `Vendor` WRITE;
/*!40000 ALTER TABLE `Vendor` DISABLE KEYS */;
/*!40000 ALTER TABLE `Vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VendorCourier`
--

DROP TABLE IF EXISTS `VendorCourier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VendorCourier` (
  `VendorCourierID` int(11) NOT NULL AUTO_INCREMENT,
  `VendorID` int(11) NOT NULL,
  `CourierID` int(11) NOT NULL,
  PRIMARY KEY (`VendorCourierID`),
  KEY `VendorID` (`VendorID`),
  KEY `CourierID` (`CourierID`),
  CONSTRAINT `VendorCourier_ibfk_1` FOREIGN KEY (`VendorID`) REFERENCES `Vendor` (`VendorID`),
  CONSTRAINT `VendorCourier_ibfk_2` FOREIGN KEY (`CourierID`) REFERENCES `Courier` (`CourierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VendorCourier`
--

LOCK TABLES `VendorCourier` WRITE;
/*!40000 ALTER TABLE `VendorCourier` DISABLE KEYS */;
/*!40000 ALTER TABLE `VendorCourier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VendorProduct`
--

DROP TABLE IF EXISTS `VendorProduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VendorProduct` (
  `VendorProductID` int(11) NOT NULL AUTO_INCREMENT,
  `VendorID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Price` decimal(19,2) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Description` text NOT NULL,
  PRIMARY KEY (`VendorProductID`),
  KEY `VendorID` (`VendorID`),
  KEY `ProductID` (`ProductID`),
  CONSTRAINT `VendorProduct_ibfk_1` FOREIGN KEY (`VendorID`) REFERENCES `Vendor` (`VendorID`),
  CONSTRAINT `VendorProduct_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VendorProduct`
--

LOCK TABLES `VendorProduct` WRITE;
/*!40000 ALTER TABLE `VendorProduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `VendorProduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ZipCode`
--

DROP TABLE IF EXISTS `ZipCode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ZipCode` (
  `ZipCodeID` int(11) NOT NULL AUTO_INCREMENT,
  `CityID` int(11) NOT NULL,
  `ProvinceID` int(11) NOT NULL,
  `CountryID` int(11) NOT NULL,
  PRIMARY KEY (`ZipCodeID`),
  KEY `CityID` (`CityID`),
  KEY `ProvinceID` (`ProvinceID`),
  KEY `CountryID` (`CountryID`),
  CONSTRAINT `ZipCode_ibfk_1` FOREIGN KEY (`CityID`) REFERENCES `City` (`CityID`),
  CONSTRAINT `ZipCode_ibfk_2` FOREIGN KEY (`ProvinceID`) REFERENCES `Province` (`ProvinceID`),
  CONSTRAINT `ZipCode_ibfk_3` FOREIGN KEY (`CountryID`) REFERENCES `Country` (`CountryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ZipCode`
--

LOCK TABLES `ZipCode` WRITE;
/*!40000 ALTER TABLE `ZipCode` DISABLE KEYS */;
/*!40000 ALTER TABLE `ZipCode` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-11-05 14:36:35
