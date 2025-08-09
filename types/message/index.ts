export interface IMessage {
  _id: string
  conversationId: string
  senderId: string
  recipientId: string
  body: string
  attachments?: string[]
  sentAt: string
  readAt?: string
}



export interface IMessageCreateDto {
  conversationId: string
  senderId: string
  recipientId: string
  body: string
  attachments?: string[]
  sentAt: string
  readAt?: string
}

export type IMessageUpdateDto = Partial<IMessageCreateDto>
