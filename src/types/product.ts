
export interface ProductType {
  product_id: number;
  seller_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  created_at: string;
  average_rating?: number;
}
