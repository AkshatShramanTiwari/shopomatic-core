
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
