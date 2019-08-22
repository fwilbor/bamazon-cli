DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    stock_quantity INTEGER (10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick with Alexa Voice Remote", 39.99, "Electronics", 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot Speaker with Alexa", 49.99, "Electronics", 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wyze Cam 1080p HD Indoor Wireless Smart Home Camera", 25.98, "Electronics", 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fanture Men’s Memory Foam Slipper", 21.99, "Men's Shoes", 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BTFBM Women’s 2019 Casual Crew Neck Short Mini Dress", 22.99, "Women's Clothing", 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DualShock 4 Wireless Controller for PlayStation 4", 44.10, "Video Games", 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pampers Sensitive Water Baby Diaper Wipes", 13.86, "Baby", 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nutramax Cosequin DS Plus with MSM Chewable Tablets", 34.95, "Pet Supplies", 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Revlon One-Step Hair Dryer & Volumizer Hot Air Brush", 45.89, "Beauty & Personal Care", 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mrs. Meyer’s Liquid Hand Soap Refill", 4.75, "Beauty & Personal Care", 30);



USE bamazonDB;

CREATE TABLE departments (
    department_id INTEGER(11) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(40) NOT NULL,
    over_head_cost DECIMAL (10,2) NOT NULL,
     PRIMARY KEY (department_id)
);