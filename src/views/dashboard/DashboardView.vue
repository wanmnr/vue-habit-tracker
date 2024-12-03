<!-- views/dashboard/DashboardView.vue -->
<template>
    <a-layout class="dashboard-layout">
        <DashboardHeader />

        <a-layout>
            <DashboardSidebar />

            <a-layout-content class="dashboard-content">
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <UserSummaryCard :summary="dashboardSummary" />
                    </a-col>

                    <a-col :xs="24" :lg="12">
                        <PreferencesPanel />
                    </a-col>

                    <a-col :xs="24" :lg="12">
                        <PermissionsPanel />
                    </a-col>

                    <a-col :span="24">
                        <DashboardWidgetsGrid />
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useUserDashboardStore } from '@/stores/modules/userDashboard';
import { useUserFeatures } from '@/stores/composables/useUserFeatures';
import DashboardHeader from './components/DashboardHeader.vue';
import DashboardSidebar from './components/DashboardSidebar.vue';
import UserSummaryCard from './components/UserSummaryCard.vue';
import PreferencesPanel from './components/PreferencesPanel.vue';
import PermissionsPanel from './components/PermissionsPanel.vue';

const userDashboardStore = useUserDashboardStore();
const { initializeUserFeatures } = useUserFeatures();

const dashboardSummary = ref(userDashboardStore.getDashboardSummary());

onMounted(async () => {
    await initializeUserFeatures();
    await userDashboardStore.fetchDashboardData();
    dashboardSummary.value = userDashboardStore.getDashboardSummary();
});
</script>

<style scoped>
.dashboard-layout {
    min-height: 100vh;
}

.dashboard-content {
    padding: 24px;
    background: #fff;
}
</style>