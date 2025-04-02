
DELIMITER //

-- Trigger 1: Payment Status Update
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

-- Trigger 2: Order Audit Trail
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

DELIMITER ;
