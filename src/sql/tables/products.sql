
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
