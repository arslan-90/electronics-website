-- Show all products available in ZA Electronics.
SELECT * FROM products;


-- Show product names and prices.
SELECT product_name, price
FROM products;

-- Find products costing more than Rs. 10,000.

SELECT *
FROM products
WHERE price > 10000;

-- Find products costing more than Rs. 10,000 AND having more than 5 items in stock.
SELECT *
FROM products
WHERE price > 10000
AND stock > 5;


-- Find products from the Cables or Home Appliances categories.
SELECT *
FROM products
WHERE category_id = 1
OR category_id = 4;

-- Find products containing the word "Cable"..
SELECT *
FROM products
WHERE product_name LIKE '%Cable%';



-- Find products with prices between Rs. 1,000 and Rs. 50,000.
SELECT *
FROM products
WHERE price BETWEEN 1000 AND 50000;


-- Find products belonging to categories Cables, Audio, or Home Appliances. Their IDs are:

-- 1 = Cables
-- 2 = Audio
-- 4 = Home Appliances
SELECT *
FROM products
WHERE category_id IN (1, 2, 4);


-- ORDER BY — Cheapest first
SELECT *
FROM products
ORDER BY price ASC;



-- ORDER BY — Most expensive first
SELECT *
FROM products
ORDER BY price DESC;


-- COUNT() How many products does ZA Electronics have?
SELECT COUNT(*) AS total_products
FROM products;




-- COUNT() — Customers ow many customers are registered?
SELECT COUNT(*) AS total_customers
FROM customers;




-- SUM() What are the total sales recorded in the orders table?
SELECT SUM(total_amount) AS total_sales
FROM orders;




-- AVG() What is the average price of all products?
SELECT AVG(price) AS average_price
FROM products;




-- MAX() What is the highest product price?
SELECT MAX(price) AS highest_price
FROM products;




-- What is the lowest product price?
SELECT MIN(price) AS lowest_price
FROM products;



-- MAX() — Show the product too Which is the most expensive product?
SELECT product_name, price
FROM products
WHERE price = (
    SELECT MAX(price)
    FROM products
);




-- MIN() — Show the product too
SELECT product_name, price
FROM products
WHERE price = (
    SELECT MIN(price)
    FROM products
);




-- JOIN — Products with their categories Show each product with its category.
SELECT
    products.product_name,
    categories.category_name,
    products.price
FROM products
JOIN categories
ON products.category_id = categories.category_id;





-- JOIN — Order details Show which products were included in each order.
SELECT
    order_details.order_id,
    products.product_name,
    order_details.quantity,
    order_details.price
FROM order_details
JOIN products
ON order_details.product_id = products.product_id;






-- COUNT() with GROUP BY How many products are in each category?
SELECT
    categories.category_name,
    COUNT(products.product_id) AS total_products
FROM categories
LEFT JOIN products
ON categories.category_id = products.category_id
GROUP BY categories.category_id, categories.category_name;
-- You'll get approximately:

-- Cables             2
-- Audio              1
-- Deals              1
-- Home Appliances    2




-- SUM() with GROUP BY What is the total value of orders for each customer?
SELECT
    customers.name,
    SUM(orders.total_amount) AS total_spent
FROM customers
JOIN orders
ON customers.customer_id = orders.customer_id
GROUP BY customers.customer_id, customers.name;




-- Find completed orders
SELECT *
FROM orders
WHERE status = 'Completed';




-- Find pending OR processing orders
SELECT *
FROM orders
WHERE status = 'Pending'
OR status = 'Processing';