import { createWebHistory, createRouter } from 'vue-router'
import PenguinHome from '../modules/client/Home/PenguinHome.vue'

const routes = [{ path: '/', component: PenguinHome, name: 'Home' }]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
