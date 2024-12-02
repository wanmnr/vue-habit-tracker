// stores/modules/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types/user';
import { MOCK_USERS, mockApiDelay } from '@/mocks';

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
    isLoading.value = true;
    error.value = null;

    try {

      // Simulated API call
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      // });

      // const data = await response.json();

      // user.value = data.user;
      // token.value = data.token;
      // localStorage.setItem('token', data.token);

      // Simulate API delay
      await mockApiDelay();

      // Find matching user
      const matchedUser = MOCK_USERS.find(u =>
        u.email === email && u.password === password
      );

      if (!matchedUser) {
        throw new Error('Invalid email or password');
      }

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = matchedUser;

      // Set user and generate mock token
      user.value = userWithoutPassword;
      token.value = `mock_token_${Date.now()}`;

      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user.value));
      localStorage.setItem('token', token.value);

    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed';
      throw error.value;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    clearAuth();
  }

  function clearAuth() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  async function checkAuth() {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
      // Fetch user data
      // await fetchUserData();
    }
  }

  // async function fetchUserData() {
  //   if (!token.value) return;

  //   try {
  //     const response = await fetch('/api/user', {
  //       headers: {
  //         Authorization: `Bearer ${token.value}`,
  //       },
  //     });
  //     const data = await response.json();
  //     user.value = data;
  //   } catch (e) {
  //     logout();
  //   }
  // }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    fullName,
    login,
    logout,
    clearAuth,
    checkAuth,
    // fetchUserData,
  };
});