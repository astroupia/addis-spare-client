// types/message.ts


export interface Seller {
  id: string
  name: string
  email: string
  phone: string
  profileImage: string
  business_name: string
  rating: {
    average: number
    count: number
  }
  response_time: string
  verified: boolean
  created_at: string
}


export interface ProductMessage {
  id: string
  title: string
  description: string
  price: string
  image: string
  seller: Seller
  postedAt: string
}
