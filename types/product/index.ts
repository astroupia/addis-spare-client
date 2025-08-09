export interface CompatibilityEntry {
  make: string
  model: string
  year: number
}

export interface IProduct {
  _id: string 
  sku: string
  name: string
  description?: string
  brand?: string
  category: string
  price: number
  images?: string[] 
  attributes?: Record<string, string>
  compatibility: CompatibilityEntry[]
  tags?: string[]
  stockControlled: boolean
  createdBy: string 
  createdAt: string 
  updatedAt: string 
}


export interface IProductCreateDto {
  sku: string
  name: string
  description?: string
  brand?: string
  category: string
  price: number
  images?: string[]
  attributes?: Record<string, string>
  compatibility: CompatibilityEntry[]
  tags?: string[]
  stockControlled: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type IProductUpdateDto = Partial<IProductCreateDto>
