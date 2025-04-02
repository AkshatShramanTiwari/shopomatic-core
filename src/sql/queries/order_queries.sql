
-- Query 1: Get Customer Purchase History
SELECT 
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
  o.created_at DESC;

-- Query 2: Sales by Category (Monthly)
SELECT 
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
  year DESC, month DESC, total_sales DESC;

-- Query 3: Get Pending Orders
SELECT 
  o.order_id,
  o.created_at,
  c.customer_id,
  u.name AS customer_name,
  o.total_price,
  o.payment_method,
  o.payment_status,
  o.order_status,
  COUNT(oi.order_item_id) AS total_items
FROM 
  Orders o
JOIN 
  Customers c ON o.customer_id = c.customer_id
JOIN 
  Users u ON c.user_id = u.user_id
JOIN 
  Order_Items oi ON o.order_id = oi.order_id
WHERE 
  o.order_status = 'Processing'
GROUP BY 
  o.order_id, o.created_at, c.customer_id, u.name, 
  o.total_price, o.payment_method, o.payment_status, o.order_status
ORDER BY 
  o.created_at ASC;
