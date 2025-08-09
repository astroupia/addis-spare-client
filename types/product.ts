export type CompatibilityEntry = {
  make: string;
  model: string;
  year: number;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  category: string;
  image_url?: string;
  price: number;
};


export interface SearchResult {
  product: Product
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
}

