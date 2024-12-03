<template>
    <a-card title="User Preferences" :loading="loading">
        <a-form :model="preferences" layout="vertical" @finish="handleUpdate">
            <a-form-item label="Theme">
                <a-radio-group v-model:value="preferences.theme">
                    <a-radio-button value="light">
                        <template #icon>
                            <BulbOutlined />
                        </template>
                        Light
                    </a-radio-button>
                    <a-radio-button value="dark">
                        <template #icon>
                            <BulbFilled />
                        </template>
                        Dark
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>

            <a-form-item label="Language">
                <a-select v-model:value="preferences.language" :options="languageOptions" />
            </a-form-item>

            <a-divider>Notifications</a-divider>

            <a-form-item>
                <a-space direction="vertical">
                    <a-checkbox v-model:checked="preferences.notifications.email">
                        Email Notifications
                    </a-checkbox>

                    <a-checkbox v-model:checked="preferences.notifications.push">
                        Push Notifications
                    </a-checkbox>

                    <a-checkbox v-model:checked="preferences.notifications.desktop">
                        Desktop Notifications
                    </a-checkbox>
                </a-space>
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" :loading="updating" :disabled="!hasChanges">
                    Save Changes
                </a-button>
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { BulbOutlined, BulbFilled } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useUserFeatures } from '@/stores';
import type { UserPreferences } from '@/types/preferences';

const { preferencesStore } = useUserFeatures();

const preferences = ref<UserPreferences>({ ...preferencesStore.preferences });
const loading = ref(false);
const updating = ref(false);

const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
];

const hasChanges = computed(() => {
    return JSON.stringify(preferences.value) !==
        JSON.stringify(preferencesStore.preferences);
});

const handleUpdate = async () => {
    try {
        updating.value = true;
        await preferencesStore.updatePreferences(preferences.value);
        message.success('Preferences updated successfully');
    } catch (error) {
        message.error('Failed to update preferences');
    } finally {
        updating.value = false;
    }
};
</script>