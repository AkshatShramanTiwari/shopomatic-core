
DELIMITER //

-- Procedure: Generate Sales Report
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

DELIMITER ;
