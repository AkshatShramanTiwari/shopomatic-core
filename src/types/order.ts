
export interface OrderType {
  order_id: number;
  customer_id: number;
  total_price: number;
  payment_method: 'Online' | 'Cash on Delivery';
  payment_status: 'Pending' | 'Paid';
  order_status: 'Processing' | 'Shipped' | 'Delivered';
  created_at: string;
}

export interface OrderItemType {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
}

export interface PaymentType {
  payment_id: number;
  order_id: number;
  transaction_id: string;
  payment_status: 'Success' | 'Failed';
  paid_at: string;
}
