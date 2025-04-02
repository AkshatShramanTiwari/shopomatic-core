
-- Query 1: Seller Performance
SELECT 
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
  total_revenue DESC;

-- Query 2: Revenue by Day (Last 30 Days)
SELECT 
  DATE(o.created_at) AS order_date,
  COUNT(DISTINCT o.order_id) AS num_orders,
  SUM(o.total_price) AS daily_revenue
FROM 
  Orders o
WHERE 
  o.payment_status = 'Paid' AND
  o.created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY 
  DATE(o.created_at)
ORDER BY 
  order_date DESC;

-- Query 3: Customer Spending Analysis
SELECT 
  c.customer_id,
  u.name AS customer_name,
  COUNT(DISTINCT o.order_id) AS total_orders,
  SUM(o.total_price) AS total_spent,
  AVG(o.total_price) AS average_order_value,
  MIN(o.created_at) AS first_order_date,
  MAX(o.created_at) AS last_order_date,
  DATEDIFF(MAX(o.created_at), MIN(o.created_at)) / COUNT(DISTINCT o.order_id) AS avg_days_between_orders
FROM 
  Customers c
JOIN 
  Users u ON c.user_id = u.user_id
JOIN 
  Orders o ON c.customer_id = o.customer_id
WHERE 
  o.payment_status = 'Paid'
GROUP BY 
  c.customer_id, u.name
HAVING 
  COUNT(DISTINCT o.order_id) > 1
ORDER BY 
  total_spent DESC;
