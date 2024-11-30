<!-- components/DashboardSidebar.vue -->
<template>
    <a-layout-sider v-model:collapsed="collapsed" :theme="theme" :breakpoint="breakpoint" :collapsible="true"
        class="dashboard-sidebar" @breakpoint="handleBreakpoint">
        <div class="sidebar-logo" aria-label="Dashboard Logo">
            <img :src="collapsed ? logoSmall : logo" :alt="appName" />
        </div>

        <a-menu v-model:selectedKeys="selectedKeys" :theme="theme" mode="inline">
            <a-menu-item v-for="item in menuItems" :key="item.key">
                <template #icon>
                    <component :is="item.icon" />
                </template>
                <router-link :to="item.path">{{ item.label }}</router-link>
            </a-menu-item>
        </a-menu>

        <div class="sidebar-footer">
            <a-tooltip :title="collapsed ? 'Toggle expand' : 'Toggle collapse'" placement="right">
                <a-button type="text" :icon="collapsed ? expandIcon : collapseIcon" @click="toggleCollapse"
                    class="collapse-button" aria-label="Toggle sidebar" />
            </a-tooltip>
        </div>
    </a-layout-sider>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import {
    DashboardOutlined,
    UserOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons-vue';

// Constants
const SIDEBAR_CONFIG = {
    breakpoint: 'lg',
    theme: 'dark',
    appName: 'Dashboard',
    logo: '/path-to-logo.svg',
    logoSmall: '/path-to-small-logo.svg',
} as const;

// State
const collapsed = ref(false);
const route = useRoute();

// Computed
const selectedKeys = computed(() => [route.name as string]);
const theme = computed(() => SIDEBAR_CONFIG.theme);
const breakpoint = computed(() => SIDEBAR_CONFIG.breakpoint);
const expandIcon = computed(() => MenuUnfoldOutlined);
const collapseIcon = computed(() => MenuFoldOutlined);
const { appName, logo, logoSmall } = SIDEBAR_CONFIG;

// Menu items configuration
const menuItems = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
        icon: DashboardOutlined,
    },
    {
        key: 'profile',
        label: 'Profile',
        path: '/dashboard/profile',
        icon: UserOutlined,
    },
    {
        key: 'settings',
        label: 'Settings',
        path: '/dashboard/settings',
        icon: SettingOutlined,
    },
];

// Methods
const toggleCollapse = () => {
    collapsed.value = !collapsed.value;
};

const handleBreakpoint = (broken: boolean) => {
    if (broken) {
        collapsed.value = true;
    }
};
</script>

<style scoped>
.dashboard-sidebar {
    position: relative;
    height: 100vh;
}

.sidebar-logo {
    height: 64px;
    padding: 16px;
    text-align: center;
    overflow: hidden;
}

.sidebar-logo img {
    height: 32px;
    width: auto;
}

.sidebar-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 16px;
    text-align: center;
}

.collapse-button {
    color: rgba(255, 255, 255, 0.65);
}

.collapse-button:hover {
    color: #fff;
}

/* Enhance touch targets for mobile */
@media (max-width: 768px) {
    :deep(.ant-menu-item) {
        height: 48px;
        line-height: 48px;
    }
}

/* Improve focus visibility for accessibility */
:deep(.ant-menu-item:focus-visible),
.collapse-button:focus-visible {
    outline: 2px solid #1890ff;
    outline-offset: -2px;
}
</style>