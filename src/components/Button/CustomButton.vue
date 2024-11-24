<template>
  <button
    :class="[
      'px-4 py-2 rounded-md font-medium transition-colors',
      variantClasses[variant],
      sizeClasses[size],
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
  type ButtonVariant = 'primary' | 'secondary' | 'danger';
  type ButtonSize = 'sm' | 'md' | 'lg';

  withDefaults(
    defineProps<{
      variant?: ButtonVariant;
      size?: ButtonSize;
      disabled?: boolean;
    }>(),
    {
      variant: 'primary',
      size: 'md',
      disabled: false
    }
  );

  defineEmits<{
    (e: 'click'): void;
  }>();

  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
</script>
