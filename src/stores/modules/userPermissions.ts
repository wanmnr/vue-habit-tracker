// stores/modules/userPermissions.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Permission } from '@/types/permissions';
import { MOCK_USER_PERMISSIONS, mockApiDelay } from '@/mocks';
import { useAuthStore } from './auth';

export const useUserPermissionsStore = defineStore('userPermissions', () => {
  const authStore = useAuthStore();

  const permissions = ref<Permission[]>([]);
  const isLoading = ref(false);

  // Getters
  const hasPermission = computed(() => {
    return (resource: string, action: string) => {
      const permission = permissions.value.find(p => p.resource === resource);
      return permission?.actions.includes(action) ?? false;
    };
  });

  const isAdmin = computed(() => {
    return authStore.user?.role === 'admin';
  });

  const resourcePermissions = computed(() => {
    return (resource: string) => {
      return permissions.value.find(p => p.resource === resource)?.actions ?? [];
    };
  });

  // Actions
  async function fetchPermissions() {

    if (!authStore.isAuthenticated || !authStore.user?.email) return;

    try {
      isLoading.value = true;

      await mockApiDelay();

      const userPermissions = MOCK_USER_PERMISSIONS[authStore.user.email];
      if (userPermissions) {
        permissions.value = userPermissions;
      }

      // const response = await fetch(`/api/users/${authStore.user?.id}/permissions`, {
      //   headers: {
      //     Authorization: `Bearer ${authStore.token}`,
      //   },
      // });
      // const data = await response.json();
      // permissions.value = data;
    } finally {
      isLoading.value = false;
    }
  }

  function checkPermission(resource: string, action: string): boolean {
    if (isAdmin.value) return true;
    return hasPermission.value(resource, action);
  }

  return {
    permissions,
    isLoading,
    hasPermission,
    isAdmin,
    resourcePermissions,
    fetchPermissions,
    checkPermission,
  };
});