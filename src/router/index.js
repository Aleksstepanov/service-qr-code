// import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'
import { beforeEach } from './middleware'
import { useAuthStore } from 'src/stores/auth.store'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(beforeEach)
export default router

export const defaultRedirect = () => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) return 'page-sign-in'
  return 'page-place-builder'
}
