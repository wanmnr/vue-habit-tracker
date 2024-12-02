// src/types/preferences.ts
export interface NotificationPreferences {
    email: boolean;
    push: boolean;
    desktop: boolean;
}

export interface DashboardPreferences {
    layout: 'basic' | 'standard' | 'advanced';
    widgets: string[];
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    language: string;
    notifications: NotificationPreferences;
    dashboard: DashboardPreferences;
}