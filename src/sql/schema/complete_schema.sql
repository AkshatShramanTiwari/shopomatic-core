
-- Complete database schema for E-commerce platform
-- Follows proper normalization (1NF, 2NF, 3NF, and BCNF where applicable)
-- Includes proper indexes, constraints, and referential integrity

-- Users Table (1NF, 2NF, 3NF)
CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('seller', 'customer') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sellers Table (1NF, 2NF, 3NF)
CREATE TABLE Sellers (
  seller_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  business_address TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- Customers Table (1NF, 2NF, 3NF)
CREATE TABLE Customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- Products Table (1NF, 2NF, 3NF)
CREATE TABLE Products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  seller_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  category VARCHAR(100) NOT NULL,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES Sellers(seller_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for product search optimization
CREATE INDEX idx_product_category ON Products(category);
CREATE INDEX idx_product_price ON Products(price);

-- Orders Table (1NF, 2NF, 3NF)
CREATE TABLE Orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  payment_method ENUM('Online', 'Cash on Delivery') NOT NULL,
  payment_status ENUM('Pending', 'Paid') DEFAULT 'Pending',
  order_status ENUM('Processing', 'Shipped', 'Delivered') DEFAULT 'Processing',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for order management
CREATE INDEX idx_order_customer ON Orders(customer_id);
CREATE INDEX idx_order_status ON Orders(order_status);

-- Order_Items Table (1NF, 2NF, 3NF, BCNF)
CREATE TABLE Order_Items (
  order_item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  price_at_purchase DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) 
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (product_id) REFERENCES Products(product_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for order items
CREATE INDEX idx_order_items_order ON Order_Items(order_id);
CREATE INDEX idx_order_items_product ON Order_Items(product_id);

-- Payments Table (1NF, 2NF, 3NF)
CREATE TABLE Payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL UNIQUE,
  transaction_id VARCHAR(100) UNIQUE NOT NULL,
  payment_status ENUM('Success', 'Failed') NOT NULL,
  paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create index for payment status queries
CREATE INDEX idx_payment_status ON Payments(payment_status);
