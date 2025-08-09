import type { User } from "@/types/auth"
import type { ReactNode } from "react"


/**
 * Find a user by email from the mock_admin_users array.
 */
export function getUserByEmail(email: string) {
  return mock_admin_users.find((user) => user.email === email)
}

/**
 * Simulate password verification.
 * In a real app, use a secure hash comparison.
 */
export function verifyPassword(inputPassword: string, storedHash: string) {
  // For demo/mock: treat the hash as the plain password
  return inputPassword === storedHash
}

// Admin Analytics Data
export interface AdminAnalytics {
  overview: {
    total_users: number
    total_orders: number
    total_revenue: number
    total_products: number
    growth_metrics: {
      users_growth: number
      orders_growth: number
      revenue_growth: number
      products_growth: number
    }
  }
  recent_activity: Array<{
    id: string
    type: "user_registration" | "order_placed" | "product_added" | "user_login"
    description: string
    timestamp: string
    user_id?: string
    user_name?: string
  }>
  top_products: Array<{
    id: string
    name: string
    sales_count: number
    revenue: number
    image_url: string
  }>
  user_activity: Array<{
    date: string
    new_users: number
    active_users: number
    orders: number
  }>
}

// Admin User Management Data
export interface AdminUser extends User {
  id: string
  frist_name: string
  last_name: string
  contact: {
    phone: string
    address: string
    city: string
    country: string
  }
  phone: string
  last_login: string
  total_orders: number
  avatar_url: string
  total_spent: number
  last_order_date?: string
  account_flags: Array<{
    type: "warning" | "info" | "error"
    message: string
    date: string
  }>
  email_verified: boolean
  phone_verified: boolean
  two_factor_enabled: boolean
  role: "customer" | "admin" | "supplier" | "support"
  status: "active" | "pending" | "suspended"
  created_at: string
  updated_at: string
  preferences: {
    language: string
    currency: string
    notifications: { email: boolean; sms: boolean; push: boolean }
    theme: string
  }
  password_hash: string
}

// Product Management Data
export interface AdminProduct {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand: string
  sku: string
  stock_quantity: number
  status: "active" | "inactive" | "out_of_stock"
  image_url: string
  created_at: string
  updated_at: string
  seller_id: string
  seller_name: string
  total_sales: number
  rating: number
  reviews_count: number
}

// Order Management Data
export interface AdminOrder {
  total_amount: number
  order_date: string
  id: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  tracking_number: ReactNode
  customer_name: string
  order_number: string
  items_count: number
  customer_email: string
  shipping_address: {
    street: string
    city: string
    state: string
    zip_code: string
    country: string
  }
  payment_method: string
  payment_status: "pending" | "completed" | "failed" | "refunded"
  notes?: string
  items: Array<{
    product_id: string
    product_name: string
    quantity: number
    price: number
    image_url: string
  }>
}

// Mock Admin Analytics
export const mock_admin_analytics: AdminAnalytics = {
  overview: {
    total_users: 1247,
    total_orders: 3891,
    total_revenue: 127450.75,
    total_products: 2156,
    growth_metrics: {
      users_growth: 12.5,
      orders_growth: 8.3,
      revenue_growth: 15.7,
      products_growth: 6.2,
    },
  },
  recent_activity: [
    {
      id: "activity_001",
      type: "order_placed",
      description: "New order placed by John Doe",
      timestamp: "2024-01-15T14:30:00Z",
      user_id: "user_001",
      user_name: "John Doe",
    },
    {
      id: "activity_002",
      type: "user_registration",
      description: "New user registered: jane.smith@example.com",
      timestamp: "2024-01-15T13:45:00Z",
      user_id: "user_002",
      user_name: "Jane Smith",
    },
    {
      id: "activity_003",
      type: "product_added",
      description: "New product added: Brake Pad Set Premium",
      timestamp: "2024-01-15T12:20:00Z",
    },
    {
      id: "activity_004",
      type: "user_login",
      description: "Admin login: admin@addisparts.com",
      timestamp: "2024-01-15T11:15:00Z",
      user_id: "user_003",
      user_name: "Admin User",
    },
  ],
  top_products: [
    {
      id: "1",
      name: "Brake Pad Set - Premium",
      sales_count: 156,
      revenue: 7794.44,
      image_url: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Oil Filter - Standard",
      sales_count: 234,
      revenue: 3038.66,
      image_url: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Spark Plug Set - Iridium",
      sales_count: 89,
      revenue: 2892.5,
      image_url: "/placeholder.svg?height=100&width=100",
    },
  ],
  user_activity: [
    { date: "2024-01-08", new_users: 23, active_users: 145, orders: 67 },
    { date: "2024-01-09", new_users: 31, active_users: 167, orders: 89 },
    { date: "2024-01-10", new_users: 18, active_users: 134, orders: 56 },
    { date: "2024-01-11", new_users: 27, active_users: 178, orders: 94 },
    { date: "2024-01-12", new_users: 35, active_users: 189, orders: 102 },
    { date: "2024-01-13", new_users: 29, active_users: 156, orders: 78 },
    { date: "2024-01-14", new_users: 42, active_users: 201, orders: 115 },
  ],
}

// Mock Admin Users
export const mock_admin_users: AdminUser[] = [{
    _id: "user_001",
    id: "user_001",
    name: "John Doe",
    contact: {
      phone: "+1-555-0100",
      address: "123 Main St",
      city: "Springfield",
      country: "USA",
    },
    email: "admin@addisparts.com",
    password_hash: "password123",
    frist_name: "John",
    last_name: "Doe",
    phone: "+1-555-0100",
    avatar_url: "/avatars/john.png",
    email_verified: true,
    phone_verified: true,
    two_factor_enabled: false,
    role: "admin",
    status: "active",
    last_login: "2025-06-25T08:00:00Z",
    created_at: "2024-12-01T10:00:00Z",
    updated_at: "2025-06-25T08:00:00Z",
    preferences: {
      language: "en",
      currency: "USD",
      notifications: { email: true, sms: false, push: true },
      theme: "light",
    },
    total_orders: 12,
    total_spent: 1090.45,
    last_order_date: "2025-06-20T12:30:00Z",
    account_flags: [],
  },
  {
    _id: "user_002",
    id: "user_002",
    name: "Maya Tesfaye",
    contact: {
      phone: "+251-911-123456",
      address: "",
      city: "",
      country: "",
    },
    email: "maya.t@example.com",
    password_hash: "$2b$12$exampleHashedPassword002",
    frist_name: "Maya",
    last_name: "Tesfaye",
    phone: "+251-911-123456",
    avatar_url: "/avatars/maya.png",
    email_verified: false,
    phone_verified: true,
    two_factor_enabled: true,
    role: "customer",
    status: "pending",
    last_login: "2025-06-20T07:45:00Z",
    created_at: "2025-01-10T11:30:00Z",
    updated_at: "2025-06-20T07:45:00Z",
    preferences: {
      language: "am",
      currency: "ETB",
      notifications: { email: true, sms: true, push: false },
      theme: "dark",
    },
    total_orders: 4,
    total_spent: 420.25,
    last_order_date: "2025-05-25T09:10:00Z",
    account_flags: [
      {
        type: "warning",
        message: "Phone number changed recently",
        date: "2025-06-01T00:00:00Z",
      },
    ],
  },
  {
    _id: "user_003",
    id: "user_003",
    name: "Ali Nur",
    contact: {
      phone: "+251-922-334455",
      address: "",
      city: "",
      country: "",
    },
    email: "ali.nur@example.com",
    password_hash: "$2b$12$exampleHashedPassword003",
    frist_name: "Ali",
    last_name: "Nur",
    phone: "+251-922-334455",
    avatar_url: "/avatars/ali.png",
    email_verified: true,
    phone_verified: false,
    two_factor_enabled: false,
    role: "customer",
    status: "suspended",
    last_login: "2025-06-10T14:30:00Z",
    created_at: "2024-11-20T13:45:00Z",
    updated_at: "2025-06-10T14:30:00Z",
    preferences: {
      language: "en",
      currency: "ETB",
      notifications: { email: false, sms: true, push: true },
      theme: "system",
    },
    total_orders: 2,
    total_spent: 189.99,
    last_order_date: "2025-04-01T16:00:00Z",
    account_flags: [
      {
        type: "error",
        message: "Account flagged for suspicious activity",
        date: "2025-06-10T00:00:00Z",
      },
    ],
  },]

// Mock Admin Products
export const mock_admin_products: AdminProduct[] = [
  {
    id: "1",
    name: "Brake Pad Set - Premium",
    description: "High-performance ceramic brake pads for superior stopping power",
    price: 49.99,
    category: "Brakes",
    brand: "AutoPro",
    sku: "BP-PREM-001",
    stock_quantity: 45,
    status: "active",
    image_url: "/placeholder.svg?height=100&width=100",
    created_at: "2023-08-15T10:00:00Z",
    updated_at: "2024-01-10T14:30:00Z",
    seller_id: "seller_001",
    seller_name: "AutoParts Direct",
    total_sales: 156,
    rating: 4.8,
    reviews_count: 89,
  },
  {
    id: "2",
    name: "Oil Filter - Standard",
    description: "Standard oil filter for regular maintenance",
    price: 12.99,
    category: "Filters",
    brand: "FilterMax",
    sku: "OF-STD-002",
    stock_quantity: 0,
    status: "out_of_stock",
    image_url: "/placeholder.svg?height=100&width=100",
    created_at: "2023-09-20T12:00:00Z",
    updated_at: "2024-01-14T09:15:00Z",
    seller_id: "seller_002",
    seller_name: "Parts Plus",
    total_sales: 234,
    rating: 4.5,
    reviews_count: 156,
  },
  {
    id: "3",
    name: "Spark Plug Set - Iridium",
    description: "Long-lasting iridium spark plugs for improved performance",
    price: 32.5,
    category: "Ignition",
    brand: "SparkTech",
    sku: "SP-IRD-003",
    stock_quantity: 23,
    status: "active",
    image_url: "/placeholder.svg?height=100&width=100",
    created_at: "2023-10-05T15:30:00Z",
    updated_at: "2024-01-12T11:45:00Z",
    seller_id: "seller_001",
    seller_name: "AutoParts Direct",
    total_sales: 89,
    rating: 4.9,
    reviews_count: 67,
  },
]

// Mock Admin Orders
export const mock_admin_orders: AdminOrder[] = [
  {
    id: "order_001",
    order_number: "ORD-2024-001",
    status: "delivered",
    total_amount: 156.47,
    items_count: 3,
    order_date: "2024-01-10T14:30:00Z",
 
    tracking_number: "1Z999AA1234567890",
    customer_name: "John Doe",
    customer_email: "john.doe@example.com",
    shipping_address: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zip_code: "62701",
      country: "USA",
    },
    payment_method: "Credit Card",
    payment_status: "completed",
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
    items_count: 2,
    order_date: "2024-01-12T09:15:00Z",
    tracking_number: "1Z999AA1234567891",
    customer_name: "Jane Smith",
    customer_email: "jane.smith@example.com",
    shipping_address: {
      street: "456 Oak Ave",
      city: "Chicago",
      state: "IL",
      zip_code: "60601",
      country: "USA",
    },
    payment_method: "PayPal",
    payment_status: "completed",
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
    items_count: 4,
    order_date: "2024-01-14T16:45:00Z",
    tracking_number: "1Z999AA1234567892",
    customer_name: "Ali Nur",
    customer_email: "ali.nur@example.com",
    shipping_address: {
      street: "789 Pine St",
      city: "Milwaukee",
      state: "WI",
      zip_code: "53201",
      country: "USA",
    },
    payment_method: "Credit Card",
    payment_status: "pending",
    notes: "Customer requested expedited shipping",
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

// Helper functions
export function getAdminAnalytics(): AdminAnalytics {
  return mock_admin_analytics
}

export function getAllUsers(): AdminUser[] {
  return mock_admin_users
}

export function getAllProducts(): AdminProduct[] {
  return mock_admin_products
}

export function getAllOrders(): AdminOrder[] {
  return mock_admin_orders
}

export function getUserById(id: string): AdminUser | undefined {
  return mock_admin_users.find((user) => user.id === id)
}

export function getProductById(id: string): AdminProduct | undefined {
  return mock_admin_products.find((product) => product.id === id)
}

export function getOrderById(id: string): AdminOrder | undefined {
  return mock_admin_orders.find((order) => order.id === id)
}

export function updateUserStatus(userId: string, status: "active" | "suspended" | "pending"): boolean {
  const userIndex = mock_admin_users.findIndex((user) => user.id === userId)
  if (userIndex !== -1) {
    mock_admin_users[userIndex].status = status
    mock_admin_users[userIndex].updated_at = new Date().toISOString()
    return true
  }
  return false
}

export function updateProductStatus(productId: string, status: "active" | "inactive" | "out_of_stock"): boolean {
  const productIndex = mock_admin_products.findIndex((product) => product.id === productId)
  if (productIndex !== -1) {
    mock_admin_products[productIndex].status = status
    mock_admin_products[productIndex].updated_at = new Date().toISOString()
    return true
  }
  return false
}

export function updateOrderStatus(
  orderId: string,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
): boolean {
  const orderIndex = mock_admin_orders.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    mock_admin_orders[orderIndex].status = status
    return true
  }
  return false
}
