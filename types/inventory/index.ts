export interface IInventory {
  _id: string
  productId: string
  location: string
  quantity: number
  reorderThreshold: number
  supplierId: string
  lastUpdated: string 
}

export interface IInventoryCreateDto {
  productId: string
  location: string
  quantity: number
  reorderThreshold: number
  supplierId: string
  lastUpdated: string
}

export type IInventoryUpdateDto = Partial<IInventoryCreateDto>
