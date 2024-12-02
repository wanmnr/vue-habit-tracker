// constants/Permissions.ts
export const PERMISSIONS = {
    READ: 'read',
    WRITE: 'write',
    DELETE: 'delete',
    MANAGE: 'manage'
  } as const;
  
  export const RESOURCES = {
    USERS: 'users',
    POSTS: 'posts',
    SETTINGS: 'settings'
  } as const;