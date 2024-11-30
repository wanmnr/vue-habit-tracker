import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserPermission } from '@/types/user';
import { useAuthStore } from './auth';

export const useUserPermissionsStore = defineStore('userPermissions', () => {
  const authStore = useAuthStore();
  
  const permissions = ref<UserPermission[]>([]);
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
    if (!authStore.isAuthenticated) return;
    
    try {
      isLoading.value = true;
      const response = await fetch(`/api/users/${authStore.user?.id}/permissions`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      const data = await response.json();
      permissions.value = data;
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