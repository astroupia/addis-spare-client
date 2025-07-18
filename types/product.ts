export interface Product {
  id: string
  name: string
  description?: string
  price: number
  category: string
  image_url: string
  stock_count: number
  sku: string
  brand?: string
  specifications?: Record<string, string>
  rating?: {
    average: number
    count: number
  }
  created_at: string
  updated_at: string
}
