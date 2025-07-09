export interface CartItem {
  productId: string
  quantity: number
  price: number
  compatibilityNote?: string
  addedAt: string 
}

export interface ICart {
  _id: string
  userId: string 
  sessionId: string
  items: CartItem[]
  couponCode: string
  discountAmount: number
  createdAt: string
  updatedAt: string
  expiresAt: string
}

export interface ICartCreateDto {
  _id: string
  userId?: string 
  sessionId?: string
  items: CartItem[]
  couponCode: string
  discountAmount: number
  createdAt: string
  updatedAt: string
  expiresAt: string
}

export type ICartUpdateDto = Partial<ICartCreateDto>


