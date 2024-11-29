<!-- src/components/layout/TheNavigation.vue -->
<template>
    <nav class="main-navigation">
      <NavLink
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        :label="link.label"
      />
    </nav>
  </template>
  
  <script setup lang="ts">
  import { useNavigation } from '@/composables/useNavigation'
  import NavLink from '../../components/ui/NavLink.vue'
  
  const { links } = useNavigation()
  </script>
  
  <style scoped>
  .main-navigation {
    padding: 30px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  </style>