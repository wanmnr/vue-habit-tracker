<!-- components/DashboardHeader.vue -->
<template>
    <a-layout-header class="dashboard-header">
        <a-row type="flex" align="middle" justify="space-between">
            <!-- Left section: Logo and collapse trigger -->
            <a-col>
                <a-space>
                    <a-button type="text" class="trigger-button" aria-label="Toggle menu" @click="toggleSidebar">
                        <menu-unfold-outlined v-if="collapsed" />
                        <menu-fold-outlined v-else />
                    </a-button>

                    <router-link to="/" class="logo-wrapper">
                        <img src="@/assets/vue.svg" alt="Company Logo" class="header-logo" />
                    </router-link>
                </a-space>
            </a-col>

            <!-- Right section: Search, notifications, and user menu -->
            <a-col>
                <a-space size="large">
                    <!-- Global Search -->
                    <a-input-search v-model:value="searchQuery" placeholder="Search..." class="header-search"
                        @search="handleSearch" />

                    <!-- Notifications -->
                    <a-dropdown :trigger="['click']">
                        <a-badge :count="notificationCount">
                            <bell-outlined class="action-icon" aria-label="Notifications" />
                        </a-badge>
                        <template #overlay>
                            <NotificationsMenu />
                        </template>
                    </a-dropdown>

                    <!-- User Menu -->
                    <a-dropdown :trigger="['click']">
                        <a-space>
                            <a-avatar :src="userAvatar">
                                {{ userInitials }}
                            </a-avatar>
                            <span class="username">{{ userName }}</span>
                        </a-space>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="profile">
                                    <user-outlined />
                                    Profile
                                </a-menu-item>
                                <a-menu-item key="settings">
                                    <setting-outlined />
                                    Settings
                                </a-menu-item>
                                <a-menu-divider />
                                <a-menu-item key="logout" @click="handleLogout">
                                    <logout-outlined />
                                    Logout
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-space>
            </a-col>
        </a-row>
    </a-layout-header>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, useNotificationsStore } from '@/stores';
import NotificationsMenu from './NotificationsMenu.vue';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BellOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons-vue';

type Props = {
    collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    collapsed: false,
});

const emit = defineEmits<{
    'update:collapsed': [value: boolean]
}>();


const router = useRouter();
const userAuth = useAuthStore();
const notificationStore = useNotificationsStore();

// State
const searchQuery = ref('');

// Computed properties
const userName = computed(() => userAuth.fullName);

// This is hardcode AvatarUrl placeholder. replaced it after u had u had create stores userAuth.avatarUrl
// const userAvatar = computed(() => userAuth.avatarUrl); 
// const userAvatar = computed(() => 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp');
const userAvatar = computed(() => 'https://api.dicebear.com/7.x/avataaars/svg?seed=default');

const userInitials = computed(() =>
    userName.value
        .split(' ')
        .map((name: string) => name.charAt(0))
        .join('')
        .toUpperCase()
);
const notificationCount = computed(() =>
    notificationStore.unreadCount
);

// Methods
const toggleSidebar = () => {
    emit('update:collapsed', !props.collapsed);
};

const handleSearch = (value: string) => {
    // Implement search logic
    console.log('Searching for:', value);
};

const handleLogout = async () => {
    try {
        await userAuth.logout();
        router.push('/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
</script>

<style scoped>
.dashboard-header {
    padding: 0 24px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    z-index: 1;
}

.trigger-button {
    padding: 0 12px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
}

.logo-wrapper {
    display: inline-flex;
    align-items: center;
    height: 64px;
}

.header-logo {
    height: 32px;
    width: auto;
}

.header-search {
    width: 250px;
}

@media (max-width: 768px) {
    .header-search {
        width: 150px;
    }

    .username {
        display: none;
    }
}

.action-icon {
    padding: 0 12px;
    font-size: 18px;
    cursor: pointer;
}

:deep(.ant-layout-header) {
    line-height: 1;
}
</style>