<!-- src/components/ui/NavLink.vue -->
<template>
    <router-link
      :to="to"
      class="nav-link"
      :class="{ 'router-link-exact-active': isActive }"
    >
      {{ label }}
    </router-link>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  const props = defineProps<{
    to: string
    label: string
  }>()
  
  const route = useRoute()
  const isActive = computed(() => route.path === props.to)
  </script>
  
  <style scoped>
  .nav-link {
    font-weight: bold;
    color: var(--text-light);
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 4px;
    transition: color 0.3s ease;
  }
  
  .nav-link:hover {
    color: var(--primary-color);
  }
  
  .nav-link.router-link-exact-active {
    color: var(--primary-color-dark);
  }
  </style>