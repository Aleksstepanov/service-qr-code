<template>
  <PagePreLoader v-if="isLoading" />

  <FormPageAdmin
    v-else
    :is-new="isNew"
    :data="state.admin"
    @cancel="$router.push({ name: 'page-admins' })"
    @submit="onSubmit"
    @delete="state.showModal = true"
  />

  <ConformitionDialog
    v-model:show="state.showModal"
    title="Вы действительно хотите удалить этого пользователя?"
    title-cancel="Cancel"
    @confirm="onDelete"
  />
</template>
<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminsStore } from 'src/stores/admins.store'
import { emitter } from 'src/plugins'
import { axios } from 'src/utils'
import { useAxios } from '@vueuse/integrations/useAxios'

import PagePreLoader from 'src/components/page-pre-loader/PagePreLoader.vue'
import FormPageAdmin from './form'
import ConformitionDialog from 'src/components/conformition-dialog/ConformitionDialog.vue'

const $route = useRoute()
const $router = useRouter()
const adminStore = useAdminsStore()

// state
const state = reactive({
  admin: null,
  showModal: false
})
const isLoading = ref(false)

// computed

const idAdmin = computed(() => $route.params.id)
const isNew = computed(() => !idAdmin.value)

// methods
const { execute } = useAxios(
  '/api/admin/users/new',
  {
    method: 'POST'
  },
  axios,
  { immediate: false }
)
const fetchAdmin = async () => {
  if (isNew.value) return
  isLoading.value = false
  state.admin = adminStore.getAdmin(Number(idAdmin.value))
}
const onSubmit = async (payload) => {
  if (isNew.value) {
    await createAdmin({
      ...payload,
      role: 'ADMIN'
    })
  } else {
    await updateAdmin({
      ...payload,
      id: state.admin?.id,
      role: 'ADMIN'
    })
  }
}
const createAdmin = async (data) => {
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
    await $router.push({ name: 'page-admins' })
  }
}
const updateAdmin = async (data) => {
  try {
    isLoading.value = true
    await execute(
      '/api/admin/users/',
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
    await $router.push({ name: 'page-admins' })
  }
}
const onDelete = async (id) => {
  try {
    await adminStore.deleteAdmin({ id })
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
  console.log('idAdmin', idAdmin.value)
  await fetchAdmin()
})
</script>
