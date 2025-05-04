
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
