
export interface UserType {
  user_id: number;
  name: string;
  email: string;
  role: 'seller' | 'customer';
  created_at: string;
}

export interface CustomerType {
  customer_id: number;
  user_id: number;
  address: string;
  phone_number: string;
  user?: UserType;
}

export interface SellerType {
  seller_id: number;
  user_id: number;
  business_name: string;
  business_address: string;
  user?: UserType;
}
