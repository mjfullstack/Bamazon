DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(80) NULL,
  department_name VARCHAR(50) NULL,
  retail_price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, retail_price, stock_quantity)
VALUES 	("Mountian Bike", "Exercise", 249.99, 10),
		("16 Channel Mixer", "Audio", 800.00, 8),
		("65\" Samsung Big Screen", "Video", 1499.95, 12),
		("Bose Ear Buds", "Audio", 79.99, 90),
		("Samsung 25.2 cu. ft. Refridgerator", "Kitchen", 1800.00, 25),
		("Fridgidare 26.1 cu. ft. Refridgerator", "Kitchen", 1600.00, 20),
		("Kitchen Aide 20.9 cu. ft. Refridgerator", "Kitchen", 1499.00, 32),
		("LG 25.0 cu. ft. Refridgerator", "Kitchen", 1599.95, 16),
		("18 Ch. Carvin Mixer", "Audio", 1199.90, 17),
		("Couch & Love-Seat", "Furniture", 1695.00, 19);


