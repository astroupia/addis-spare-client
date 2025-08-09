export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  product_name: string
  product_price: number
  product_image: string
  product_sku: string
  product_category: string
  product_brand?: string
  product_rating?: {
    average: number
    count: number
  }
  added_at: string
  notes?: string
  priority: "low" | "medium" | "high"
  price_alert_enabled: boolean
  target_price?: number
  last_price_check: string
  price_history: Array<{
    price: number
    date: string
  }>
  availability_status: "in_stock" | "out_of_stock" | "limited_stock"
  stock_count?: number
}

export interface Wishlist {
  id: string
  user_id: string
  name: string
  description?: string
  is_public: boolean
  is_default: boolean
  items: WishlistItem[]
  created_at: string
  updated_at: string
  shared_with?: Array<{
    user_id: string
    user_name: string
    permission: "view" | "edit"
    shared_at: string
  }>
}

export interface WishlistSummary {
  total_items: number
  total_value: number
  categories: Array<{
    category: string
    count: number
    value: number
  }>
  price_alerts: number
  out_of_stock_items: number
  recent_additions: number
}

export interface AddToWishlistData {
  product_id: string
  wishlist_id?: string
  notes?: string
  priority?: "low" | "medium" | "high"
  price_alert_enabled?: boolean
  target_price?: number
}

export interface CreateWishlistData {
  name: string
  description?: string
  is_public?: boolean
}

export interface WishlistFilters {
  category?: string
  priority?: "low" | "medium" | "high"
  availability?: "in_stock" | "out_of_stock" | "limited_stock"
  price_range?: {
    min: number
    max: number
  }
  sort_by?: "added_date" | "price_low" | "price_high" | "name" | "priority"
  sort_order?: "asc" | "desc"
}

export interface PriceAlert {
  id: string
  user_id: string
  product_id: string
  product_name: string
  current_price: number
  target_price: number
  alert_type: "price_drop" | "back_in_stock" | "price_target"
  is_active: boolean
  created_at: string
  triggered_at?: string
}
