import { defineStore } from 'pinia'
import { axios } from 'src/utils'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useStorage } from '@vueuse/core'
export const useAdminsStore = defineStore({
  id: 'admins',
  state: () => ({
    admins: useStorage('ADMINS', null, localStorage, {
      mergeDefaults: true
    })
  }),
  getters: {
    getAdmins (state) {
      return JSON.parse(state.admins)
    },
    getAdmin: (state) => (adminId) =>
      JSON.parse(state.admins)?.find((admin) => {
        return admin?.id === adminId
      }) || null
  },
  actions: {
    setAdmins ({ admins }) {
      this.admins = JSON.stringify(admins)
    },
    async deleteAdmin ({ id }) {
      await useAxios(
        `/api/admin/users/${id}`,
        {
          method: 'DELETE'
        },
        axios
      )
    }
  }
})
