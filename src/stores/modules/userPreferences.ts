import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserPreferences } from '@/types/user';
import { useAuthStore } from './auth';

export const useUserPreferencesStore = defineStore('userPreferences', () => {
  const authStore = useAuthStore();
  
  const preferences = ref<UserPreferences>({
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      desktop: false,
    },
  });

  const isLoading = ref(false);

  // Getters
  const currentTheme = computed(() => preferences.value.theme);
  const notificationChannels = computed(() => {
    return Object.entries(preferences.value.notifications)
      .filter(([, enabled]) => enabled)
      .map(([channel]) => channel);
  });

  // Actions
  async function fetchPreferences() {
    if (!authStore.isAuthenticated) return;
    
    try {
      isLoading.value = true;
      const response = await fetch(`/api/users/${authStore.user?.id}/preferences`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      const data = await response.json();
      preferences.value = data;
    } finally {
      isLoading.value = false;
    }
  }

  async function updatePreferences(newPreferences: Partial<UserPreferences>) {
    try {
      isLoading.value = true;
      const response = await fetch(`/api/users/${authStore.user?.id}/preferences`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: JSON.stringify(newPreferences),
      });
      
      const data = await response.json();
      preferences.value = { ...preferences.value, ...data };
    } finally {
      isLoading.value = false;
    }
  }

  return {
    preferences,
    isLoading,
    currentTheme,
    notificationChannels,
    fetchPreferences,
    updatePreferences,
  };
});