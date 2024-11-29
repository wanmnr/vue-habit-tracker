// src/composables/useNavigation.ts
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { navigationLinks } from '@/constants/navigation'

export function useNavigation() {
  const route = useRoute()
  
  const currentPath = computed(() => route.path)
  const links = ref(navigationLinks)

  return {
    links,
    currentPath
  }
}