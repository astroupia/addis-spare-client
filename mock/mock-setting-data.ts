import type {
  TaxRule,
  DeliveryZone,
  UserPermission,
  UserRole,
  SystemSettings,
  PaymentSettings,
  NotificationSettings,
  PlatformSettings,
} from "@/types/setting"

// Mock Tax Rules
export const mock_tax_rules: TaxRule[] = [
  {
    id: "tax_001",
    name: "Standard VAT",
    description: "Standard Value Added Tax for most products",
    rate: 15,
    type: "percentage",
    applies_to: "all",
    regions: ["Ethiopia", "Addis Ababa"],
    active: true,
    created_at: "2023-01-15T10:00:00Z",
    updated_at: "2024-01-10T14:30:00Z",
  },
  {
    id: "tax_002",
    name: "Automotive Parts Tax",
    description: "Special tax rate for automotive parts and accessories",
    rate: 10,
    type: "percentage",
    applies_to: "category",
    category_ids: ["brakes", "engine", "electrical"],
    regions: ["Ethiopia"],
    active: true,
    created_at: "2023-02-20T12:00:00Z",
    updated_at: "2024-01-05T09:15:00Z",
  },
  {
    id: "tax_003",
    name: "Luxury Items Tax",
    description: "Higher tax rate for luxury automotive accessories",
    rate: 25,
    type: "percentage",
    applies_to: "category",
    category_ids: ["accessories", "interior"],
    regions: ["Ethiopia", "Addis Ababa"],
    active: true,
    created_at: "2023-03-10T15:30:00Z",
    updated_at: "2023-12-15T11:45:00Z",
  },
]

// Mock Delivery Zones
export const mock_delivery_zones: DeliveryZone[] = [
  {
    id: "zone_001",
    name: "Addis Ababa Metro",
    description: "Central Addis Ababa and surrounding metropolitan area",
    regions: ["Addis Ababa"],
    cities: ["Addis Ababa", "Bole", "Kirkos", "Yeka", "Nifas Silk-Lafto"],
    postal_codes: ["1000-1999", "2000-2999"],
    delivery_methods: [
      {
        id: "method_001",
        name: "Same Day Delivery",
        description: "Delivery within 24 hours",
        base_cost: 50,
        cost_per_km: 5,
        estimated_days_min: 0,
        estimated_days_max: 1,
        max_weight: 20,
        active: true,
      },
      {
        id: "method_002",
        name: "Standard Delivery",
        description: "Regular delivery service",
        base_cost: 25,
        cost_per_km: 3,
        estimated_days_min: 1,
        estimated_days_max: 3,
        max_weight: 50,
        active: true,
      },
    ],
    active: true,
    created_at: "2023-01-10T08:00:00Z",
    updated_at: "2024-01-12T16:20:00Z",
  },
  {
    id: "zone_002",
    name: "Regional Cities",
    description: "Major cities outside Addis Ababa",
    regions: ["Oromia", "Amhara", "Tigray", "SNNP"],
    cities: ["Bahir Dar", "Mekelle", "Hawassa", "Jimma", "Adama"],
    postal_codes: ["3000-8999"],
    delivery_methods: [
      {
        id: "method_003",
        name: "Express Delivery",
        description: "Fast delivery to regional cities",
        base_cost: 100,
        cost_per_km: 8,
        estimated_days_min: 2,
        estimated_days_max: 5,
        max_weight: 30,
        active: true,
      },
      {
        id: "method_004",
        name: "Economy Delivery",
        description: "Cost-effective delivery option",
        base_cost: 60,
        cost_per_km: 4,
        estimated_days_min: 5,
        estimated_days_max: 10,
        max_weight: 100,
        active: true,
      },
    ],
    active: true,
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2024-01-08T13:45:00Z",
  },
]

// Mock User Permissions
export const mock_user_permissions: UserPermission[] = [
  {
    id: "perm_001",
    name: "User Management",
    description: "Manage user accounts and profiles",
    category: "user_management",
    actions: ["create_user", "edit_user", "delete_user", "view_users", "suspend_user"],
  },
  {
    id: "perm_002",
    name: "Product Management",
    description: "Manage products and inventory",
    category: "product_management",
    actions: ["create_product", "edit_product", "delete_product", "view_products", "manage_inventory"],
  },
  {
    id: "perm_003",
    name: "Order Management",
    description: "Manage orders and fulfillment",
    category: "order_management",
    actions: ["view_orders", "edit_orders", "cancel_orders", "process_refunds", "manage_shipping"],
  },
  {
    id: "perm_004",
    name: "Content Moderation",
    description: "Moderate user-generated content",
    category: "content_management",
    actions: ["review_reports", "remove_content", "ban_users", "manage_reviews"],
  },
  {
    id: "perm_005",
    name: "System Settings",
    description: "Configure system-wide settings",
    category: "system_settings",
    actions: ["edit_settings", "manage_taxes", "manage_shipping", "manage_payments"],
  },
]

// Mock User Roles
export const mock_user_roles: UserRole[] = [
  {
    id: "role_001",
    name: "Super Admin",
    description: "Full system access with all permissions",
    permissions: ["perm_001", "perm_002", "perm_003", "perm_004", "perm_005"],
    is_system_role: true,
    user_count: 2,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "role_002",
    name: "Admin",
    description: "Administrative access with limited system settings",
    permissions: ["perm_001", "perm_002", "perm_003", "perm_004"],
    is_system_role: true,
    user_count: 5,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-10T12:00:00Z",
  },
  {
    id: "role_003",
    name: "Moderator",
    description: "Content moderation and basic user management",
    permissions: ["perm_004", "perm_001"],
    is_system_role: false,
    user_count: 8,
    created_at: "2023-02-15T10:00:00Z",
    updated_at: "2024-01-05T14:30:00Z",
  },
  {
    id: "role_004",
    name: "Customer Support",
    description: "Handle customer inquiries and basic order management",
    permissions: ["perm_003"],
    is_system_role: false,
    user_count: 12,
    created_at: "2023-03-01T09:00:00Z",
    updated_at: "2023-12-20T16:45:00Z",
  },
]

// Mock System Settings
export const mock_system_settings: SystemSettings[] = [
  {
    id: "setting_001",
    category: "general",
    key: "site_name",
    value: "Addis Spare Parts",
    type: "string",
    description: "The name of the platform",
    is_public: true,
    updated_at: "2024-01-10T10:00:00Z",
    updated_by: "admin@addisparts.com",
  },
  {
    id: "setting_002",
    category: "general",
    key: "site_description",
    value: "Ethiopia's leading automotive spare parts marketplace",
    type: "string",
    description: "Platform description for SEO and branding",
    is_public: true,
    updated_at: "2024-01-10T10:00:00Z",
    updated_by: "admin@addisparts.com",
  },
  {
    id: "setting_003",
    category: "general",
    key: "default_currency",
    value: "ETB",
    type: "string",
    description: "Default currency for the platform",
    is_public: true,
    updated_at: "2024-01-10T10:00:00Z",
    updated_by: "admin@addisparts.com",
  },
  {
    id: "setting_004",
    category: "general",
    key: "max_upload_size",
    value: 10,
    type: "number",
    description: "Maximum file upload size in MB",
    is_public: false,
    updated_at: "2024-01-10T10:00:00Z",
    updated_by: "admin@addisparts.com",
  },
  {
    id: "setting_005",
    category: "security",
    key: "require_email_verification",
    value: true,
    type: "boolean",
    description: "Require email verification for new accounts",
    is_public: false,
    updated_at: "2024-01-10T10:00:00Z",
    updated_by: "admin@addisparts.com",
  },
  {
    id: "setting_006",
    category: "security",
    key: "session_timeout",
    value: 3600,
    type: "number",
    description: "Session timeout in seconds",
    is_public: false,
    updated_at: "2024-01-10T10:00:00Z",
    updated_by: "admin@addisparts.com",
  },
]

// Mock Payment Settings
export const mock_payment_settings: PaymentSettings[] = [
  {
    id: "payment_001",
    provider: "stripe",
    name: "Stripe Payment Gateway",
    description: "Credit card and online payment processing",
    configuration: {
      public_key: "pk_test_...",
      webhook_secret: "whsec_...",
      supported_methods: ["card", "mobile_money"],
    },
    active: true,
    test_mode: true,
    supported_currencies: ["ETB", "USD"],
    transaction_fee: 2.9,
    created_at: "2023-01-15T10:00:00Z",
    updated_at: "2024-01-10T14:30:00Z",
  },
  {
    id: "payment_002",
    provider: "cash_on_delivery",
    name: "Cash on Delivery",
    description: "Pay when you receive your order",
    configuration: {
      max_amount: 10000,
      available_regions: ["Addis Ababa", "Bahir Dar"],
    },
    active: true,
    test_mode: false,
    supported_currencies: ["ETB"],
    transaction_fee: 0,
    created_at: "2023-01-15T10:00:00Z",
    updated_at: "2024-01-05T09:15:00Z",
  },
  {
    id: "payment_003",
    provider: "bank_transfer",
    name: "Bank Transfer",
    description: "Direct bank transfer payment",
    configuration: {
      bank_accounts: [
        {
          bank_name: "Commercial Bank of Ethiopia",
          account_number: "1000123456789",
          account_name: "Addis Spare Parts Ltd",
        },
      ],
    },
    active: true,
    test_mode: false,
    supported_currencies: ["ETB"],
    transaction_fee: 0,
    created_at: "2023-01-15T10:00:00Z",
    updated_at: "2023-12-20T16:45:00Z",
  },
]

// Mock Notification Settings
export const mock_notification_settings: NotificationSettings[] = [
  {
    id: "notif_001",
    type: "email",
    event: "order_placed",
    template: "order_confirmation",
    recipients: "users",
    active: true,
    configuration: {
      subject: "Order Confirmation - #{order_number}",
      from_email: "orders@addisparts.com",
      from_name: "Addis Spare Parts",
    },
    created_at: "2023-01-15T10:00:00Z",
    updated_at: "2024-01-10T14:30:00Z",
  },
  {
    id: "notif_002",
    type: "sms",
    event: "order_shipped",
    template: "shipping_notification",
    recipients: "users",
    active: true,
    configuration: {
      message: "Your order #{order_number} has been shipped. Track: #{tracking_url}",
      sender_id: "AddisSpare",
    },
    created_at: "2023-01-15T10:00:00Z",
    updated_at: "2024-01-05T09:15:00Z",
  },
  {
    id: "notif_003",
    type: "email",
    event: "user_registered",
    template: "welcome_email",
    recipients: "users",
    active: true,
    configuration: {
      subject: "Welcome to Addis Spare Parts!",
      from_email: "welcome@addisparts.com",
      from_name: "Addis Spare Parts Team",
    },
    created_at: "2023-01-15T10:00:00Z",
    updated_at: "2023-12-15T11:45:00Z",
  },
]

// Helper functions
export function getPlatformSettings(): PlatformSettings {
  return {
    tax_rules: mock_tax_rules,
    delivery_zones: mock_delivery_zones,
    user_permissions: mock_user_permissions,
    user_roles: mock_user_roles,
    system_settings: mock_system_settings,
    payment_settings: mock_payment_settings,
    notification_settings: mock_notification_settings,
  }
}

export function getTaxRules(): TaxRule[] {
  return mock_tax_rules
}

export function getDeliveryZones(): DeliveryZone[] {
  return mock_delivery_zones
}

export function getUserPermissions(): UserPermission[] {
  return mock_user_permissions
}

export function getUserRoles(): UserRole[] {
  return mock_user_roles
}

export function getSystemSettings(): SystemSettings[] {
  return mock_system_settings
}

export function getPaymentSettings(): PaymentSettings[] {
  return mock_payment_settings
}

export function getNotificationSettings(): NotificationSettings[] {
  return mock_notification_settings
}

// Update functions (mock implementations)
export function updateTaxRule(id: string, updates: Partial<TaxRule>): boolean {
  const index = mock_tax_rules.findIndex((rule) => rule.id === id)
  if (index !== -1) {
    mock_tax_rules[index] = { ...mock_tax_rules[index], ...updates, updated_at: new Date().toISOString() }
    return true
  }
  return false
}

export function updateDeliveryZone(id: string, updates: Partial<DeliveryZone>): boolean {
  const index = mock_delivery_zones.findIndex((zone) => zone.id === id)
  if (index !== -1) {
    mock_delivery_zones[index] = { ...mock_delivery_zones[index], ...updates, updated_at: new Date().toISOString() }
    return true
  }
  return false
}

export function updateSystemSetting(id: string, value: string | number | boolean): boolean {
  const index = mock_system_settings.findIndex((setting) => setting.id === id)
  if (index !== -1) {
    mock_system_settings[index] = {
      ...mock_system_settings[index],
      value,
      updated_at: new Date().toISOString(),
    }
    return true
  }
  return false
}

export function updatePaymentSetting(id: string, updates: Partial<PaymentSettings>): boolean {
  const index = mock_payment_settings.findIndex((setting) => setting.id === id)
  if (index !== -1) {
    mock_payment_settings[index] = {
      ...mock_payment_settings[index],
      ...updates,
      updated_at: new Date().toISOString(),
    }
    return true
  }
  return false
}
