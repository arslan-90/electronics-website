USE za_electronics;
ALTER TABLE customers
ADD COLUMN gender VARCHAR(30),
ADD COLUMN job VARCHAR(100),
ADD COLUMN password VARCHAR(255);









ALTER TABLE orders
ADD COLUMN delivery_address TEXT AFTER customer_id;