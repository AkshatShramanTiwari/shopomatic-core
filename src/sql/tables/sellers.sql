
-- Sellers Table (1NF, 2NF, 3NF)
CREATE TABLE Sellers (
  seller_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  business_address TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);
