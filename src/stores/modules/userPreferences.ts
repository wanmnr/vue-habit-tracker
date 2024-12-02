// stores/modules/userPreferences.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserPreferences } from '@/types/preferences';
import { MOCK_USER_PREFERENCES, mockApiDelay } from '@/mocks';
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
    dashboard: {
      layout: 'basic',
      widgets: []
    }
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
    if (!authStore.isAuthenticated || !authStore.user?.email) return;

    try {
      isLoading.value = true;

      await mockApiDelay();
      
      const userPreferences = MOCK_USER_PREFERENCES[authStore.user.email];
      if (userPreferences) {
        preferences.value = userPreferences;
      }

      // const response = await fetch(`/api/users/${authStore.user?.id}/preferences`, {
      //   headers: {
      //     Authorization: `Bearer ${authStore.token}`,
      //   },
      // });
      // const data = await response.json();
      // preferences.value = data;
    } finally {
      isLoading.value = false;
    }
  }

  async function updatePreferences(newPreferences: Partial<UserPreferences>) {
    try {
      isLoading.value = true;

      await mockApiDelay();
      
      preferences.value = {
        ...preferences.value,
        ...newPreferences
      };

      // const response = await fetch(`/api/users/${authStore.user?.id}/preferences`, {
      //   method: 'PATCH',
      //   headers: {
      //     Authorization: `Bearer ${authStore.token}`,
      //   },
      //   body: JSON.stringify(newPreferences),
      // });

      // const data = await response.json();
      // preferences.value = { ...preferences.value, ...data };
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