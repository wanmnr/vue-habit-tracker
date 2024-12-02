// src/types/user.ts
import { UserPreferences } from './preferences';
import { Permission } from './permissions';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'guest';
  preferences?: UserPreferences;
  permissions?: Permission[];
}
