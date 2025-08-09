// type/product.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: "ETB" | "USD";
  brand: string;
  model_number: string;
  compatible_vehicles: string[];
  stock_quantity: number;
  category: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  seller_id: string;
  is_available: boolean;
}

export type CompatibilityEntry = {
  make: string;
  model: string;
  year: number;
};


export interface SearchResult {
  product: Product
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
}

