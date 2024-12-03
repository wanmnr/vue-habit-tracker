<!-- components/PermissionsPanel.vue -->
<template>
    <a-card title="User Permissions" :loading="loading">
        <template v-if="permissionsStore.isAdmin">
            <a-alert message="Administrator Access" description="You have full access to all resources" type="success"
                show-icon />
        </template>

        <template v-else>
            <a-collapse v-model:activeKey="activeKeys">
                <a-collapse-panel v-for="resource in Object.values(RESOURCES)" :key="resource"
                    :header="formatResourceName(resource)">
                    <a-descriptions bordered size="small">
                        <a-descriptions-item v-for="permission in Object.values(PERMISSIONS)" :key="permission"
                            :label="formatPermissionName(permission)" :span="3">
                            <a-tag :color="hasPermission(resource, permission) ? 'success' : 'error'">
                                {{ hasPermission(resource, permission) ? 'Granted' : 'Denied' }}
                            </a-tag>
                        </a-descriptions-item>
                    </a-descriptions>
                </a-collapse-panel>
            </a-collapse>
        </template>
    </a-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserFeatures } from '@/stores';
import { PERMISSIONS, RESOURCES } from '@/constants/permissions';

const { permissionsStore } = useUserFeatures();
const loading = ref(false);
const activeKeys = ref<string[]>([]);

const hasPermission = (resource: string, permission: string): boolean => {
    return permissionsStore.checkPermission(resource, permission);
};

const formatResourceName = (resource: string): string => {
    return resource.charAt(0).toUpperCase() + resource.slice(1);
};

const formatPermissionName = (permission: string): string => {
    return permission.charAt(0).toUpperCase() + permission.slice(1);
};
</script>