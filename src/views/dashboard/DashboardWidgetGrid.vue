<template>
    <a-card title="Dashboard Widgets">
        <template v-if="isLoading">
            <a-spin>Loading dashboard widgets...</a-spin>
        </template>
        <template v-else-if="error">
            <a-alert type="error" :message="error" />
        </template>
        <template v-else>
            <a-row :gutter="[16, 16]">
                <a-col v-for="widget in availableWidgets" :key="widget" :xs="24" :md="12" :lg="8">
                    <WidgetComponent :type="widget" />
                </a-col>
            </a-row>
        </template>
    </a-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserDashboardStore } from '@/stores/modules/userDashboard';
import { useUserPreferencesStore } from '@/stores/modules/userPreferences';
import WidgetComponent from './WidgetComponent.vue'; // You'll need to create this

const userDashboardStore = useUserDashboardStore();
const preferencesStore = useUserPreferencesStore();

const availableWidgets = computed(() => userDashboardStore.availableWidgets);
const isLoading = computed(() => userDashboardStore.isLoading);
const error = computed(() => userDashboardStore.error);
</script>