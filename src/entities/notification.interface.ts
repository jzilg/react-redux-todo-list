type NotificationType = 'success' | 'warning' | 'error'
export type NotificationId = number

export default interface Notification {
    id: NotificationId
    type: NotificationType
    message: string
    duration?: number
}