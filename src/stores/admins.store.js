import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { axios } from 'src/utils'
// eslint-disable-next-line no-unused-vars
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
      // console.log(id)
      // await fetch(`http://localhost:8500/admin/users/${id}`, {
      //   method: 'DELETE',
      //   credentials: 'same-origin'
      // })
    }
  }
})
