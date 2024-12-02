// src/mocks/permissions.ts
import type { Permission } from '@/types/permissions';

export const MOCK_USER_PERMISSIONS: Record<string, Permission[]> = {
  'admin@example.com': [
    { resource: 'settings', actions: ['read', 'write'] },
    { resource: 'users', actions: ['read', 'write', 'delete'] },
    { resource: 'reports', actions: ['read', 'write', 'delete', 'export'] }
  ],
  'user@example.com': [
    { resource: 'settings', actions: ['read'] },
    { resource: 'users', actions: ['read'] },
    { resource: 'reports', actions: ['read', 'export'] }
  ],
  'guest@example.com': [
    { resource: 'settings', actions: ['read'] },
    { resource: 'reports', actions: ['read'] }
  ]
};