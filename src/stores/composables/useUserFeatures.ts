// stores/composables/useUserFeatures.ts
import { useAuthStore } from '../modules/auth';
import { useUserPreferencesStore } from '../modules/userPreferences';
import { useUserPermissionsStore } from '../modules/userPermissions';
import { PERMISSIONS, RESOURCES } from '@/constants/permissions';

export function useUserFeatures() {
  const authStore = useAuthStore();
  const preferencesStore = useUserPreferencesStore();
  const permissionsStore = useUserPermissionsStore();

  async function initializeUserFeatures() {
    await authStore.checkAuth();
    
    if (authStore.isAuthenticated) {
      await Promise.all([
        preferencesStore.fetchPreferences(),
        permissionsStore.fetchPermissions(),
      ]);
    }
  }

  async function updateUserTheme(theme: 'light' | 'dark') {
    if (!permissionsStore.checkPermission(RESOURCES.SETTINGS, PERMISSIONS.WRITE)) {
      throw new Error('Insufficient permissions');
    }
    
    await preferencesStore.updatePreferences({ theme });
  }

  function getUserSummary() {
    return {
      user: authStore.user,
      fullName: authStore.fullName,
      theme: preferencesStore.currentTheme,
      isAdmin: permissionsStore.isAdmin,
      notificationChannels: preferencesStore.notificationChannels,
    };
  }

  return {
    initializeUserFeatures,
    updateUserTheme,
    getUserSummary,
    
    // Expose original stores for direct access if needed
    authStore,
    preferencesStore,
    permissionsStore,
  };
}