// @/types/notifications.ts

import type { RouteLocationRaw } from 'vue-router'

export type NotificationType = 'success' | 'warning' | 'info' | 'default'

export interface Notification {
    id: string
    title: string
    message: string
    type: NotificationType
    read: boolean // Remove optional
    timestamp: Date // Remove optional
    link: RouteLocationRaw // Change to RouterLocationRaw and remove optional
}