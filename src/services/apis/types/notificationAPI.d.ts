import { LogsQueryParams } from './logAPI.type';

export interface Notification {
  id: number
  imageUrl: string
  message: string
  type: string
  createdAt: string
  isRead: boolean
}

export type NotificationResponse = Notification[]