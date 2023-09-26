import { defineStore } from 'pinia'
import { axios } from 'src/utils'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useStorage } from '@vueuse/core'
export const useProvidersStore = defineStore({
  id: 'providers',
  state: () => ({
    providers: useStorage('PROVIDERS', null, localStorage, {
      mergeDefaults: true
    })
  }),
  getters: {
    getProviders (state) {
      return JSON.parse(state.providers)
    },
    getProvider: (state) => (providerId) =>
      JSON.parse(state.providers)?.find((provider) => {
        return provider?.id === providerId
      }) || null
  },
  actions: {
    setProviders ({ providers }) {
      this.providers = JSON.stringify(providers)
    },
    async deleteProvider ({ id }) {
      await useAxios(
        `/api/admin/providers/${id}`,
        {
          method: 'DELETE'

        },
        axios
      )
    }
  }
})
