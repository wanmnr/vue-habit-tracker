<!-- components/NotificationsMenu.vue -->
<template>
    <a-menu class="notifications-menu">
        <div class="notification-header">
            <a-row justify="space-between" align="middle">
                <a-col>
                    <a-typography-title :level="5" :style="{ margin: 0 }">
                        Notifications
                    </a-typography-title>
                </a-col>
                <a-col>
                    <a-button type="link" @click="markAllAsRead" :disabled="!hasUnreadNotifications">
                        Mark all as read
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <a-spin :spinning="loading">
            <template v-if="notifications.length">
                <a-menu-item v-for="notification in notifications" :key="notification.id" class="notification-item">
                    <router-link :to="notification.link" @click="handleNotificationClick(notification)">
                        <a-row :gutter="[16, 0]" align="middle">
                            <a-col flex="none">
                                <a-badge :status="getNotificationStatus(notification)">
                                    <a-avatar :icon="getNotificationIcon(notification)"
                                        :style="{ backgroundColor: getNotificationColor(notification) }" />
                                </a-badge>
                            </a-col>
                            <a-col flex="auto">
                                <div>
                                    <a-typography-text :strong="!notification.read">
                                        {{ notification.title }}
                                    </a-typography-text>
                                    <a-typography-paragraph type="secondary"
                                        :style="{ margin: '4px 0 0', fontSize: '12px' }" ellipsis>
                                        {{ notification.message }}
                                    </a-typography-paragraph>
                                    <a-typography-text type="secondary" :style="{ fontSize: '12px' }">
                                        {{ formatTimestamp(notification.timestamp) }}
                                    </a-typography-text>
                                </div>
                            </a-col>
                        </a-row>
                    </router-link>
                </a-menu-item>
            </template>

            <a-empty v-else description="No notifications" :style="{ padding: '24px' }" />
        </a-spin>

        <a-menu-divider />

        <a-menu-item class="view-all-link">
            <router-link to="/notifications">
                View all notifications
            </router-link>
        </a-menu-item>
    </a-menu>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useNotificationsStore } from '@/stores';
import { formatDistanceToNow } from 'date-fns';
import {
    CheckCircleOutlined,
    WarningOutlined,
    InfoCircleOutlined,
    BellOutlined
} from '@ant-design/icons-vue';
import type { Component } from 'vue';
import type { NotificationType, Notification } from '@/types/notifications';

const notificationStore = useNotificationsStore();
const loading = ref(false);

const notifications = computed(() => notificationStore.recentNotifications);
const hasUnreadNotifications = computed(() => notifications.value.some(n => !n.read));

const getNotificationIcon = (notification: Notification): Component => {
    const icons: Record<NotificationType, Component> = {
        success: CheckCircleOutlined,
        warning: WarningOutlined,
        info: InfoCircleOutlined,
        default: BellOutlined
    };
    return icons[notification.type] || icons.default;
};

const getNotificationColor = (notification: Notification): string => {
    const colors: Record<NotificationType, string> = {
        success: '#52c41a',
        warning: '#faad14',
        info: '#1890ff',
        default: '#8c8c8c'
    };
    return colors[notification.type] || colors.default;
};

const getNotificationStatus = (notification: Notification): 'default' | 'processing' => {
    return notification.read ? 'default' : 'processing';
};

const formatTimestamp = (timestamp: Date): string => {
    return formatDistanceToNow(timestamp, { addSuffix: true });
};

const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
        await notificationStore.markAsRead(notification.id);
    }
};

const markAllAsRead = async () => {
    loading.value = true;
    try {
        await notificationStore.markAllAsRead();
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.notifications-menu {
    width: 360px;
}

.notification-header {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
}

.notification-item {
    padding: 12px 16px !important;
    height: auto !important;
    line-height: 1.5715;
}

.notification-item :deep(a) {
    color: inherit;
}

.view-all-link {
    text-align: center;
}

@media (max-width: 480px) {
    .notifications-menu {
        width: 300px;
    }
}
</style>