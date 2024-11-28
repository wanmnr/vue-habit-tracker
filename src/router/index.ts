// src/router/index.ts

import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouterScrollBehavior
} from 'vue-router'
import { defineAsyncComponent, DefineComponent } from 'vue'

// Declare module augmentation for vue-router
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    requiresAuth: boolean
  }
}

// Lazy loaded components for code splitting and performance
const Sample1 = defineAsyncComponent(() =>
  import('@/views/Sample1.vue')
) as DefineComponent<{}, {}, any>

const Sample2 = defineAsyncComponent(() =>
  import('@/views/Sample2.vue')
) as DefineComponent<{}, {}, any>

const Sample3 = defineAsyncComponent(() =>
  import('@/views/Sample3.vue')
) as DefineComponent<{}, {}, any>

// Route metadata for better maintainability
const routeMetadata = {
  sample1: {
    title: 'Sample 1',
    requiresAuth: false
  },
  sample2: {
    title: 'Sample 2',
    requiresAuth: false
  },
  sample3: {
    title: 'Sample 3',
    requiresAuth: false
  }
} as const

// Route configurations
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'sample1' }
  },
  {
    path: '/sample1',
    name: 'sample1',
    component: Sample1,
    meta: routeMetadata.sample1
  },
  {
    path: '/sample2',
    name: 'sample2',
    component: Sample2,
    meta: routeMetadata.sample2
  },
  {
    path: '/sample3',
    name: 'sample3',
    component: Sample3,
    meta: routeMetadata.sample3
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: defineAsyncComponent(() =>
      import('@/views/NotFound.vue')
    ) as DefineComponent<{}, {}, any>
  }
]

// Scroll behavior
const scrollBehavior: RouterScrollBehavior = (
  _to,
  _from,
  savedPosition
) => {
  if (savedPosition) {
    return savedPosition
  }
  return { top: 0 }
}

// Router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title} | My App`
  next()
})

export default router