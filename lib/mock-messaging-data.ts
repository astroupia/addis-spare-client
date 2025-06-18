import type { Conversation, Message, MessageListResponse, Seller, InquiryData } from "../types/message"

// Mock sellers data
const mock_sellers: Seller[] = [
  {
    id: "seller_1",
    name: "John Smith",
    email: "john@autoparts.com",
    phone: "+1-555-0123",
    avatar_url: "/placeholder.png?height=100&width=100",
    business_name: "AutoParts Pro",
    rating: { average: 4.8, count: 156 },
    response_time: "Usually responds within 2 hours",
    verified: true,
    created_at: "2023-01-15T08:30:00Z",
  },
  {
    id: "seller_2",
    name: "Sarah Johnson",
    email: "sarah@quickparts.com",
    business_name: "Quick Parts Supply",
    rating: { average: 4.6, count: 89 },
    response_time: "Usually responds within 4 hours",
    verified: true,
    created_at: "2023-02-10T10:45:00Z",
  },
]

// Mock conversations data
export const mock_conversations: Conversation[] = [
  {
    id: "conv_1",
    user_id: "user_123",
    seller_id: "seller_1",
    product_id: "1",
    subject: "Vehicle Compatibility - Brake Pad Set - Premium",
    status: "active",
    unread_count: 2,
    created_at: "2023-06-15T10:30:00Z",
    updated_at: "2023-06-16T14:20:00Z",
    seller: mock_sellers[0],
    product: {
      id: "1",
      name: "Brake Pad Set - Premium",
      image_url: "/placeholder.png?height=300&width=500",
      price: 49.99,
    },
    last_message: {
      id: "msg_3",
      conversation_id: "conv_1",
      sender_id: "seller_1",
      sender_type: "seller",
      content: "Yes, these brake pads are compatible with your 2020 Toyota Camry. They come with a lifetime warranty.",
      message_type: "text",
      created_at: "2023-06-16T14:20:00Z",
      updated_at: "2023-06-16T14:20:00Z",
    },
  },
  {
    id: "conv_2",
    user_id: "user_123",
    seller_id: "seller_2",
    product_id: "2",
    subject: "Shipping Options - Oil Filter - Standard",
    status: "active",
    unread_count: 0,
    created_at: "2023-06-14T09:15:00Z",
    updated_at: "2023-06-15T11:45:00Z",
    seller: mock_sellers[1],
    product: {
      id: "2",
      name: "Oil Filter - Standard",
      image_url: "/placeholder.png?height=300&width=500",
      price: 12.99,
    },
    last_message: {
      id: "msg_6",
      conversation_id: "conv_2",
      sender_id: "user_123",
      sender_type: "user",
      content: "Perfect, I'll place the order. Thank you for the quick response!",
      message_type: "text",
      created_at: "2023-06-15T11:45:00Z",
      updated_at: "2023-06-15T11:45:00Z",
    },
  },
]

// Mock messages data
export const mock_messages: Record<string, Message[]> = {
  conv_1: [
    {
      id: "msg_1",
      conversation_id: "conv_1",
      sender_id: "user_123",
      sender_type: "user",
      content:
        "Hi, I'm interested in these brake pads for my 2020 Toyota Camry. Can you confirm if they're compatible?",
      message_type: "inquiry",
      created_at: "2023-06-15T10:30:00Z", 
      updated_at: "2023-06-15T10:30:00Z",
      read_at: "2023-06-15T11:00:00Z",
    },
    {
      id: "msg_2",
      conversation_id: "conv_1",
      sender_id: "seller_1",
      sender_type: "seller",
      content: "Hello! Thank you for your inquiry. Let me check the compatibility for your 2020 Toyota Camry.",
      message_type: "text",
      created_at: "2023-06-15T11:15:00Z",
      updated_at: "2023-06-15T11:15:00Z",
      read_at: "2023-06-15T12:00:00Z",
    },
    {
      id: "msg_3",
      conversation_id: "conv_1",
      sender_id: "seller_1",
      sender_type: "seller",
      content: "Yes, these brake pads are compatible with your 2020 Toyota Camry. They come with a lifetime warranty.",
      message_type: "text",
      created_at: "2023-06-16T14:20:00Z",
      updated_at: "2023-06-16T14:20:00Z",
    },
  ],
  conv_2: [
    {
      id: "msg_4",
      conversation_id: "conv_2",
      sender_id: "user_123",
      sender_type: "user",
      content: "What are the shipping options for this oil filter? I need it by next week.",
      message_type: "inquiry",
      created_at: "2023-06-14T09:15:00Z",
      updated_at: "2023-06-14T09:15:00Z",
      read_at: "2023-06-14T10:00:00Z",
    },
    {
      id: "msg_5",
      conversation_id: "conv_2",
      sender_id: "seller_2",
      sender_type: "seller",
      content:
        "We offer standard shipping (5-7 days, $5.99) and express shipping (2-3 days, $12.99). Both should get it to you in time!",
      message_type: "text",
      created_at: "2023-06-14T10:30:00Z",
      updated_at: "2023-06-14T10:30:00Z",
      read_at: "2023-06-14T11:00:00Z",
    },
    {
      id: "msg_6",
      conversation_id: "conv_2",
      sender_id: "user_123",
      sender_type: "user",
      content: "Perfect, I'll place the order. Thank you for the quick response!",
      message_type: "text",
      created_at: "2023-06-15T11:45:00Z",
      updated_at: "2023-06-15T11:45:00Z",
      read_at: "2023-06-15T12:00:00Z",
    },
  ],
}

export async function getMockConversations(user_id: string): Promise<Conversation[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mock_conversations.filter((conv) => conv.user_id === user_id)
}

export async function getMockMessages(conversation_id: string): Promise<MessageListResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const conversation = mock_conversations.find((conv) => conv.id === conversation_id)
  const messages = mock_messages[conversation_id] || []

  if (!conversation) {
    throw new Error("Conversation not found")
  }

  return {
    messages,
    conversation,
    total: messages.length,
    page: 1,
    limit: 50,
  }
}

export async function createMockConversation(inquiry_data: InquiryData): Promise<Conversation> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const seller = mock_sellers.find((s) => s.id === inquiry_data.seller_id)
  if (!seller) {
    throw new Error("Seller not found")
  }

  const new_conversation: Conversation = {
    id: `conv_${Date.now()}`,
    user_id: "user_123", // In real app, get from auth
    seller_id: inquiry_data.seller_id,
    product_id: inquiry_data.product_id,
    subject: inquiry_data.subject,
    status: "active",
    unread_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    seller,
  }

  // Add to mock data
  mock_conversations.push(new_conversation)

  // Create initial message
  const initial_message: Message = {
    id: `msg_${Date.now()}`,
    conversation_id: new_conversation.id,
    sender_id: "user_123",
    sender_type: "user",
    content: inquiry_data.message,
    message_type: "inquiry",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mock_messages[new_conversation.id] = [initial_message]

  return new_conversation
}

export async function createMockMessage(message_data: {
  conversation_id: string
  sender_id: string
  sender_type: "user" | "seller"
  content: string
}): Promise<Message> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const new_message: Message = {
    id: `msg_${Date.now()}`,
    conversation_id: message_data.conversation_id,
    sender_id: message_data.sender_id,
    sender_type: message_data.sender_type,
    content: message_data.content,
    message_type: "text",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  // Add to mock messages
  if (!mock_messages[message_data.conversation_id]) {
    mock_messages[message_data.conversation_id] = []
  }
  mock_messages[message_data.conversation_id].push(new_message)

  return new_message
}
