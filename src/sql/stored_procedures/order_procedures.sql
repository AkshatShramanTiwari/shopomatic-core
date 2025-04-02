
DELIMITER //

-- Procedure 1: Process Order
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

-- Procedure 2: Update Order Status
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

DELIMITER ;
