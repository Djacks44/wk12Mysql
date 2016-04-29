CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE Products ( ItemID int NOT NULL AUTO_INCREMENT, ProductName varchar(70) NOT NULL, DepartmentName varchar(50) NOT NULL, Price int NOT NULL, StockQuantity int NOT NULL, PRIMARY KEY (ItemID));

