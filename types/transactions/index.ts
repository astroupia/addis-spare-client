export type TransactionType = "authorization" | "capture" | "refund" | "void"

export type TransactionStatus = "success" | "failed" | "pending"

export interface ITransaction {
  _id: string
  orderId: string
  type: TransactionType
  gatewayId: string
  amount: number
  currency: string 
  status: TransactionStatus
  response?: Record<string, any>
  processedAt: string 
}


export interface ITransactionCreateDto {
  orderId: string
  type: TransactionType
  gatewayId: string
  amount: number
  currency: string
  status: TransactionStatus
  response?: Record<string, any>
  processedAt: string
}

export type ITransactionUpdateDto = Partial<ITransactionCreateDto>
