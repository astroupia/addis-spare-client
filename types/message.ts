// types/message.ts


export interface Seller {
  id: string
  name: string
  email: string
  phone?: string
  avatar_url?: string
  business_name: string
  rating: {
    average: number
    count: number
  }
  response_time: string // e.g., "Usually responds within 2 hours"
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

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  sender_type: "user" | "seller"
  content: string
  message_type?: "text" | "inquiry" | "system"
  attachments?: MessageAttachment[]
  read_at?: string
  created_at: string
  updated_at?: string
}

export interface MessageAttachment {
  id: string
  file_name: string
  file_url: string
  file_type: string
  file_size: number
}

export interface Conversation {
  id: string
  user_id: string
  seller_id: string
  product_id?: string
  subject: string
  status: "active" | "closed" | "pending"
  last_message?: Message
  unread_count: number
  created_at: string
  updated_at: string
  seller: Seller
  product?: {
    id: string
    name: string
    image_url: string
    price: number
  }
}

export interface InquiryData {
  product_id: string
  seller_id: string
  subject: string
  message: string
  inquiry_type: "compatibility" | "shipping" | "pricing" | "availability" | "general"
  user_vehicle?: {
    make: string
    model: string
    year: number
  }
}

export interface ConversationListResponse {
  conversations: Conversation[]
  total: number
  page: number
  limit: number
}

export interface MessageListResponse {
  messages: Message[]
  conversation: Conversation
  total: number
  page: number
  limit: number
}
