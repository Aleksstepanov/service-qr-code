import { defineStore } from 'pinia'

export const useAdminsStore = defineStore({
  id: 'admins',
  state: () => ({
    admins: null
  }),
  getters: {
    getAdmins (state) {
      return state.admins
    },
    getAdmin: (state) => (adminId) =>
      state.admins?.find((admin) => admin?.id === adminId) || null
  },
  actions: {
    setAdmins ({ admins }) {
      this.admins = admins
      // localStorage.setItem('userInfo', JSON.stringify(admins))
    }
  }
})
