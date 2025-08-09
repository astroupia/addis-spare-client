import type { User, OrderHistory, SavedItem, AuthSession } from "@/types/auth"

// Mock Users Data
export const mock_users: User[] = [
  {
    id: "user_001",
    email: "john.doe@example.com",
    password_hash: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDxy", // password: "password123"
    first_name: "John",
    last_name: "Doe",
    phone: "+1-555-0123",
    avatar_url: "/placeholder.svg?height=100&width=100",
    email_verified: true,
    phone_verified: true,
    two_factor_enabled: false,
    role: "customer",
    status: "active",
    last_login: "2024-01-15T10:30:00Z",
    created_at: "2023-06-15T08:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    preferences: {
      language: "en",
      currency: "USD",
      notifications: {
        email: true,
        sms: true,
        push: true,
      },
      theme: "light",
    },
  },
  {
    id: "user_002",
    email: "jane.smith@example.com",
    password_hash: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDxy", // password: "password123"
    first_name: "Jane",
    last_name: "Smith",
    phone: "+1-555-0456",
    avatar_url: "/placeholder.svg?height=100&width=100",
    email_verified: true,
    phone_verified: false,
    two_factor_enabled: false,
    role: "customer",
    status: "active",
    last_login: "2024-01-14T15:45:00Z",
    created_at: "2023-08-20T12:15:00Z",
    updated_at: "2024-01-14T15:45:00Z",
    preferences: {
      language: "en",
      currency: "USD",
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      theme: "dark",
    },
  },
  {
    id: "user_003",
    email: "admin@addisparts.com",
    password_hash: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDxy", // password: "password123"
    first_name: "Admin",
    last_name: "User",
    email_verified: true,
    phone_verified: true,
    two_factor_enabled: false,
    role: "admin",
    status: "active",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-15T09:00:00Z",
    preferences: {
      language: "en",
      currency: "USD",
      notifications: {
        email: true,
        sms: true,
        push: true,
      },
      theme: "system",
    },
  },
]

// Mock Order History Data
export const mock_order_history: OrderHistory[] = [
  {
    id: "order_001",
    order_number: "ORD-2024-001",
    status: "delivered",
    total_amount: 156.47,
    currency: "USD",
    items_count: 3,
    order_date: "2024-01-10T14:30:00Z",
    estimated_delivery: "2024-01-15T18:00:00Z",
    tracking_number: "1Z999AA1234567890",
    items: [
      {
        product_id: "1",
        product_name: "Brake Pad Set - Premium",
        quantity: 1,
        price: 49.99,
        image_url: "/placeholder.svg?height=100&width=100",
      },
      {
        product_id: "2",
        product_name: "Oil Filter - Standard",
        quantity: 2,
        price: 12.99,
        image_url: "/placeholder.svg?height=100&width=100",
      },
      {
        product_id: "3",
        product_name: "Spark Plug Set - Iridium",
        quantity: 1,
        price: 32.5,
        image_url: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "order_002",
    order_number: "ORD-2024-002",
    status: "shipped",
    total_amount: 89.95,
    currency: "USD",
    items_count: 2,
    order_date: "2024-01-12T09:15:00Z",
    estimated_delivery: "2024-01-18T17:00:00Z",
    tracking_number: "1Z999AA1234567891",
    items: [
      {
        product_id: "4",
        product_name: "Brake Rotor - Front",
        quantity: 1,
        price: 78.95,
        image_url: "/placeholder.svg?height=100&width=100",
      },
      {
        product_id: "5",
        product_name: "Air Filter - Performance",
        quantity: 1,
        price: 29.99,
        image_url: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "order_003",
    order_number: "ORD-2024-003",
    status: "processing",
    total_amount: 245.75,
    currency: "USD",
    items_count: 4,
    order_date: "2024-01-14T16:45:00Z",
    items: [
      {
        product_id: "6",
        product_name: "Brake Fluid - DOT 4",
        quantity: 2,
        price: 15.75,
        image_url: "/placeholder.svg?height=100&width=100",
      },
      {
        product_id: "7",
        product_name: "Timing Belt Kit",
        quantity: 1,
        price: 129.99,
        image_url: "/placeholder.svg?height=100&width=100",
      },
      {
        product_id: "8",
        product_name: "Shock Absorber - Rear",
        quantity: 2,
        price: 89.5,
        image_url: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]

// Mock Saved Items Data
export const mock_saved_items: SavedItem[] = [
  {
    id: "saved_001",
    user_id: "user_001",
    product_id: "9",
    product_name: "Brake Caliper - Remanufactured",
    product_price: 67.25,
    product_image: "/placeholder.svg?height=100&width=100",
    saved_at: "2024-01-08T12:30:00Z",
    notes: "For front left wheel replacement",
  },
  {
    id: "saved_002",
    user_id: "user_001",
    product_id: "10",
    product_name: "Alternator - 120A",
    product_price: 175.0,
    product_image: "/placeholder.svg?height=100&width=100",
    saved_at: "2024-01-12T15:20:00Z",
    notes: "Check compatibility before ordering",
  },
  {
    id: "saved_003",
    user_id: "user_001",
    product_id: "11",
    product_name: "Radiator - Aluminum",
    product_price: 145.99,
    product_image: "/placeholder.svg?height=100&width=100",
    saved_at: "2024-01-13T10:45:00Z",
  },
]

// Mock Active Sessions Data
export const mock_active_sessions: AuthSession[] = [
  {
    user_id: "user_001",
    session_token: "sess_abc123def456ghi789",
    expires_at: "2024-02-15T10:30:00Z",
    created_at: "2024-01-15T10:30:00Z",
    device_info: {
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ip_address: "192.168.1.100",
      device_type: "desktop",
    },
  },
  {
    user_id: "user_001",
    session_token: "sess_xyz789abc123def456",
    expires_at: "2024-02-14T08:15:00Z",
    created_at: "2024-01-14T08:15:00Z",
    device_info: {
      user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      ip_address: "192.168.1.101",
      device_type: "mobile",
    },
  },
]

// Helper functions to get mock data
export function getUserByEmail(email: string): User | undefined {
  return mock_users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

export function getUserById(id: string): User | undefined {
  return mock_users.find((user) => user.id === id)
}

export function getOrderHistoryByUserId(user_id: string): OrderHistory[] {
  // In a real app, this would filter by user_id
  // For demo purposes, returning all orders for user_001
  if (user_id === "user_001") {
    return mock_order_history
  }
  return []
}

export function getSavedItemsByUserId(user_id: string): SavedItem[] {
  return mock_saved_items.filter((item) => item.user_id === user_id)
}

export function getActiveSessionsByUserId(user_id: string): AuthSession[] {
  return mock_active_sessions.filter((session) => session.user_id === user_id)
}

// Simulate password verification (in real app, use bcrypt)
export function verifyPassword(plain_password: string, hashed_password: string): boolean {
  // For demo purposes, all mock users have password "password123"
  return plain_password === "password123"
}
