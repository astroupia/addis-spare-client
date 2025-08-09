export interface LoginFormData {
  email: string
  password: string
}
export type UserRole = "customer" | "seller" | "admin" | "supplier" | "support";

export interface User {
  id: string
  email: string
  password_hash: string
  first_name: string
  last_name: string
  phone?: string
  avatar_url?: string
  email_verified: boolean
  phone_verified: boolean
  two_factor_enabled: boolean
  two_factor_secret?: string
  role: UserRole;
  status: "active" | "suspended" | "pending"
  last_login?: string
  created_at: string
  updated_at: string
  preferences?: {
    language: string
    currency: string
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
    theme: "light" | "dark" | "system"
  }
}

export interface LoginCredentials {
  email: string
  password: string
  remember_me?: boolean
}

export interface TwoFactorVerification {
  user_id: string
  code: string
  backup_code?: string
}

export interface AuthSession {
  user_id: string
  session_token: string
  expires_at: string
  created_at: string
  device_info?: {
    user_agent: string
    ip_address: string
    device_type: "desktop" | "mobile" | "tablet"
  }
}

export interface LoginResponse {
  success: boolean
  user?: User
  session?: AuthSession
  requires_2fa?: boolean
  temp_token?: string
  message?: string
  error?: string
}

export interface TwoFactorSetup {
  secret: string
  qr_code_url: string
  backup_codes: string[]
}

export interface UserProfile {
  personal_info: {
    first_name: string
    last_name: string
    email: string
    phone?: string
    date_of_birth?: string
    avatar_url?: string
  }
  address: {
    street: string
    city: string
    state: string
    zip_code: string
    country: string
  }
  preferences: User["preferences"]
  security: {
    two_factor_enabled: boolean
    last_password_change: string
    active_sessions: number
  }
}

export interface OrderHistory {
  id: string
  order_number: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  currency: string
  items_count: number
  order_date: string
  estimated_delivery?: string
  tracking_number?: string
  items: Array<{
    product_id: string
    product_name: string
    quantity: number
    price: number
    image_url: string
  }>
}

export interface SavedItem {
  id: string
  user_id: string
  product_id: string
  product_name: string
  product_price: number
  product_image: string
  saved_at: string
  notes?: string
}
