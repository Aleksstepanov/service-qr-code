import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    isMobile: localStorage.getItem('is-mobile')
  }),
  getters: {
    isAuthenticated (state) {
      return !!state.accessToken
    }
  },
  actions: {
    async authenticate ({ accessToken }) {
      this.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    logout (refresh = true) {
      localStorage.removeItem('accessToken')
      if (refresh) window.location.reload(false)
    }
  }
})
