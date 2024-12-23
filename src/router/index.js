import { createWebHistory, createRouter } from 'vue-router'
import PenguinHome from '../modules/client/Home/PenguinHome.vue'
import axios from 'axios'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import initilizationAuthentication from '@/firebase/firebase.init'
initilizationAuthentication()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PenguinHome,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Authentication/Login/PenguinLogin.vue'),
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/components/Authentication/Registration/PenguinRegistration.vue'),
  },
  {
    path: '/dashboard/features',
    name: 'DashboardHome',
    component: () => import('@/modules/dashboard/DashboardIndex.vue'),
    redirect: '/dashboard/features/home',
    meta: { requiresAuth: true, requiresAdminCheck: true },
    children: [
      {
        path: 'home',
        name: 'DashboardHomeDefault',
        component: () => import('@/modules/dashboard/Features/DashhomeHome/DashHome.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active-link',
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  if (to.meta.requiresAuth) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (to.meta.requiresAdminCheck) {
          try {
            const response = await axios.get(`http://localhost:5000/admin/${user.email}`)
            console.log(response)
            if (response.data.admin) {
              next()
            } else {
              next('/login')
            }
          } catch (error) {
            console.error('Error checking admin status:', error)
            next('/login')
          }
        } else {
          next()
        }
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})

export default router
