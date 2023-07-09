import { defaultRedirect } from 'src/router'
import { useAuthStore } from 'src/stores/auth.store'

const defaultAuthRedirect = { name: 'page-sign-in' }

/**
 * Checks each route in config for auth directives
 * Usage: add a auth property in the router item's meta
 *
 * // Boolean notation - will redirect to the defaultAuthRedirect
 * meta: {
 *   auth: true
 * }
 *
 * // Or Object notation - allows to define custoredirectIfAuthenticatedm redirect
 * meta: {
 *   auth: {
 *     required: true,
 *     redirect: { name: 'home' }
 *   }
 * }
 *
 * // Redirect can be a function
 * meta: {
 *   auth: {
 *     required: true,
 *     redirect: ({ from, to }) => { return '...' }
 *   }
 * }
 */
export const beforeEach = (to, from, next) => {
  const { auth } = to.meta
  if (!auth) return next() // public route

  const authRequired = auth === true || auth.required === true || false
  if (!authRequired) return next() // public route

  const redirect = () => {
    if (typeof auth.redirect === 'function') return auth.redirect({ from, to })
    const fromRoute = from.name ? from : null
    return auth.redirect || fromRoute || defaultAuthRedirect
  }

  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    const route = redirect()
    // add a hint where to redirect after login (a query param)
    const redirectAfterLoginTo = to && to.fullPath
    if (redirectAfterLoginTo) {
      route.query = {
        ...route.query,
        redirect: redirectAfterLoginTo
      }
    }
    return next(route)
  }

  // otherwise move forward
  next()
}

export const redirectIfAuthenticated = (to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) return next()
  next({ name: defaultRedirect() })
}
