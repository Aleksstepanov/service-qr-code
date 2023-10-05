<template>
  <PagePreLoader v-if="isLoading" />

  <FormPageProvider
    v-else
    :is-new="isNew"
    :data="state.provider"
    @cancel="$router.push({ name: 'page-providers' })"
    @submit="onSubmit"
    @delete="state.showModal = true, $event"
  />

  <ConformitionDialog
    v-model:show="state.showModal"
    :title="$t('delete_provider')"
    title-cancel="Cancel"
    @confirm="onDelete"
  />
</template>
<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProvidersStore } from 'src/stores/providers.store'
import { emitter } from 'src/plugins'
import { axios } from 'src/utils'
import { useAxios } from '@vueuse/integrations/useAxios'

import PagePreLoader from 'src/components/page-pre-loader/PagePreLoader.vue'
import FormPageProvider from './form/FormPageProvider.vue'
import ConformitionDialog from 'src/components/conformition-dialog/ConformitionDialog.vue'

//  @delete="state.showModal = true"
const $route = useRoute()
const $router = useRouter()
const providerStore = useProvidersStore()

// state
const state = reactive({
  provider: null,
  showModal: false
})
const isLoading = ref(false)

// computed

const idProvider = computed(() => $route.params.id)
const isNew = computed(() => !idProvider.value)
console.log('idProvider', idProvider.value)//
// methods
const { execute } = useAxios(
  '/api/admin/providers/new',
  {
    method: 'POST'
  },
  axios,
  { immediate: false }
)
const fetchProvider = async () => {
  if (isNew.value) return
  isLoading.value = false
  state.provider = providerStore.getProvider(Number(idProvider.value))
  console.log('idProvider.value', idProvider.value)
}
const onSubmit = async (payload) => {
  if (isNew.value) {
    await createProvider({
      ...payload,
      role: 'PROVIDER'
    })
  } else {
    await updateProvider({
      ...payload,
      id: state.provider?.id,
      role: 'PROVIDER'
    })
  }
}
const createProvider = async (data) => {
  try {
    isLoading.value = true
    await execute({
      data
    })
    emitter.emit('notify', {
      type: 'positive',
      message: 'Success'
    })
  } catch (error) {
    emitter.emit('notify', {
      type: 'negative',
      message: error?.message
    })
  } finally {
    isLoading.value = false
    await $router.push({ name: 'page-providers' })
  }
}
const updateProvider = async (data) => {
  try {
    isLoading.value = true
    await execute(
      '/api/admin/providers/',
      {
        method: 'PUT',
        data
      }
    )
    emitter.emit('notify', {
      type: 'positive',
      message: 'Success'
    })
  } catch (error) {
    emitter.emit('notify', {
      type: 'negative',
      message: error?.message
    })
  } finally {
    isLoading.value = false
    await $router.push({ name: 'page-providers' })
  }
}
const onDelete = async (id) => {
  try {
    await providerStore.deleteProvider({ id })
  } catch (error) {
    console.log(error)
    emitter.emit('notify', {
      type: 'negative',
      message: error?.message
    })
  } finally {
    state.showModal = false
  }
}

// life hooks
onMounted(async () => {
  console.log('idProvider', idProvider.value)
  await fetchProvider()
})
</script>
