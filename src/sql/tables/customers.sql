
-- Customers Table (1NF, 2NF, 3NF)
CREATE TABLE Customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);
