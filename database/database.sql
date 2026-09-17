CREATE DATABASE za_electronics;

USE za_electronics;


-- =========================================
-- 1. CATEGORIES TABLE
-- =========================================

CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL
);

INSERT INTO categories (category_name) VALUES
('Cables'),
('Audio'),
('Deals'),
('Home Appliances');


-- =========================================
-- 2. PRODUCTS TABLE
-- =========================================

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    stock INT DEFAULT 0,
    image VARCHAR(255),

    FOREIGN KEY (category_id)
    REFERENCES categories(category_id)
);

INSERT INTO products
(category_id, product_name, price, description, stock, image)
VALUES

(1, 'Local Cable',
250.00,
'Powerful cable suitable for work and everyday use.',
15,
'images/pic1.jpg'),

(3, '4 in 1 Deal',
300000.00,
'Designed for customers who want multiple electronic products together in one package.',
12,
'images/pic13.jpg'),

(1, 'Imported Cables',
4500.00,
'Imported cable suitable for work and everyday use with lifetime warranty.',
20,
'images/pic4.jpg'),

(4, 'Fridge',
70000.00,
'Premium fridge with excellent performance.',
8,
'images/pic14.jpg'),

(4, 'Oven',
45000.00,
'Modern oven with powerful performance and advanced system.',
7,
'images/pic15.jpg'),

(2, 'Bluetooth Speakers',
15000.00,
'Affordable speakers with long-lasting battery.',
18,
'images/pic17.jpg');


-- =========================================
-- 3. CUSTOMERS TABLE
-- =========================================

CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20)
);

INSERT INTO customers (name, email, phone) VALUES
('Ali Khan', 'ali.khan@gmail.com', '03001234567'),
('Ahmed Raza', 'ahmed.raza@gmail.com', '03111234567'),
('Hassan Malik', 'hassan.malik@gmail.com', '03221234567'),
('Usman Ahmed', 'usman.ahmed@gmail.com', '03331234567'),
('Hamza Tariq', 'hamza.tariq@gmail.com', '03441234567'),
('Bilal Shah', 'bilal.shah@gmail.com', '03551234567'),
('Ayesha Noor', 'ayesha.noor@gmail.com', '03061234567'),
('Sara Khan', 'sara.khan@gmail.com', '03171234567');


-- =========================================
-- 4. ORDERS TABLE
-- =========================================

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',

    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
);

INSERT INTO orders
(customer_id, order_date, total_amount, status)
VALUES

(1, '2026-08-01 10:30:00', 4750.00, 'Completed'),

(2, '2026-08-03 14:15:00', 70000.00, 'Completed'),

(3, '2026-08-05 11:45:00', 15000.00, 'Processing'),

(4, '2026-08-08 16:20:00', 45000.00, 'Completed'),

(5, '2026-08-10 13:10:00', 304500.00, 'Pending'),

(6, '2026-08-12 17:30:00', 250.00, 'Completed'),

(7, '2026-08-15 12:25:00', 85000.00, 'Processing'),

(8, '2026-08-18 15:40:00', 15000.00, 'Pending');


-- =========================================
-- 5. ORDER DETAILS TABLE
-- =========================================

CREATE TABLE order_details (
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
    REFERENCES orders(order_id),

    FOREIGN KEY (product_id)
    REFERENCES products(product_id)
);

INSERT INTO order_details
(order_id, product_id, quantity, price)
VALUES

-- Order 1
(1, 1, 1, 250.00),
(1, 3, 1, 4500.00),

-- Order 2
(2, 4, 1, 70000.00),

-- Order 3
(3, 6, 1, 15000.00),

-- Order 4
(4, 5, 1, 45000.00),

-- Order 5
(5, 2, 1, 300000.00),
(5, 1, 1, 250.00),
(5, 3, 1, 4500.00),

-- Order 6
(6, 1, 1, 250.00),

-- Order 7
(7, 4, 1, 70000.00),
(7, 5, 1, 45000.00),

-- Order 8
(8, 6, 1, 15000.00);


-- =========================================
-- 6. MESSAGES TABLE
-- =========================================

CREATE TABLE messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(150),
    message TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages
(name, email, subject, message)
VALUES

('Ali Khan',
'ali.khan@gmail.com',
'Product Availability',
'Is the Imported Cables product currently available in stock?'),

('Sara Khan',
'sara.khan@gmail.com',
'Delivery Information',
'How many days does delivery usually take?'),

('Ahmed Raza',
'ahmed.raza@gmail.com',
'Product Inquiry',
'I would like more information about the Fridge.'),

('Ayesha Noor',
'ayesha.noor@gmail.com',
'Return Policy',
'Please provide information about your product return policy.'),

('Hassan Malik',
'hassan.malik@gmail.com',
'Product Question',
'I would like to know more about the Bluetooth Speakers.');







-- just copy paste this

CREATE DATABASE za_electronics;

USE za_electronics;
CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL
);

INSERT INTO categories (category_name) VALUES
('Cables'),
('Audio'),
('Deals'),
('Home Appliances');

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    stock INT DEFAULT 0,
    image VARCHAR(255),

    FOREIGN KEY (category_id)
    REFERENCES categories(category_id)
);

INSERT INTO products
(category_id, product_name, price, description, stock, image)
VALUES

(1, 'Local Cable',
250.00,
'Powerful cable suitable for work and everyday use.',
15,
'images/pic1.jpg'),

(3, '4 in 1 Deal',
300000.00,
'Designed for customers who want multiple electronic products together in one package.',
12,
'images/pic13.jpg'),

(1, 'Imported Cables',
4500.00,
'Imported cable suitable for work and everyday use with lifetime warranty.',
20,
'images/pic4.jpg'),

(4, 'Fridge',
70000.00,
'Premium fridge with excellent performance.',
8,
'images/pic14.jpg'),

(4, 'Oven',
45000.00,
'Modern oven with powerful performance and advanced system.',
7,
'images/pic15.jpg'),

(2, 'Bluetooth Speakers',
15000.00,
'Affordable speakers with long-lasting battery.',
18,
'images/pic17.jpg');
CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20)
);

INSERT INTO customers (name, email, phone) VALUES
('Ali Khan', 'ali.khan@gmail.com', '03001234567'),
('Ahmed Raza', 'ahmed.raza@gmail.com', '03111234567'),
('Hassan Malik', 'hassan.malik@gmail.com', '03221234567'),
('Usman Ahmed', 'usman.ahmed@gmail.com', '03331234567'),
('Hamza Tariq', 'hamza.tariq@gmail.com', '03441234567'),
('Bilal Shah', 'bilal.shah@gmail.com', '03551234567'),
('Ayesha Noor', 'ayesha.noor@gmail.com', '03061234567'),
('Sara Khan', 'sara.khan@gmail.com', '03171234567');


CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',

    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
);

INSERT INTO orders
(customer_id, order_date, total_amount, status)
VALUES

(1, '2026-08-01 10:30:00', 4750.00, 'Completed'),

(2, '2026-08-03 14:15:00', 70000.00, 'Completed'),

(3, '2026-08-05 11:45:00', 15000.00, 'Processing'),

(4, '2026-08-08 16:20:00', 45000.00, 'Completed'),

(5, '2026-08-10 13:10:00', 304500.00, 'Pending'),

(6, '2026-08-12 17:30:00', 250.00, 'Completed'),

(7, '2026-08-15 12:25:00', 85000.00, 'Processing'),

(8, '2026-08-18 15:40:00', 15000.00, 'Pending');
CREATE TABLE order_details (
    order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
    REFERENCES orders(order_id),

    FOREIGN KEY (product_id)
    REFERENCES products(product_id)
);

INSERT INTO order_details
(order_id, product_id, quantity, price)
VALUES


(1, 1, 1, 250.00),
(1, 3, 1, 4500.00),


(2, 4, 1, 70000.00),


(3, 6, 1, 15000.00),


(4, 5, 1, 45000.00),


(5, 2, 1, 300000.00),
(5, 1, 1, 250.00),
(5, 3, 1, 4500.00),


(6, 1, 1, 250.00),


(7, 4, 1, 70000.00),
(7, 5, 1, 45000.00),


(8, 6, 1, 15000.00);


CREATE TABLE messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(150),
    message TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages
(name, email, subject, message)
VALUES

('Ali Khan',
'ali.khan@gmail.com',
'Product Availability',
'Is the Imported Cables product currently available in stock?'),

('Sara Khan',
'sara.khan@gmail.com',
'Delivery Information',
'How many days does delivery usually take?'),

('Ahmed Raza',
'ahmed.raza@gmail.com',
'Product Inquiry',
'I would like more information about the Fridge.'),

('Ayesha Noor',
'ayesha.noor@gmail.com',
'Return Policy',
'Please provide information about your product return policy.'),

('Hassan Malik',
'hassan.malik@gmail.com',
'Product Question',
'I would like to know more about the Bluetooth Speakers.');