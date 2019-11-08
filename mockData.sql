CREATE DATABASE bamazon_db; 

USE bamazon_db; 

CREATE TABLE products (
item_id INTEGER NOT NULL, 
product_name VARCHAR(200) NOT NULL, 
department_name VARCHAR(200) NULL, 
price DECIMAL(10,4) NOT NULL, 
stock_quantity INTEGER NULL,
product_sales DECIMAL(10,4)
);

CREATE TABLE departments (
deparment_id INTEGER NOT NULL, 
department_name VARCHAR(200) NOT NULL, 
over_head_costs INTEGER
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1, "Mock Item 1", "Mock Department 1", 1.99, 100, NULL); 

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (2, "Mock Item 2", "Mock Department 2", 2.99, 200, NULL); 

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (3, "Mock Item 3", "Mock Department 3", 3.99, 100, NULL); 

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (4, "Mock Item 4", "Mock Department 1", 4.99, 400, NULL); 

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (5, "Mock Item 5", "Mock Department 2", 5.99, 500, NULL); 

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (6, "Mock Item 6", "Mock Department 3", 6.99, 100, NULL); 