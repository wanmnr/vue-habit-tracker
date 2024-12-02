// stores/index.ts
export { useAuthStore } from './modules/auth'
export { useUserPermissionsStore } from './modules/userPermissions'
export { useUserPreferencesStore } from './modules/userPreferences'
export { useNotificationsStore } from './modules/notifications'
export { useUserDashboardStore } from './modules/userDashboard'

// Re-export composables
export { useUserFeatures } from './composables/useUserFeatures'
