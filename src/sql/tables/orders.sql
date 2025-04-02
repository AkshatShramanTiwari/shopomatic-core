
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
