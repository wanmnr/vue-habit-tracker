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
    component: () => import('@/views/SampleNo1.vue'),
    meta: routeMetadata.sample1
  },
  {
    path: '/sample2',
    name: 'sample2',
    component: () => import('@/views/SampleNo2.vue'),
    meta: routeMetadata.sample2
  },
  {
    path: '/sample3',
    name: 'sample3',
    component: () => import('@/views/SampleNo3.vue'),
    meta: routeMetadata.sample3
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
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

router.beforeEach(async (to, _from, next) => {
  try {
    const title = to.meta.title || 'My App'
    document.title = `${title} | My App`
    next()
  } catch (error) {
    console.error('Navigation error:', error)
    next(false)
  }
})

// Add error handling for route changes
router.onError((error) => {
  console.error('Router error:', error)
})

export default router