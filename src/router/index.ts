import { createRouter, createWebHistory } from 'vue-router'
import { Example1, Example2 } from '@/views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'example1',
      component: Example1,
    },
    {
      path: '/example2',
      name: 'example2',
      component: Example2,
    },
    { path: '/:pathMatch(.*)', redirect: '/' },
  ],
})

export default router
