<template>
    <a-card :title="widgetTitle">
        <template v-if="widgetType === 'analytics'">
            <AnalyticsWidget />
        </template>
        <template v-else-if="widgetType === 'users'">
            <UsersWidget />
        </template>
        <template v-else-if="widgetType === 'reports'">
            <ReportsWidget />
        </template>
        <template v-else>
            <a-typography-text type="secondary">
                Widget not implemented
            </a-typography-text>
        </template>
    </a-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import AnalyticsWidget from './widgets/AnalyticsWidget.vue';
import UsersWidget from './widgets/UsersWidget.vue';
import ReportsWidget from './widgets/ReportsWidget.vue';

const props = defineProps<{
    type: string;
}>();

const widgetType = computed(() => props.type);
const widgetTitle = computed(() => {
    const titles: Record<string, string> = {
        analytics: 'Analytics Dashboard',
        users: 'User Management',
        reports: 'Reports Overview'
    };
    return titles[widgetType.value] || 'Unknown Widget';
});
</script>