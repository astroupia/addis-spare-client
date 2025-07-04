export type OrderStatus = "pending" | "paid" | "shipped" | "delivered" | "cancelled"

export interface OrderItem {
  productId: string
  sku: string
  name: string
  quantity: number
  unitPrice: number
}

export interface Discount {
  code: string
  amount: number
}

export interface IOrder {
  _id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shippingFee: number
  discounts?: Discount[]
  total: number
  status: OrderStatus
  placedAt: string
  updatedAt: string
}



export interface IOrderCreateDto {
  userId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shippingFee: number
  discounts?: Discount[]
  total: number
  status: OrderStatus
  placedAt: string
  updatedAt: string
}

export type IOrderUpdateDto = Partial<IOrderCreateDto>
