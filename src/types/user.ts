export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user' | 'guest';
  }
  
  export interface UserPreferences {
    theme: 'light' | 'dark';
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      desktop: boolean;
    };
  }
  
  export interface UserPermission {
    resource: string;
    actions: string[];
  }