export interface IReview {
  _id: string
  productId: string
  userId: string
  title?: string
  body: string
  createdAt: string 
  updatedAt?: string 
}


export interface IReviewCreateDto {
  productId: string
  userId: string
  title?: string
  body: string
  createdAt: string
  updatedAt?: string
}

export type IReviewUpdateDto = Partial<IReviewCreateDto>
