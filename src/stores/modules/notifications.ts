// stores/modules/notifications.ts
import { defineStore } from 'pinia'
import type { Notification } from '@/types/notifications'

interface NotificationsState {
    notifications: Notification[]
}

export const useNotificationsStore = defineStore('notifications', {
    state: (): NotificationsState => ({
        notifications: []
    }),

    getters: {
        unreadCount(): number {
            return this.notifications.filter(n => !n.read).length
        },

        allNotifications(): Notification[] {
            return this.notifications.sort((a, b) => {
                return (b.timestamp?.getTime() ?? 0) - (a.timestamp?.getTime() ?? 0)
            })
        },

        recentNotifications(): Notification[] {
            return this.allNotifications.slice(0, 5) // Show last 5 notifications
        }
    },

    actions: {
        addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
            this.notifications.push({
                ...notification,
                id: crypto.randomUUID(),
                timestamp: new Date(),
                read: false,
                link: notification.link || '/notifications'
            })
        },

        markAsRead(id: string) {
            const notification = this.notifications.find(n => n.id === id)
            if (notification) {
                notification.read = true
            }
        },

        async markAllAsRead() {
            this.notifications.forEach(notification => {
                notification.read = true
            })
        },

        removeNotification(id: string) {
            this.notifications = this.notifications.filter(n => n.id !== id)
        },

        clearAll() {
            this.notifications = []
        }
    }
})