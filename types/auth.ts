export interface User {
  _id: string
  name: string
  email: string
  password_hash: string
  role: "customer" | "supplier" | "admin" | "support"
  contact: {
    phone: string
    address: string
    city: string
    country: string
  }
  status: "active" | "pending" | "suspended"
  preferences: Record<string, any>
  created_at: string
  updated_at: string
}

export interface SignUpFormData {
  name: string
  email: string
  password: string
  role: string
  contact: {
    phone: string
    address: string
    city: string
    country: string
  }
}

export interface AuthResponse {
  user: User
  token: string
}
