
-- Query 1: Get Top-Selling Products
SELECT 
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
LIMIT 10;

-- Query 2: Products with Low Stock
SELECT 
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
  p.stock ASC;

-- Query 3: Search Products by Category and Price Range
SELECT 
  p.product_id,
  p.name,
  p.description,
  p.price,
  p.category,
  p.image_url,
  s.business_name AS seller_name
FROM 
  Products p
JOIN 
  Sellers s ON p.seller_id = s.seller_id
WHERE 
  p.category = ? AND
  p.price BETWEEN ? AND ? AND
  p.stock > 0
ORDER BY 
  p.price ASC;
