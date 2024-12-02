// src/mocks/users.ts
import type { User } from '@/types/user';
import { MOCK_USER_PREFERENCES } from './preferences';
import { MOCK_USER_PERMISSIONS } from './permissions';

interface MockUser extends User {
  password: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    preferences: MOCK_USER_PREFERENCES['admin@example.com'],
    permissions: MOCK_USER_PERMISSIONS['admin@example.com']
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    preferences: MOCK_USER_PREFERENCES['user@example.com'],
    permissions: MOCK_USER_PERMISSIONS['user@example.com']
  },
  {
    id: '3',
    email: 'guest@example.com',
    password: 'guest123',
    firstName: 'Guest',
    lastName: 'User',
    role: 'guest',
    preferences: MOCK_USER_PREFERENCES['guest@example.com'],
    permissions: MOCK_USER_PERMISSIONS['guest@example.com']
  }
];