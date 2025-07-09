export type NotificationChannel = "email" | "inApp" | "sms"

export type NotificationStatus = "pending" | "sent" | "failed"

export interface NotificationRelatedTo {
  entity: string
  id: string
}

export interface INotification {
  _id: string
  userId: string
  channel: NotificationChannel
  subject?: string
  message: string
  relatedTo?: NotificationRelatedTo
  status: NotificationStatus
  createdAt: string
  sentAt?: string
}



export interface INotificationCreateDto {
  userId: string
  channel: NotificationChannel
  subject?: string
  message: string
  relatedTo?: NotificationRelatedTo
  status: NotificationStatus
  createdAt: string
  sentAt?: string
}

export type INotificationUpdateDto = Partial<INotificationCreateDto>
