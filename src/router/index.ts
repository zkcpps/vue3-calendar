import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/calendar'
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/views/calendar/calendar.vue')
  },
  {
    path: '/worker',
    name: 'worker',
    component: () => import('@/views/worker/worker.vue')
  },
  {
    path: '/customer-list',
    name: 'customer-list',
    component: () => import('@/views/customer-list/customer-list.vue')
  },
  {
    path: '/business-score',
    name: 'business-score',
    component: () => import('@/views/business-score/business-score.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(
    window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/'
  )
})

export default router
