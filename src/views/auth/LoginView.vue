<!-- views/auth/LoginView.vue -->
<template>
  <div class="login-container">
    <a-row justify="center" align="middle" class="min-h-screen">
      <a-col :xs="22" :sm="16" :md="12" :lg="8" :xl="6">
        <a-card :bordered="false" class="login-card">
          <template #title>
            <h1 class="text-center">Welcome Back</h1>
          </template>

          <a-form :model="formState" @finish="handleSubmit" layout="vertical" :validate-trigger="['blur', 'change']"
            :disabled="isLoading">
            <a-form-item label="Email" name="email" :rules="[
              { required: true, message: 'Please input your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]">
              <a-input v-model:value="formState.email" :disabled="isLoading" type="email" autocomplete="username">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>

            <a-form-item label="Password" name="password"
              :rules="[{ required: true, message: 'Please input your password' }]">
              <a-input-password v-model:value="formState.password" :disabled="isLoading">
                <template #input>
                  <input type="password" :disabled="isLoading" autocomplete="current-password" />
                </template>
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="isLoading" block>
                {{ isLoading ? 'Signing in...' : 'Sign In' }}
              </a-button>
            </a-form-item>
          </a-form>

          <a-alert v-if="authStore.error" type="error" :message="authStore.error" show-icon banner class="mt-4" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useUserFeatures } from '@/stores';
import type { FormState } from '@/types/forms';

const router = useRouter();
const { authStore, initializeUserFeatures } = useUserFeatures();

const formState = reactive<FormState>({
  email: '',
  password: '',
});

const isLoading = computed(() => authStore.isLoading);  // Using store's loading state

const handleSubmit = async (values: FormState) => {
  try {
    await authStore.login(values.email, values.password);
    await initializeUserFeatures();

    // await authStore.login(values.email, values.password);
    // await initializeUserFeatures();

    router.push('/dashboard');
  } catch (err) {
    console.error('Login failed:', err);
  }
};
</script>

<style scoped>
.login-container {
  background-color: #f0f2f5;
  min-height: 100vh;
}

.login-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
}

.mt-4 {
  margin-top: 1rem;
}
</style>