// src/mocks/preferences.ts
import type { UserPreferences } from '@/types/preferences';

export const MOCK_USER_PREFERENCES: Record<string, UserPreferences> = {
  'admin@example.com': {
    theme: 'dark',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      desktop: true
    },
    dashboard: {
      layout: 'advanced',
      widgets: ['analytics', 'users', 'reports']
    }
  },
  'user@example.com': {
    theme: 'light',
    language: 'en',
    notifications: {
      email: true,
      push: false,
      desktop: false
    },
    dashboard: {
      layout: 'standard',
      widgets: ['analytics', 'users', 'reports']
    }
  },
  'guest@example.com': {
    theme: 'light',
    language: 'en',
    notifications: {
      email: false,
      push: false,
      desktop: false
    },
    dashboard: {
      layout: 'basic',
      widgets: ['reports']
    }
  }
  // ... other preferences
};
