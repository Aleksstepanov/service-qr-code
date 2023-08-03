import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    user: localStorage.getItem('userInfo')
  }),
  getters: {
    isAuthenticated (state) {
      return !!state.accessToken
    },
    getUser (state) {
      return state.user
    },
    getLastName (state) {
      return state.user?.last_name || ''
    },
    getFirstName (state) {
      return state.user?.first_name || ''
    },
    getuserDescription (state) {
      return state.user?.text || ''
    },
    getAvatar (state) {
      return state.user?.avatar || ''
    }
  },
  actions: {
    authenticate ({ accessToken }) {
      this.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    setUser ({ user }) {
      this.user = user
      localStorage.setItem('userInfo', user)
    },
    logout (refresh = true) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userInfo')
      if (refresh) window.location.reload(false)
    }
  }
})
