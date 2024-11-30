<!-- views/dashboard/DashboardView.vue -->
<template>
    <a-layout class="dashboard-layout">
        <DashboardHeader />

        <a-layout>
            <DashboardSidebar />

            <a-layout-content class="dashboard-content">
                <a-row :gutter="[16, 16]">
                    <a-col :span="24">
                        <UserSummaryCard :summary="userSummary" />
                    </a-col>

                    <a-col :xs="24" :lg="12">
                        <PreferencesPanel />
                    </a-col>

                    <a-col :xs="24" :lg="12">
                        <PermissionsPanel />
                    </a-col>
                </a-row>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useUserFeatures } from '@/stores';
import DashboardHeader from './components/DashboardHeader.vue';
import DashboardSidebar from './components/DashboardSidebar.vue';
import UserSummaryCard from './components/UserSummaryCard.vue';
import PreferencesPanel from './components/PreferencesPanel.vue';
import PermissionsPanel from './components/PermissionsPanel.vue';

const { getUserSummary } = useUserFeatures();
const userSummary = ref(getUserSummary());

onMounted(() => {
    // Refresh summary periodically or on relevant events
    userSummary.value = getUserSummary();
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