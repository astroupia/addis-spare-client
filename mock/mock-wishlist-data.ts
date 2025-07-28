import type { Wishlist, WishlistItem, WishlistSummary, PriceAlert } from "@/types/wishlist"

// Mock Wishlist Items Data
export const mock_wishlist_items: WishlistItem[] = [
  {
    id: "wishlist_item_001",
    user_id: "user_001",
    product_id: "1",
    product_name: "Brake Pad Set - Premium",
    product_price: 49.99,
    product_image: "/placeholder.svg?height=200&width=200",
    product_sku: "BP-PREM-001",
    product_category: "Brake System",
    product_brand: "AutoParts Pro",
    product_rating: { average: 4.5, count: 128 },
    added_at: "2024-01-10T14:30:00Z",
    notes: "Need for front brake replacement",
    priority: "high",
    price_alert_enabled: true,
    target_price: 45.0,
    last_price_check: "2024-01-15T10:00:00Z",
    price_history: [
      { price: 52.99, date: "2024-01-01T00:00:00Z" },
      { price: 49.99, date: "2024-01-10T00:00:00Z" },
      { price: 47.99, date: "2024-01-12T00:00:00Z" },
      { price: 49.99, date: "2024-01-15T00:00:00Z" },
    ],
    availability_status: "in_stock",
    stock_count: 15,
  },
  {
    id: "wishlist_item_002",
    user_id: "user_001",
    product_id: "3",
    product_name: "Spark Plug Set - Iridium",
    product_price: 32.5,
    product_image: "/placeholder.svg?height=200&width=200",
    product_sku: "SP-IRID-003",
    product_category: "Engine",
    product_brand: "SparkMax",
    product_rating: { average: 4.8, count: 89 },
    added_at: "2024-01-08T09:15:00Z",
    notes: "For next tune-up",
    priority: "medium",
    price_alert_enabled: false,
    last_price_check: "2024-01-15T10:00:00Z",
    price_history: [
      { price: 35.0, date: "2024-01-01T00:00:00Z" },
      { price: 32.5, date: "2024-01-08T00:00:00Z" },
    ],
    availability_status: "in_stock",
    stock_count: 8,
  },
  {
    id: "wishlist_item_003",
    user_id: "user_001",
    product_id: "7",
    product_name: "Timing Belt Kit",
    product_price: 129.99,
    product_image: "/placeholder.svg?height=200&width=200",
    product_sku: "TB-KIT-007",
    product_category: "Engine",
    product_brand: "TimingPro",
    product_rating: { average: 4.3, count: 67 },
    added_at: "2024-01-05T16:45:00Z",
    priority: "low",
    price_alert_enabled: true,
    target_price: 120.0,
    last_price_check: "2024-01-15T10:00:00Z",
    price_history: [
      { price: 139.99, date: "2024-01-01T00:00:00Z" },
      { price: 129.99, date: "2024-01-05T00:00:00Z" },
    ],
    availability_status: "limited_stock",
    stock_count: 3,
  },
  {
    id: "wishlist_item_004",
    user_id: "user_001",
    product_id: "12",
    product_name: "LED Headlight Bulbs",
    product_price: 89.95,
    product_image: "/placeholder.svg?height=200&width=200",
    product_sku: "LED-HEAD-012",
    product_category: "Lighting",
    product_brand: "BrightLite",
    added_at: "2024-01-12T11:20:00Z",
    notes: "Upgrade from halogen",
    priority: "medium",
    price_alert_enabled: true,
    target_price: 80.0,
    last_price_check: "2024-01-15T10:00:00Z",
    price_history: [
      { price: 94.95, date: "2024-01-01T00:00:00Z" },
      { price: 89.95, date: "2024-01-12T00:00:00Z" },
    ],
    availability_status: "out_of_stock",
    stock_count: 0,
  },
  {
    id: "wishlist_item_005",
    user_id: "user_001",
    product_id: "15",
    product_name: "Car Floor Mats - All Weather",
    product_price: 45.99,
    product_image: "/placeholder.svg?height=200&width=200",
    product_sku: "FM-AW-015",
    product_category: "Interior",
    product_brand: "WeatherGuard",
    product_rating: { average: 4.6, count: 234 },
    added_at: "2024-01-14T13:10:00Z",
    priority: "low",
    price_alert_enabled: false,
    last_price_check: "2024-01-15T10:00:00Z",
    price_history: [
      { price: 49.99, date: "2024-01-01T00:00:00Z" },
      { price: 45.99, date: "2024-01-14T00:00:00Z" },
    ],
    availability_status: "in_stock",
    stock_count: 25,
  },
]

// Mock Wishlists Data
export const mock_wishlists: Wishlist[] = [
  {
    id: "wishlist_001",
    user_id: "user_001",
    name: "My Wishlist",
    description: "Items I want to buy for my car",
    is_public: false,
    is_default: true,
    items: mock_wishlist_items,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-14T13:10:00Z",
  },
  {
    id: "wishlist_002",
    user_id: "user_001",
    name: "Brake System Upgrade",
    description: "Complete brake system overhaul parts",
    is_public: true,
    is_default: false,
    items: [mock_wishlist_items[0]], // Just brake pads for this example
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-10T14:30:00Z",
    shared_with: [
      {
        user_id: "user_002",
        user_name: "Jane Smith",
        permission: "view",
        shared_at: "2024-01-11T10:00:00Z",
      },
    ],
  },
]

// Mock Price Alerts Data
export const mock_price_alerts: PriceAlert[] = [
  {
    id: "alert_001",
    user_id: "user_001",
    product_id: "1",
    product_name: "Brake Pad Set - Premium",
    current_price: 49.99,
    target_price: 45.0,
    alert_type: "price_target",
    is_active: true,
    created_at: "2024-01-10T14:30:00Z",
  },
  {
    id: "alert_002",
    user_id: "user_001",
    product_id: "12",
    product_name: "LED Headlight Bulbs",
    current_price: 89.95,
    target_price: 80.0,
    alert_type: "back_in_stock",
    is_active: true,
    created_at: "2024-01-12T11:20:00Z",
  },
]

// Helper functions
export function getWishlistsByUserId(user_id: string): Wishlist[] {
  return mock_wishlists.filter((wishlist) => wishlist.user_id === user_id)
}

export function getWishlistById(wishlist_id: string): Wishlist | undefined {
  return mock_wishlists.find((wishlist) => wishlist.id === wishlist_id)
}

export function getWishlistItemsByUserId(user_id: string): WishlistItem[] {
  return mock_wishlist_items.filter((item) => item.user_id === user_id)
}

export function getWishlistSummary(user_id: string): WishlistSummary {
  const items = getWishlistItemsByUserId(user_id)

  const total_value = items.reduce((sum, item) => sum + item.product_price, 0)
  const categories = items.reduce(
    (acc, item) => {
      const existing = acc.find((cat) => cat.category === item.product_category)
      if (existing) {
        existing.count += 1
        existing.value += item.product_price
      } else {
        acc.push({
          category: item.product_category,
          count: 1,
          value: item.product_price,
        })
      }
      return acc
    },
    [] as Array<{ category: string; count: number; value: number }>,
  )

  const price_alerts = items.filter((item) => item.price_alert_enabled).length
  const out_of_stock_items = items.filter((item) => item.availability_status === "out_of_stock").length

  const one_week_ago = new Date()
  one_week_ago.setDate(one_week_ago.getDate() - 7)
  const recent_additions = items.filter((item) => new Date(item.added_at) > one_week_ago).length

  return {
    total_items: items.length,
    total_value,
    categories,
    price_alerts,
    out_of_stock_items,
    recent_additions,
  }
}

export function getPriceAlertsByUserId(user_id: string): PriceAlert[] {
  return mock_price_alerts.filter((alert) => alert.user_id === user_id)
}

export function isProductInWishlist(user_id: string, product_id: string): boolean {
  return mock_wishlist_items.some((item) => item.user_id === user_id && item.product_id === product_id)
}

export function addToWishlist(user_id: string, product_data: any, wishlist_id?: string): WishlistItem {
  const new_item: WishlistItem = {
    id: `wishlist_item_${Date.now()}`,
    user_id,
    product_id: product_data.id,
    product_name: product_data.name,
    product_price: product_data.price,
    product_image: product_data.image_url,
    product_sku: product_data.sku,
    product_category: product_data.category,
    product_brand: product_data.brand,
    product_rating: product_data.rating,
    added_at: new Date().toISOString(),
    priority: "medium",
    price_alert_enabled: false,
    last_price_check: new Date().toISOString(),
    price_history: [
      {
        price: product_data.price,
        date: new Date().toISOString(),
      },
    ],
    availability_status: product_data.stock_count > 0 ? "in_stock" : "out_of_stock",
    stock_count: product_data.stock_count,
  }

  mock_wishlist_items.push(new_item)
  return new_item
}

export function removeFromWishlist(user_id: string, product_id: string): boolean {
  const index = mock_wishlist_items.findIndex((item) => item.user_id === user_id && item.product_id === product_id)

  if (index > -1) {
    mock_wishlist_items.splice(index, 1)
    return true
  }

  return false
}

export function createWishlist(
  user_id: string,
  data: { name: string; description?: string; is_public?: boolean },
): Wishlist {
  const new_wishlist: Wishlist = {
    id: `wishlist_${Date.now()}`,
    user_id,
    name: data.name,
    description: data.description,
    is_public: data.is_public || false,
    is_default: false,
    items: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mock_wishlists.push(new_wishlist)
  return new_wishlist
}
