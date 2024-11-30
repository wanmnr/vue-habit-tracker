<template>
    <a-card :bordered="false" class="user-summary-card">
      <a-row :gutter="[16, 16]" align="middle">
        <a-col :xs="24" :md="8">
          <div class="user-avatar-section">
            <a-avatar
              :size="96"
              :src="avatarUrl"
              alt="User avatar"
            >
              {{ initials }}
            </a-avatar>
            <h2 class="user-name">{{ summary.fullName }}</h2>
            <a-tag :color="summary.isAdmin ? 'gold' : 'blue'">
              {{ summary.isAdmin ? 'Administrator' : 'User' }}
            </a-tag>
          </div>
        </a-col>
  
        <a-col :xs="24" :md="16">
          <a-descriptions bordered>
            <a-descriptions-item label="Theme" :span="3">
              {{ summary.theme }}
            </a-descriptions-item>
            
            <a-descriptions-item label="Notifications" :span="3">
              <a-space>
                <a-tag
                  v-for="channel in summary.notificationChannels"
                  :key="channel"
                  color="processing"
                >
                  {{ channel }}
                </a-tag>
              </a-space>
            </a-descriptions-item>
          </a-descriptions>
        </a-col>
      </a-row>
    </a-card>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue';
  
  interface Props {
    summary: {
      user: {
        email: string;
        firstName: string;
        lastName: string;
      } | null;
      fullName: string;
      theme: string;
      isAdmin: boolean;
      notificationChannels: string[];
    };
  }
  
  const props = defineProps<Props>();
  
  const initials = computed(() => {
    if (!props.summary.user) return '';
    return `${props.summary.user.firstName[0]}${props.summary.user.lastName[0]}`;
  });
  
  const avatarUrl = computed(() => {
    return `https://avatars.dicebear.com/api/initials/${props.summary.fullName}.svg`;
  });
  </script>
  
  <style scoped>
  .user-summary-card {
    background-color: #fafafa;
  }
  
  .user-avatar-section {
    text-align: center;
  }
  
  .user-name {
    margin: 16px 0 8px;
  }
  </style>