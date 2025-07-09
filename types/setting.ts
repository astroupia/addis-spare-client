export interface TaxRule {
  id: string
  name: string
  description: string
  rate: number // percentage
  type: "percentage" | "fixed"
  applies_to: "all" | "category" | "product"
  category_ids?: string[]
  product_ids?: string[]
  regions: string[]
  active: boolean
  created_at: string
  updated_at: string
}

export interface DeliveryZone {
  id: string
  name: string
  description: string
  regions: string[]
  cities: string[]
  postal_codes: string[]
  delivery_methods: DeliveryMethod[]
  active: boolean
  created_at: string
  updated_at: string
}

export interface DeliveryMethod {
  id: string
  name: string
  description: string
  base_cost: number
  cost_per_km?: number
  cost_per_kg?: number
  estimated_days_min: number
  estimated_days_max: number
  max_weight?: number
  max_dimensions?: {
    length: number
    width: number
    height: number
  }
  active: boolean
}

export interface UserPermission {
  id: string
  name: string
  description: string
  category: "user_management" | "product_management" | "order_management" | "content_management" | "system_settings"
  actions: string[]
}

export interface UserRole {
  id: string
  name: string
  description: string
  permissions: string[]
  is_system_role: boolean
  user_count: number
  created_at: string
  updated_at: string
}

export interface SystemSettings {
  id: string
  category: "general" | "payment" | "shipping" | "notifications" | "security"
  key: string
  value: string | number | boolean
  type: "string" | "number" | "boolean" | "json"
  description: string
  is_public: boolean
  updated_at: string
  updated_by: string
}

export interface PaymentSettings {
  id: string
  provider: "stripe" | "paypal" | "bank_transfer" | "cash_on_delivery"
  name: string
  description: string
  configuration: Record<string, any>
  active: boolean
  test_mode: boolean
  supported_currencies: string[]
  transaction_fee: number
  created_at: string
  updated_at: string
}

export interface NotificationSettings {
  id: string
  type: "email" | "sms" | "push" | "in_app"
  event: string
  template: string
  recipients: "users" | "admins" | "sellers" | "custom"
  active: boolean
  configuration: Record<string, any>
  created_at: string
  updated_at: string
}

export interface PlatformSettings {
  tax_rules: TaxRule[]
  delivery_zones: DeliveryZone[]
  user_permissions: UserPermission[]
  user_roles: UserRole[]
  system_settings: SystemSettings[]
  payment_settings: PaymentSettings[]
  notification_settings: NotificationSettings[]
}
