CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE Products ( ItemID int NOT NULL AUTO_INCREMENT, ProductName varchar(70) NOT NULL, DepartmentName varchar(50) NOT NULL, Price int NOT NULL, StockQuantity int NOT NULL, PRIMARY KEY (ItemID));
INSERT INTO Products (ProductName, DepartmentName , Price, StockQuantity) VALUES ('Call of Duty 7', 'Video Games', 59.95 , 150), ('James and the Giant Peach', 'Movies', 12.25 , 50), ('$20 Best Buy Gift Card', 'Other', 19.99 , 4000), ('Lays Chips', 'Food', 3.50 , 200), ('Jumping Flash', 'Video Games', 35.00 , 4), ('Tri-force Sword', 'Other', 300.00 , 3), ('Nike Mens Air Jordan Retro 11 Space Jam', 'Shoes', 700.00 , 1), ('Nike Mens Air Jordan Retro 8 Bugs Bunny', 'Shoes', 435.00 , 6), ('Rolex Daytona Ice Blue Dial Platinum Mes Watch', 'Accessories', 60500.00 , 2), ('18k White Gold Necklace w/ Diamonds', 'Accessories', 125500.00 , 1);
CREATE TABLE Managers (name varchar(100) NOT NULL,loginDateTime datetime NOT NULL DEFAULT NOW());
INSERT INTO Managers (name) VALUES ('Admin');
CREATE TABLE Customers (Name varchar(100) NOT NULL,Zipcode int NOT NULL,Request varchar(300) NOT NULL,Amount int NOT NULL,TotalCost int NOT NULL,LoginDateTime datetime NOT NULL DEFAULT NOW());
INSERT INTO Customers (Name, Zipcode, Request, Amount, TotalCost) VALUES ('Admin', 19709, 'Beans',2 ,4);