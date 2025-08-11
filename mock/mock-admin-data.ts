import type { User } from "@/types/auth"

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
    type:
      | "user_registration"
      | "order_placed"
      | "product_added"
      | "user_login"
      | "content_reported"
      | "content_taken_down"
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

export interface ReportedContent {
  id: string
  type: "product" | "user" | "review"
  target_id: string
  target_name: string
  target_image?: string
  reporter_id: string
  reporter_name: string
  reporter_email: string
  reason: "inappropriate_content" | "spam" | "fraud" | "harassment" | "copyright" | "other"
  description: string
  status: "pending" | "under_review" | "resolved" | "dismissed"
  priority: "low" | "medium" | "high" | "critical"
  created_at: string
  reviewed_at?: string
  reviewed_by?: string
  admin_notes?: string
  evidence_urls?: string[]
  action_taken?: "warning_issued" | "content_removed" | "user_suspended" | "account_banned" | "no_action"
}

// Admin User Management Data
export interface AdminUser extends User {
  id: string
  email: string
  name: string
  password_hash: string
  first_name: string
  last_name: string
  phone: string
  avatar_url: string
  email_verified: boolean
  phone_verified: boolean
  two_factor_enabled: boolean
  role: "customer" | "supplier" | "admin" | "support"
  status: "active" | "suspended" | "pending"
  last_login: string
  created_at: string
  updated_at: string
  preferences: {
    language: string
    currency: string
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    theme: "light" | "dark" | "system"
  }
  total_orders: number
  total_spent: number
  last_order_date?: string
  account_flags: Array<{
    type: "warning" | "info" | "error"
    message: string
    date: string
  }>
  privileges?: string[] // <-- Admin privileges
}

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
      type: "content_reported",
      description: "Product reported for inappropriate content",
      timestamp: "2024-01-15T15:30:00Z",
    },
    {
      id: "activity_002",
      type: "content_taken_down",
      description: "User account suspended for policy violation",
      timestamp: "2024-01-15T14:45:00Z",
    },
    {
      id: "activity_003",
      type: "order_placed",
      description: "New order placed by John Doe",
      timestamp: "2024-01-15T14:30:00Z",
      user_id: "user_001",
      user_name: "John Doe",
    },
    {
      id: "activity_004",
      type: "user_registration",
      description: "New user registered: jane.smith@example.com",
      timestamp: "2024-01-15T13:45:00Z",
      user_id: "user_002",
      user_name: "Jane Smith",
    },
    {
      id: "activity_005",
      type: "product_added",
      description: "New product added: Brake Pad Set Premium",
      timestamp: "2024-01-15T12:20:00Z",
    },
    {
      id: "activity_006",
      type: "user_login",
      description: "Admin login: admin@addisparts.com",
      timestamp: "2024-01-15T11:15:00Z",
      user_id: "admin_001",
      user_name: "Super Admin",
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

// --- ADMIN USERS WITH PRIVILEGES ---

export const mock_admin_users: AdminUser[] = [
  {
    // _id: "admin_001",
    id: "admin_001",
    name: "Super Admin",
    // contact: {
    //   phone: "+1-555-0000",
    //   address: "1 Admin Plaza",
    //   city: "Addis Ababa",
    //   country: "Ethiopia",
    // },
    email: "admin@addisparts.com",
    password_hash: "password123", // In real app, use hashed password
    first_name: "Super",
    last_name: "Admin",
    phone: "+1-555-0000",
    avatar_url: "/placeholder.svg?height=100&width=100",
    email_verified: true,
    phone_verified: true,
    two_factor_enabled: true,
    role: "admin",
    status: "active",
    last_login: "2024-01-15T11:15:00Z",
    created_at: "2023-01-01T08:00:00Z",
    updated_at: "2024-01-15T11:15:00Z",
    preferences: {
      language: "en",
      currency: "ETB",
      notifications: { email: true, sms: true, push: true },
      theme: "dark",
    },
    total_orders: 0,
    total_spent: 0,
    account_flags: [],
    privileges: [
      "manage_users",
      "manage_products",
      "manage_orders",
      "view_reports",
      "moderate_content",
      "access_settings",
      "impersonate_users",
    ],
  },
  {
    // _id: "user_001",
    id: "user_001",
    name: "John Doe",
    // contact: {
    //   phone: "+1-555-0123",
    //   address: "123 Main St",
    //   city: "Springfield",
    //   country: "USA",
    // },
    email: "john.doe@example.com",
    password_hash: "password123",
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
      notifications: { email: true, sms: true, push: true },
      theme: "light",
    },
    total_orders: 15,
    total_spent: 1234.56,
    last_order_date: "2024-01-10T14:30:00Z",
    account_flags: [
      {
        type: "info",
        message: "Welcome bonus applied",
        date: "2023-06-15T08:30:00Z",
      },
    ],
  },
  {
    // _id: "user_002",
    id: "user_002",
    name: "Jane Smith",
    // contact: {
    //   phone: "+1-555-0456",
    //   address: "789 Maple Ave",
    //   city: "Chicago",
    //   country: "USA",
    // },
    email: "jane.smith@example.com",
    password_hash: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDxy",
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
      notifications: { email: true, sms: false, push: true },
      theme: "dark",
    },
    total_orders: 8,
    total_spent: 567.34,
    last_order_date: "2024-01-12T09:15:00Z",
    account_flags: [
      {
        type: "info",
        message: "Welcome bonus applied",
        date: "2023-08-20T12:15:00Z",
      },
    ],
  },
  {
    // _id: "user_004",
    id: "user_004",
    name: "Mike Wilson",
    // contact: {
    //   phone: "+1-555-0789",
    //   address: "123 Elm St",
    //   city: "Milwaukee",
    //   country: "USA",
    // },
    email: "mike.wilson@example.com",
    password_hash: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5uDxy",
    first_name: "Mike",
    last_name: "Wilson",
    phone: "+1-555-0789",
    avatar_url: "/placeholder.svg?height=100&width=100",
    email_verified: false,
    phone_verified: true,
    two_factor_enabled: false,
    role: "customer",
    status: "suspended",
    last_login: "2024-01-10T08:20:00Z",
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2024-01-10T08:20:00Z",
    preferences: {
      language: "en",
      currency: "USD",
      notifications: { email: false, sms: true, push: false },
      theme: "system",
    },
    total_orders: 3,
    total_spent: 189.45,
    last_order_date: "2024-01-08T14:30:00Z",
    account_flags: [
      {
        type: "error",
        message: "Account suspended due to policy violation",
        date: "2024-01-10T00:00:00Z",
      },
      {
        type: "warning",
        message: "Email not verified",
        date: "2023-12-01T00:00:00Z",
      },
    ],
  },
]

// --- ADMIN PRODUCT INTERFACE ---
export interface AdminProduct {
  id: string
  name: string
  description: string
  price: number
  category: string
  brand: string
  sku: string
  stock_quantity: number
  status: "active" | "inactive" | "out_of_stock" | "reported" | "taken_down"
  image_url: string
  created_at: string
  updated_at: string
  seller_id: string
  seller_name: string
  total_sales: number
  rating: number
  reviews_count: number
}
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
  {
    id: "4",
    name: "Counterfeit Brake Pads",
    description: "Fake brake pads being sold as genuine",
    price: 25.99,
    category: "Brakes",
    brand: "FakeBrand",
    sku: "FB-FAKE-001",
    stock_quantity: 15,
    status: "reported",
    image_url: "/placeholder.svg?height=100&width=100",
    created_at: "2024-01-01T10:00:00Z",
    updated_at: "2024-01-15T14:30:00Z",
    seller_id: "seller_003",
    seller_name: "Suspicious Seller",
    total_sales: 5,
    rating: 2.1,
    reviews_count: 12,
  },
]

// --- ADMIN ORDER INTERFACE ---
export interface AdminOrder {
  id: string
  order_number: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  currency: string
  items_count: number
  order_date: string
  estimated_delivery?: string
  tracking_number?: string
  customer_name: string
  customer_email: string
  shipping_address: {
    street: string
    city: string
    state: string
    zip_code: string
    country: string
  }
  payment_method: string
  payment_status: "pending" | "completed" | "failed"
  notes?: string
  items: Array<{
    product_id: string
    product_name: string
    quantity: number
    price: number
    image_url: string
  }>
}

// Mock Admin Orders
export const mock_admin_orders: AdminOrder[] = [
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
    currency: "USD",
    items_count: 2,
    order_date: "2024-01-12T09:15:00Z",
    estimated_delivery: "2024-01-18T17:00:00Z",
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
    currency: "USD",
    items_count: 4,
    order_date: "2024-01-14T16:45:00Z",
    customer_name: "Mike Wilson",
    customer_email: "mike.wilson@example.com",
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

// Mock Reported Content
export const mock_reported_content: ReportedContent[] = [
  {
    id: "report_001",
    type: "product",
    target_id: "4",
    target_name: "Counterfeit Brake Pads",
    target_image: "/placeholder.svg?height=100&width=100",
    reporter_id: "user_001",
    reporter_name: "John Doe",
    reporter_email: "john.doe@example.com",
    reason: "fraud",
    description:
      "This product appears to be counterfeit. The packaging and quality don't match the genuine brand. I received these and they look nothing like the real AutoPro brake pads I've purchased before.",
    status: "pending",
    priority: "high",
    created_at: "2024-01-15T14:30:00Z",
    evidence_urls: ["/placeholder.svg?height=200&width=200"],
  },
  {
    id: "report_002",
    type: "user",
    target_id: "user_004",
    target_name: "Mike Wilson",
    target_image: "/placeholder.svg?height=100&width=100",
    reporter_id: "user_002",
    reporter_name: "Jane Smith",
    reporter_email: "jane.smith@example.com",
    reason: "harassment",
    description:
      "This user has been sending inappropriate messages through the messaging system. They've been harassing me about a product I'm selling and using offensive language.",
    status: "under_review",
    priority: "medium",
    created_at: "2024-01-14T16:20:00Z",
    reviewed_at: "2024-01-15T09:00:00Z",
    reviewed_by: "admin_001",
    admin_notes: "Reviewing message history and user behavior patterns.",
  },
  {
    id: "report_003",
    type: "product",
    target_id: "5",
    target_name: "Spam Product Listing",
    target_image: "/placeholder.svg?height=100&width=100",
    reporter_id: "user_001",
    reporter_name: "John Doe",
    reporter_email: "john.doe@example.com",
    reason: "spam",
    description:
      "This listing is clearly spam. The description is nonsensical and the images don't match the product title. It seems like the seller is just trying to get clicks.",
    status: "resolved",
    priority: "low",
    created_at: "2024-01-13T11:15:00Z",
    reviewed_at: "2024-01-14T10:30:00Z",
    reviewed_by: "admin_001",
    admin_notes: "Product removed for spam content. Seller warned.",
    action_taken: "content_removed",
  },
  {
    id: "report_004",
    type: "product",
    target_id: "6",
    target_name: "Inappropriate Product Images",
    target_image: "/placeholder.svg?height=100&width=100",
    reporter_id: "user_002",
    reporter_name: "Jane Smith",
    reporter_email: "jane.smith@example.com",
    reason: "inappropriate_content",
    description:
      "The product images contain inappropriate content that is not suitable for a car parts marketplace. This violates the platform's content policy.",
    status: "resolved",
    priority: "high",
    created_at: "2024-01-12T14:45:00Z",
    reviewed_at: "2024-01-13T08:20:00Z",
    reviewed_by: "admin_002",
    admin_notes: "Images reviewed and found to violate content policy. Product images updated by seller.",
    action_taken: "warning_issued",
  },
  {
    id: "report_005",
    type: "user",
    target_id: "user_005",
    target_name: "Scammer Account",
    reporter_id: "user_001",
    reporter_name: "John Doe",
    reporter_email: "john.doe@example.com",
    reason: "fraud",
    description:
      "This user is running a scam operation. They take payments but never ship products. I've seen multiple complaints about them in forums.",
    status: "pending",
    priority: "critical",
    created_at: "2024-01-15T16:00:00Z",
    evidence_urls: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
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

export function getAllReportedContent(): ReportedContent[] {
  return mock_reported_content
}
export function getUserByEmail(email: string): AdminUser | undefined {
  return mock_admin_users.find((user) => user.email === email)
}

export function getAllOrders(): AdminOrder[] {
  return mock_admin_orders
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

export function updateUserStatus(
  userId: string,
  status: "active" | "suspended" | "pending"
): boolean {
  const userIndex = mock_admin_users.findIndex((user) => user.id === userId)
  if (userIndex !== -1) {
    mock_admin_users[userIndex].status = status
    return true
  }
  return false
}

export function updateProductStatus(
  productId: string,
  status: "active" | "inactive" | "out_of_stock" | "reported" | "taken_down"
): boolean {
  const productIndex = mock_admin_products.findIndex((product) => product.id === productId)
  if (productIndex !== -1) {
    mock_admin_products[productIndex].status = status
    return true
  }
  return false
}

export function updateReportStatus(
  reportId: string,
  status: "pending" | "under_review" | "resolved" | "dismissed",
  adminId?: string,
  adminNotes?: string,
  actionTaken?: "warning_issued" | "content_removed" | "user_suspended" | "account_banned" | "no_action",
): boolean {
  const reportIndex = mock_reported_content.findIndex((report) => report.id === reportId)
  if (reportIndex !== -1) {
    mock_reported_content[reportIndex].status = status
    mock_reported_content[reportIndex].reviewed_at = new Date().toISOString()
    if (adminId) mock_reported_content[reportIndex].reviewed_by = adminId
    if (adminNotes) mock_reported_content[reportIndex].admin_notes = adminNotes
    if (actionTaken) mock_reported_content[reportIndex].action_taken = actionTaken
    return true
  }
  return false
}

export function getReportById(reportId: string): ReportedContent | undefined {
  return mock_reported_content.find((report) => report.id === reportId)
}

export function takeDownContent(reportId: string, adminId: string, reason: string): boolean {
  const report = getReportById(reportId)
  if (!report) return false

  // Update report status
  updateReportStatus(reportId, "resolved", adminId, reason, "content_removed")

  // Take action based on content type
  if (report.type === "product") {
    updateProductStatus(report.target_id, "taken_down")
  } else if (report.type === "user") {
    updateUserStatus(report.target_id, "suspended")
  }

  return true
}

export function dismissReport(reportId: string, adminId: string, reason: string): boolean {
  return updateReportStatus(reportId, "dismissed", adminId, reason, "no_action")
}
