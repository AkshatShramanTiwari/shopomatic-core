
DELIMITER //

-- Trigger 1: Low Stock Alert
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

-- Trigger 3: Auto-Update Product Rating
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

DELIMITER ;
