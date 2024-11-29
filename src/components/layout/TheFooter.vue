<!-- src/components/layout/TheFooter.vue -->
<template>
  <footer class="main-footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} Your App. All rights reserved.</p>
      <nav class="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.main-footer {
  grid-area: footer;
  background-color: var(--background-light);
  border-top: 1px solid var(--primary-color);
  padding: 1rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  text-align: center;
}

.footer-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.footer-links a {
  color: var(--text-light);
  text-decoration: none;
}

.footer-links a:hover {
  color: var(--primary-color);
}
</style>