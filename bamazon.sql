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
VALUES 	("Mountian Bike, 18-speed, bullhorn handlebars", "Exercise", 249.99, 10),
		("16 Channel Panasonic Audio Mixer, Reverb", "Audio, Comm", 890.95, 8),
		("65\" Samsung Big Screen TV, with Wall Mount", "Video, Digital", 1499.95, 12),
		("Bose Ear Buds, wired/wireless, Superb audio", "Audio, Home", 79.99, 99),
		("Samsung 25.2 cu. ft. Refridgerator, w/Ice Maker", "Kitchen Appl", 1799.99, 25),
		("Fridgidare 26.1 cu. ft. Refridgerator, w/Ice", "Kitchen Appl", 1699.95, 20),
		("Kitchen Aide 20.9 cu. ft. Refridgerator, Black", "Kitchen Appl", 1499.85, 32),
		("LG 25.0 cu. ft. Refridgerator w/ Ice Maker", "Kitchen Appl", 1599.95, 16),
		("18 Ch. Carvin Mixer, bluetooth out, Main & Mons", "Audio, Comm", 1199.95, 17),
		("Couch & Love-Seat w/Recliner, 5 kick-outs ", "Furniture", 1695.89, 19);


