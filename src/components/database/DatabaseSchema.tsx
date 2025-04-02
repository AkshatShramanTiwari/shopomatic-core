
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export function DatabaseSchema() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Database Schema</h2>
        <p className="text-gray-600">
          Our e-commerce platform is built on a robust SQL database with properly normalized tables.
          Below is the schema design showcasing our relational database structure.
        </p>
      </div>
      
      <Tabs defaultValue="schema">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schema">Schema Design</TabsTrigger>
          <TabsTrigger value="queries">SQL Queries</TabsTrigger>
          <TabsTrigger value="procedures">Stored Procedures</TabsTrigger>
          <TabsTrigger value="triggers">Triggers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schema" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Users Table (1NF, 2NF, 3NF)</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('seller', 'customer') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Normalization:</strong> In 3NF as all attributes depend only on the primary key (user_id).
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Sellers Table (1NF, 2NF, 3NF)</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`CREATE TABLE Sellers (
  seller_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  business_address TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);`}
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Referential Integrity:</strong> Foreign key relationship with Users table, with ON DELETE CASCADE ensuring when a user is deleted, the seller record is also deleted.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Customers Table (1NF, 2NF, 3NF)</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`CREATE TABLE Customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Products Table (1NF, 2NF, 3NF)</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`CREATE TABLE Products (
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

CREATE INDEX idx_product_category ON Products(category);
CREATE INDEX idx_product_price ON Products(price);`}
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Indexing:</strong> Indexes on category and price fields to optimize query performance for product searches and filtering.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Orders Table (1NF, 2NF, 3NF)</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`CREATE TABLE Orders (
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

CREATE INDEX idx_order_customer ON Orders(customer_id);
CREATE INDEX idx_order_status ON Orders(order_status);`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Order_Items Table (1NF, 2NF, 3NF, BCNF)</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`CREATE TABLE Order_Items (
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

CREATE INDEX idx_order_items_order ON Order_Items(order_id);
CREATE INDEX idx_order_items_product ON Order_Items(product_id);`}
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                <strong>BCNF Compliance:</strong> This junction table resolves the many-to-many relationship between Orders and Products. It's in BCNF as all determinants are candidate keys.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Payments Table (1NF, 2NF, 3NF)</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`CREATE TABLE Payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL UNIQUE,
  transaction_id VARCHAR(100) UNIQUE NOT NULL,
  payment_status ENUM('Success', 'Failed') NOT NULL,
  paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id) 
  ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_payment_status ON Payments(payment_status);`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Query 1: Top-Selling Products</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`SELECT 
  p.product_id, 
  p.name, 
  p.category,
  SUM(oi.quantity) AS total_quantity_sold,
  COUNT(DISTINCT o.order_id) AS number_of_orders,
  SUM(oi.price_at_purchase * oi.quantity) AS total_revenue
FROM 
  Products p
JOIN 
  Order_Items oi ON p.product_id = oi.product_id
JOIN 
  Orders o ON oi.order_id = o.order_id
WHERE 
  o.payment_status = 'Paid'
GROUP BY 
  p.product_id, p.name, p.category
ORDER BY 
  total_quantity_sold DESC
LIMIT 10;`}
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                This query uses aggregation and joins to find the most popular products based on sales quantity.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Query 2: Seller Performance</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`SELECT 
  s.seller_id,
  u.name AS seller_name,
  s.business_name,
  COUNT(DISTINCT p.product_id) AS total_products,
  SUM(oi.quantity) AS total_units_sold,
  SUM(oi.price_at_purchase * oi.quantity) AS total_revenue
FROM 
  Sellers s
JOIN 
  Users u ON s.user_id = u.user_id
JOIN 
  Products p ON s.seller_id = p.seller_id
LEFT JOIN 
  Order_Items oi ON p.product_id = oi.product_id
LEFT JOIN 
  Orders o ON oi.order_id = o.order_id AND o.payment_status = 'Paid'
GROUP BY 
  s.seller_id, u.name, s.business_name
ORDER BY 
  total_revenue DESC;`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Query 3: Customer Purchase History</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`SELECT 
  o.order_id,
  o.created_at AS order_date,
  o.total_price,
  o.order_status,
  o.payment_status,
  p.product_id,
  p.name AS product_name,
  oi.quantity,
  oi.price_at_purchase
FROM 
  Orders o
JOIN 
  Order_Items oi ON o.order_id = oi.order_id
JOIN 
  Products p ON oi.product_id = p.product_id
WHERE 
  o.customer_id = ? -- Parameter for specific customer
ORDER BY 
  o.created_at DESC;`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Query 4: Products with Low Stock</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`SELECT 
  p.product_id,
  p.name,
  p.stock,
  s.business_name AS seller,
  u.email AS seller_email
FROM 
  Products p
JOIN 
  Sellers s ON p.seller_id = s.seller_id
JOIN 
  Users u ON s.user_id = u.user_id
WHERE 
  p.stock < 10 AND p.stock > 0
ORDER BY 
  p.stock ASC;`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Query 5: Sales by Category (Monthly)</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`SELECT 
  p.category,
  YEAR(o.created_at) AS year,
  MONTH(o.created_at) AS month,
  COUNT(DISTINCT o.order_id) AS order_count,
  SUM(oi.quantity) AS total_units,
  SUM(oi.price_at_purchase * oi.quantity) AS total_sales
FROM 
  Products p
JOIN 
  Order_Items oi ON p.product_id = oi.product_id
JOIN 
  Orders o ON oi.order_id = o.order_id
WHERE 
  o.payment_status = 'Paid'
GROUP BY 
  p.category, YEAR(o.created_at), MONTH(o.created_at)
ORDER BY 
  year DESC, month DESC, total_sales DESC;`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="procedures" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Stored Procedure 1: Process Order</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`DELIMITER //

CREATE PROCEDURE ProcessOrder(
  IN p_customer_id INT,
  IN p_payment_method VARCHAR(255),
  OUT p_order_id INT,
  OUT p_status VARCHAR(50)
)
BEGIN
  DECLARE v_total_price DECIMAL(10,2) DEFAULT 0;
  DECLARE v_product_id INT;
  DECLARE v_quantity INT;
  DECLARE v_price DECIMAL(10,2);
  DECLARE v_stock INT;
  DECLARE v_done INT DEFAULT FALSE;
  DECLARE v_transaction_id VARCHAR(100);
  
  -- Cursor to iterate through cart items
  DECLARE cart_cursor CURSOR FOR 
    SELECT product_id, quantity FROM Cart WHERE customer_id = p_customer_id;
  
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = TRUE;
  
  -- Start transaction
  START TRANSACTION;
  
  -- Calculate total price
  SELECT SUM(p.price * c.quantity) INTO v_total_price
  FROM Cart c
  JOIN Products p ON c.product_id = p.product_id
  WHERE c.customer_id = p_customer_id;
  
  -- Create order
  INSERT INTO Orders (customer_id, total_price, payment_method)
  VALUES (p_customer_id, v_total_price, p_payment_method);
  
  SET p_order_id = LAST_INSERT_ID();
  
  -- Open cursor and iterate through cart items
  OPEN cart_cursor;
  
  read_loop: LOOP
    FETCH cart_cursor INTO v_product_id, v_quantity;
    
    IF v_done THEN
      LEAVE read_loop;
    END IF;
    
    -- Check stock
    SELECT stock, price INTO v_stock, v_price 
    FROM Products 
    WHERE product_id = v_product_id;
    
    IF v_stock < v_quantity THEN
      SET p_status = CONCAT('Insufficient stock for product ID: ', v_product_id);
      ROLLBACK;
      CLOSE cart_cursor;
      LEAVE read_loop;
    END IF;
    
    -- Add to order items
    INSERT INTO Order_Items (order_id, product_id, quantity, price_at_purchase)
    VALUES (p_order_id, v_product_id, v_quantity, v_price);
    
    -- Update stock
    UPDATE Products 
    SET stock = stock - v_quantity 
    WHERE product_id = v_product_id;
  
  END LOOP;
  
  CLOSE cart_cursor;
  
  -- Generate payment record
  SET v_transaction_id = CONCAT('TXN', p_order_id, UNIX_TIMESTAMP());
  
  INSERT INTO Payments (order_id, transaction_id, payment_status)
  VALUES (p_order_id, v_transaction_id, 
          CASE WHEN p_payment_method = 'Cash on Delivery' THEN 'Pending' ELSE 'Success' END);
  
  -- Update order payment status if online payment
  IF p_payment_method != 'Cash on Delivery' THEN
    UPDATE Orders SET payment_status = 'Paid' WHERE order_id = p_order_id;
  END IF;
  
  -- Clear cart
  DELETE FROM Cart WHERE customer_id = p_customer_id;
  
  COMMIT;
  
  SET p_status = 'Success';
  
END //

DELIMITER ;`}
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                <strong>ACID Compliance:</strong> This procedure demonstrates atomicity, consistency, isolation, and durability through the use of transactions. It ensures all order operations succeed or fail as a unit.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Stored Procedure 2: Update Order Status</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`DELIMITER //

CREATE PROCEDURE UpdateOrderStatus(
  IN p_order_id INT,
  IN p_new_status VARCHAR(50),
  OUT p_result VARCHAR(100)
)
BEGIN
  DECLARE v_current_status VARCHAR(50);
  
  -- Check if order exists
  SELECT order_status INTO v_current_status 
  FROM Orders 
  WHERE order_id = p_order_id;
  
  IF v_current_status IS NULL THEN
    SET p_result = 'Error: Order not found';
  ELSE
    -- Validate status transition
    IF (v_current_status = 'Processing' AND p_new_status = 'Shipped') OR
       (v_current_status = 'Shipped' AND p_new_status = 'Delivered') THEN
      
      UPDATE Orders 
      SET order_status = p_new_status,
          updated_at = CURRENT_TIMESTAMP
      WHERE order_id = p_order_id;
      
      -- If delivered, notify customer (would be implemented as a trigger)
      IF p_new_status = 'Delivered' THEN
        -- Example: Insert notification record
        INSERT INTO Notifications (user_id, message, type)
        SELECT c.user_id, CONCAT('Your order #', p_order_id, ' has been delivered'), 'order_delivered'
        FROM Orders o
        JOIN Customers c ON o.customer_id = c.customer_id
        WHERE o.order_id = p_order_id;
      END IF;
      
      SET p_result = CONCAT('Order ', p_order_id, ' status updated to ', p_new_status);
    ELSE
      SET p_result = CONCAT('Error: Invalid status transition from ', v_current_status, ' to ', p_new_status);
    END IF;
  END IF;
END //

DELIMITER ;`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Stored Procedure 3: Generate Sales Report</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`DELIMITER //

CREATE PROCEDURE GenerateSalesReport(
  IN p_seller_id INT,
  IN p_start_date DATE,
  IN p_end_date DATE
)
BEGIN
  -- Daily sales summary
  SELECT 
    DATE(o.created_at) AS sale_date,
    COUNT(DISTINCT o.order_id) AS order_count,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.price_at_purchase * oi.quantity) AS daily_revenue
  FROM 
    Orders o
  JOIN 
    Order_Items oi ON o.order_id = oi.order_id
  JOIN 
    Products p ON oi.product_id = p.product_id
  WHERE 
    p.seller_id = p_seller_id AND
    o.payment_status = 'Paid' AND
    o.created_at BETWEEN p_start_date AND p_end_date
  GROUP BY 
    DATE(o.created_at)
  ORDER BY 
    sale_date;
    
  -- Product performance
  SELECT 
    p.product_id,
    p.name,
    p.category,
    SUM(oi.quantity) AS quantity_sold,
    SUM(oi.price_at_purchase * oi.quantity) AS total_revenue,
    AVG(oi.price_at_purchase) AS average_price
  FROM 
    Products p
  JOIN 
    Order_Items oi ON p.product_id = oi.product_id
  JOIN 
    Orders o ON oi.order_id = o.order_id
  WHERE 
    p.seller_id = p_seller_id AND
    o.payment_status = 'Paid' AND
    o.created_at BETWEEN p_start_date AND p_end_date
  GROUP BY 
    p.product_id, p.name, p.category
  ORDER BY 
    quantity_sold DESC;
    
  -- Category breakdown
  SELECT 
    p.category,
    COUNT(DISTINCT p.product_id) AS product_count,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.price_at_purchase * oi.quantity) AS category_revenue,
    (SUM(oi.price_at_purchase * oi.quantity) / 
      (SELECT SUM(oi2.price_at_purchase * oi2.quantity) 
       FROM Order_Items oi2 
       JOIN Orders o2 ON oi2.order_id = o2.order_id 
       JOIN Products p2 ON oi2.product_id = p2.product_id 
       WHERE p2.seller_id = p_seller_id AND 
             o2.payment_status = 'Paid' AND 
             o2.created_at BETWEEN p_start_date AND p_end_date
      )) * 100 AS revenue_percentage
  FROM 
    Products p
  JOIN 
    Order_Items oi ON p.product_id = oi.product_id
  JOIN 
    Orders o ON oi.order_id = o.order_id
  WHERE 
    p.seller_id = p_seller_id AND
    o.payment_status = 'Paid' AND
    o.created_at BETWEEN p_start_date AND p_end_date
  GROUP BY 
    p.category
  ORDER BY 
    category_revenue DESC;
END //

DELIMITER ;`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="triggers" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Trigger 1: Low Stock Alert</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`DELIMITER //

CREATE TRIGGER StockLowAlert
AFTER UPDATE ON Products
FOR EACH ROW
BEGIN
  -- If stock was reduced and is now below threshold
  IF NEW.stock < 10 AND NEW.stock < OLD.stock THEN
    -- Insert a notification for the seller
    INSERT INTO Notifications (user_id, message, type, entity_id)
    SELECT s.user_id, 
           CONCAT('Low stock alert: "', NEW.name, '" has only ', NEW.stock, ' units left.'),
           'low_stock',
           NEW.product_id
    FROM Sellers s
    WHERE s.seller_id = NEW.seller_id;
    
    -- Log the event
    INSERT INTO ActivityLog (entity_type, entity_id, action, details)
    VALUES ('product', NEW.product_id, 'low_stock_alert', 
            CONCAT('{"product_id":', NEW.product_id, 
                  ',"product_name":"', NEW.name, 
                  '","current_stock":', NEW.stock, 
                  ',"seller_id":', NEW.seller_id, '}'));
  END IF;
END //

DELIMITER ;`}
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                This trigger monitors product stock levels and automatically creates notifications when stock levels fall below a threshold, improving inventory management.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Trigger 2: Payment Status Update</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`DELIMITER //

CREATE TRIGGER PaymentStatusUpdate
AFTER UPDATE ON Payments
FOR EACH ROW
BEGIN
  -- If payment status changed to Success
  IF NEW.payment_status = 'Success' AND OLD.payment_status != 'Success' THEN
    -- Update the order payment status
    UPDATE Orders
    SET payment_status = 'Paid',
        updated_at = CURRENT_TIMESTAMP
    WHERE order_id = NEW.order_id;
    
    -- Notify customer
    INSERT INTO Notifications (user_id, message, type, entity_id)
    SELECT c.user_id, 
           CONCAT('Payment confirmed for order #', NEW.order_id, '. Thank you for your purchase!'),
           'payment_confirmed',
           NEW.order_id
    FROM Orders o
    JOIN Customers c ON o.customer_id = c.customer_id
    WHERE o.order_id = NEW.order_id;
    
    -- Log the transaction
    INSERT INTO ActivityLog (entity_type, entity_id, action, details)
    VALUES ('payment', NEW.payment_id, 'payment_confirmed', 
            CONCAT('{"payment_id":', NEW.payment_id, 
                   ',"order_id":', NEW.order_id, 
                   ',"transaction_id":"', NEW.transaction_id, '"}'));
  END IF;
END //

DELIMITER ;`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Trigger 3: Auto-Update Product Rating</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`DELIMITER //

CREATE TRIGGER UpdateProductRating
AFTER INSERT ON ProductReviews
FOR EACH ROW
BEGIN
  DECLARE v_avg_rating DECIMAL(3,2);
  
  -- Calculate new average rating
  SELECT AVG(rating) INTO v_avg_rating
  FROM ProductReviews
  WHERE product_id = NEW.product_id;
  
  -- Update product record
  UPDATE Products
  SET 
    average_rating = v_avg_rating,
    updated_at = CURRENT_TIMESTAMP
  WHERE product_id = NEW.product_id;
  
  -- If rating is 1 or 2 (low), notify seller
  IF NEW.rating <= 2 THEN
    INSERT INTO Notifications (user_id, message, type, entity_id)
    SELECT s.user_id, 
           CONCAT('Low rating alert: Your product "', p.name, '" received a ', NEW.rating, '-star review.'),
           'low_rating',
           NEW.product_id
    FROM Products p
    JOIN Sellers s ON p.seller_id = s.seller_id
    WHERE p.product_id = NEW.product_id;
  END IF;
END //

DELIMITER ;`}
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Trigger 4: Order Audit Trail</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {`DELIMITER //

CREATE TRIGGER OrderAuditTrail
AFTER UPDATE ON Orders
FOR EACH ROW
BEGIN
  -- Record any changes to order status
  IF NEW.order_status != OLD.order_status THEN
    INSERT INTO AuditLog (entity_type, entity_id, action, user_id, old_value, new_value)
    VALUES ('order', NEW.order_id, 'status_change', 
            @current_user_id, -- Assuming this variable is set by application
            OLD.order_status, 
            NEW.order_status);
            
    -- Notify customer about status change
    INSERT INTO Notifications (user_id, message, type, entity_id)
    SELECT c.user_id, 
           CONCAT('Your order #', NEW.order_id, ' status has been updated to: ', NEW.order_status),
           'order_status_update',
           NEW.order_id
    FROM Customers c
    WHERE c.customer_id = NEW.customer_id;
  END IF;
  
  -- Record payment status changes
  IF NEW.payment_status != OLD.payment_status THEN
    INSERT INTO AuditLog (entity_type, entity_id, action, user_id, old_value, new_value)
    VALUES ('order', NEW.order_id, 'payment_status_change', 
            @current_user_id,
            OLD.payment_status, 
            NEW.payment_status);
  END IF;
END //

DELIMITER ;`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DatabaseSchema;
