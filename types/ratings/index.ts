export interface IRating {
  _id: string
  productId: string
  userId: string
  score: number 
  createdAt: string 
  updatedAt?: string 
}



export interface IRatingCreateDto {
  productId: string
  userId: string
  score: number
  createdAt: string
  updatedAt?: string
}

export type IRatingUpdateDto = Partial<IRatingCreateDto>
