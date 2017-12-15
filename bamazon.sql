DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(300) NOT NULL,
    department_name VARCHAR(300) NOT NULL,
    price DECIMAL(8, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hello Kitty Foam Chair", "Toys & Games", 26.98, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cool Mist Humidifier", "Home & Garden", 48.99, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Portable Air Compressor", "Automotive", 37.88, 72);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tickle Me Elmo", "Toys & Games", 23.19, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("51 Piece Cake Decorating Kit", "Kitchen", 14.99, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Air Jet Inflatable Hot Tub", "Outdoor", 349, 46);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ultrasoft Silicone Washable Cat Massager", "Pet Supplies", 7.99, 38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HD Dog Cam with 2-way Audio", "Electronics", 160, 46);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knitting and Sewing Storage Bag", "Arts, Crafts & Sewing", 19.95, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smores Skewers and Hot Dog Fork Kit", "Outdoors", 15.99, 12);
