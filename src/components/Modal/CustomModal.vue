<template>
    <a-modal
      :visible="visible"
      :title="title"
      :confirm-loading="loading"
      :maskClosable="maskClosable"
      :class="[
        'custom-modal',
        sizeClasses[size],
        { 'modal-fullscreen': fullscreen }
      ]"
      :footer="showFooter ? undefined : null"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template #title>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <component
              v-if="icon"
              :is="icon"
              :class="[
                'text-xl',
                variantClasses[variant].icon
              ]"
            />
            <span :class="variantClasses[variant].title">{{ title }}</span>
          </div>
          <div v-if="showHeaderActions" class="flex items-center gap-2">
            <slot name="header-actions" />
            <a-button
              v-if="fullscreenable"
              type="text"
              class="!p-1"
              @click="toggleFullscreen"
            >
              <template #icon>
                <FullscreenOutlined v-if="!fullscreen" />
                <FullscreenExitOutlined v-else />
              </template>
            </a-button>
          </div>
        </div>
      </template>
  
      <div :class="['modal-content', contentClasses]">
        <slot></slot>
      </div>
  
      <template v-if="showFooter" #footer>
        <div class="flex justify-end gap-2">
          <slot name="footer">
            <a-button @click="handleCancel">
              {{ cancelText }}
            </a-button>
            <a-button
              :type="variant"
              :loading="loading"
              @click="handleOk"
            >
              {{ okText }}
            </a-button>
          </slot>
        </div>
      </template>
    </a-modal>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref } from 'vue';
  import {
    FullscreenOutlined,
    FullscreenExitOutlined,
    InfoCircleOutlined,
    CheckCircleOutlined,
    WarningOutlined,
    CloseCircleOutlined
  } from '@ant-design/icons-vue';
  
  type ModalVariant = 'primary' | 'success' | 'warning' | 'error';
  type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
  
  const props = withDefaults(
    defineProps<{
      visible: boolean;
      title: string;
      variant?: ModalVariant;
      size?: ModalSize;
      loading?: boolean;
      showFooter?: boolean;
      showHeaderActions?: boolean;
      maskClosable?: boolean;
      fullscreenable?: boolean;
      contentClasses?: string;
      okText?: string;
      cancelText?: string;
    }>(),
    {
      variant: 'primary',
      size: 'md',
      loading: false,
      showFooter: true,
      showHeaderActions: true,
      maskClosable: true,
      fullscreenable: true,
      contentClasses: '',
      okText: 'OK',
      cancelText: 'Cancel'
    }
  );
  
  const emit = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
    (e: 'ok'): void;
    (e: 'cancel'): void;
  }>();
  
  const fullscreen = ref(false);
  
  const variantClasses = {
    primary: {
      icon: 'text-blue-500',
      title: 'text-gray-800',
    },
    success: {
      icon: 'text-green-500',
      title: 'text-green-800',
    },
    warning: {
      icon: 'text-yellow-500',
      title: 'text-yellow-800',
    },
    error: {
      icon: 'text-red-500',
      title: 'text-red-800',
    },
  };
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  
  const icon = computed(() => {
    switch (props.variant) {
      case 'primary':
        return InfoCircleOutlined;
      case 'success':
        return CheckCircleOutlined;
      case 'warning':
        return WarningOutlined;
      case 'error':
        return CloseCircleOutlined;
      default:
        return null;
    }
  });
  
  const handleOk = () => {
    emit('ok');
  };
  
  const handleCancel = () => {
    emit('cancel');
    emit('update:visible', false);
  };
  
  const toggleFullscreen = () => {
    fullscreen.value = !fullscreen.value;
  };
  </script>
  
  <style lang="postcss" scoped>
  .custom-modal {
    @apply rounded-lg overflow-hidden;
  }
  
  .modal-fullscreen {
    @apply !max-w-none !w-screen !h-screen !top-0 !p-0 !m-0;
  
    :deep(.ant-modal-content) {
      @apply h-full rounded-none;
    }
  
    :deep(.ant-modal-body) {
      @apply h-[calc(100%-110px)] overflow-auto;
    }
  }
  
  :deep(.ant-modal-header) {
    @apply border-b border-gray-200 px-6 py-4;
  }
  
  :deep(.ant-modal-body) {
    @apply p-6;
  }
  
  :deep(.ant-modal-footer) {
    @apply border-t border-gray-200 px-6 py-4;
  }
  
  .modal-content {
    @apply space-y-4;
  }
  </style>