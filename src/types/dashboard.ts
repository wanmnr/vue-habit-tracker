// src/types/dashboard.ts

import { User } from "./user";

export interface DashboardStats {
    lastLogin: Date;
    activeWidgets: number;
    notificationsCount: number;
    recentActivities: Activity[];
}

export interface Activity {
    id: string;
    type: 'login' | 'settings_change' | 'permission_change';
    description: string;
    timestamp: Date;
}

export interface UserDashboardData extends User {
    stats: DashboardStats;
    recentActivity: Activity[];
}