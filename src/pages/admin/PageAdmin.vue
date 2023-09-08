<template>
  <PagePreLoader v-if="isLoading" />

  <FormPageAdmin
    v-else
    :is-new="isNew"
    @cancel="$router.push({ name: 'page-admins' })"
    @submit="onSubmit"
  />
</template>
<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
// import { emitter } from 'src/plugins'
import { useRoute } from 'vue-router'
import {} from 'src/stores/admins.store'
import { emitter } from 'src/plugins'
import { axios } from 'src/utils'
import { useAxios } from '@vueuse/integrations/useAxios'
import PagePreLoader from 'src/components/page-pre-loader/PagePreLoader.vue'
import FormPageAdmin from './form'

const $route = useRoute()
// state
// eslint-disable-next-line no-unused-vars
const state = reactive({
  admin: null
})
const isLoading = ref(false)

// computed
const isNew = computed(() => $route?.name?.includes('new') || false)

// methods
const fetchAdmin = async () => {
  if (isNew.value) return
  isLoading.value = false
  return console.log('fetch user')
}
const onSubmit = async (payload) => {
  await createAdmin({
    ...payload,
    role: 'ADMIN'
  })
}
const createAdmin = async (data) => {
  const { execute } = useAxios(
    '/api/admin/users/new',
    {
      method: 'POST'
    },
    axios,
    { immediate: false }
  )
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
  }
}
// life hooks
onMounted(async () => {
  await fetchAdmin()
})
</script>
