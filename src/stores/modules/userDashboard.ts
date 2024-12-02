// stores/modules/userDashboard.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { DashboardStats, Activity, UserDashboardData } from '@/types/dashboard';
import { mockApiDelay } from '@/mocks';
import { useAuthStore } from './auth';
import { useUserPreferencesStore } from './userPreferences';

export const useUserDashboardStore = defineStore('userDashboard', () => {
    const authStore = useAuthStore();
    const preferencesStore = useUserPreferencesStore();

    const dashboardData = ref<UserDashboardData | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // Getters
    const userStats = computed(() => dashboardData.value?.stats ?? null);

    const availableWidgets = computed(() => {
        const userRole = authStore.user?.role;
        if (!userRole) return [];

        const widgetsByRole = {
            admin: ['analytics', 'users', 'reports', 'settings', 'activities'],
            user: ['analytics', 'reports', 'activities'],
            guest: ['reports']
        };

        return widgetsByRole[userRole] ?? [];
    });

    const recentActivities = computed(() =>
        dashboardData.value?.recentActivity.slice(0, 5) ?? []
    );

    // Actions
    async function fetchDashboardData() {
        if (!authStore.isAuthenticated || !authStore.user) return;

        try {
            isLoading.value = true;
            error.value = null;

            await mockApiDelay();

            // Simulate fetching dashboard data
            const mockStats: DashboardStats = {
                lastLogin: new Date(),
                activeWidgets: preferencesStore.preferences.dashboard.widgets.length,
                notificationsCount: 0,
                recentActivities: []
            };

            const mockActivities: Activity[] = [
                {
                    id: '1',
                    type: 'login',
                    description: 'User logged in successfully',
                    timestamp: new Date()
                },
                // Add more mock activities as needed
            ];

            dashboardData.value = {
                ...authStore.user,
                stats: mockStats,
                recentActivity: mockActivities
            };

        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Failed to fetch dashboard data';
            throw error.value;
        } finally {
            isLoading.value = false;
        }
    }

    async function updateDashboardLayout(widgets: string[]) {
        if (!authStore.isAuthenticated) return;

        try {
            isLoading.value = true;

            await preferencesStore.updatePreferences({
                dashboard: {
                    ...preferencesStore.preferences.dashboard,
                    widgets
                }
            });

            await fetchDashboardData();
        } finally {
            isLoading.value = false;
        }
    }

    function getDashboardSummary() {
        // return {
        //     user: authStore.user,
        //     stats: userStats.value,
        //     availableWidgets: availableWidgets.value,
        //     currentLayout: preferencesStore.preferences.dashboard.layout,
        //     activeWidgets: preferencesStore.preferences.dashboard.widgets,
        //     recentActivities: recentActivities.value
        // };
        const user = authStore.user;
        return {
            user,
            fullName: user ? `${user.firstName} ${user.lastName}` : '',
            theme: preferencesStore.preferences.theme,
            isAdmin: user?.role === 'admin',
            notificationChannels: Object.entries(user?.preferences?.notifications ?? {})
                .filter(([_, enabled]) => enabled)
                .map(([channel]) => channel)
        };
    }

    return {
        dashboardData,
        isLoading,
        error,
        userStats,
        availableWidgets,
        recentActivities,
        fetchDashboardData,
        updateDashboardLayout,
        getDashboardSummary
    };
});