import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types/user';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const fullName = computed(() => {
    if (!user.value) return '';
    return `${user.value.firstName} ${user.value.lastName}`;
  });

  // Actions
  async function login(email: string, password: string) {
    try {
      isLoading.value = true;
      error.value = null;
      
      // Simulated API call
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      user.value = data.user;
      token.value = data.token;
      localStorage.setItem('token', data.token);
      
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed';
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  }

  async function checkAuth() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      token.value = savedToken;
      // Fetch user data
      await fetchUserData();
    }
  }

  async function fetchUserData() {
    if (!token.value) return;
    
    try {
      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      const data = await response.json();
      user.value = data;
    } catch (e) {
      logout();
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    fullName,
    login,
    logout,
    checkAuth,
    fetchUserData,
  };
});