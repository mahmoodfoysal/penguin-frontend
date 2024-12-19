import { createWebHistory, createRouter } from 'vue-router'
import PenguinHome from '../modules/client/Home/PenguinHome.vue'

const routes = [
  {
    path: '/',
    component: PenguinHome,
    name: 'Home',
  },
  {
    path: '/login',
    component: () => import('@/components/Authentication/Login/PenguinLogin.vue'),
    name: 'Login',
  },
  {
    path: '/registration',
    component: () => import('@/components/Authentication/Registration/PenguinRegistration.vue'),
    name: 'Registration',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
