<!-- src/components/layout/TheHeader.vue -->
<template>
    <header class="main-header">
      <div class="header-content">
        <h1 class="logo">Your App</h1>
        <TheNavigation />
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import TheNavigation from './TheNavigation.vue'
  </script>
  
  <style scoped>
  .main-header {
    grid-area: header;
    background-color: var(--background-light);
    border-bottom: 1px solid var(--primary-color);
  }
  
  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .logo {
    font-size: 1.5rem;
    color: var(--primary-color);
    text-align: center;
  }
  </style>