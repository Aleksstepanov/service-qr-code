<template>
  <PagePreLoader v-if="isLoading" />
  <div v-else class="flex column full-width">
    <PageHeader
      :title="title"
      :buttons="[
        {
          icon: 'refresh',
          emit: 'refresh',
          other: {
            class: 'q-mr-md',
            dense: true,
            flat: true,
          },
        },
        {
          icon: 'add',
          emit: 'add',
          other: {
            class: 'q-mr-md',
            dense: true,
            flat: true,
          },
        },
      ]"
      @click:refresh="fetchAdmins"
      @click:add="$router.push({ name: 'page-admin-new' })"
    />
    <GridAdmins
      :data="adminsStore.getAdmins"
      :drawer="drawer"
      @delete="state.showModal = true"
      @update:drawer="drawer = !drawer"
      @update:fields="updateFields($event)"
    />
  </div>

  <ConformitionDialog
    v-model:show="state.showModal"
    title="Вы действительно хотите удалить этого пользователя?"
    title-cancel="Cancel"
    @confirm="onDelete"
  />
</template>
<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { emitter } from 'src/plugins'
import { axios } from 'src/utils'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useRouter } from 'vue-router'
import { useAdminsStore } from 'src/stores/admins.store'

import PagePreLoader from 'src/components/page-pre-loader'
import GridAdmins from './grid'
import PageHeader from 'src/components/page-header/PageHeader.vue'
import ConformitionDialog from 'src/components/conformition-dialog/ConformitionDialog.vue'

const adminsStore = useAdminsStore()
const $router = useRouter()

// state
const drawer = ref(false)
const state = reactive({
  showModal: false
})
// query

// computed
const title = computed(() => `Администраторы - ${totalAdmins.value}`)
const totalAdmins = computed(() => state.admins?.length || 0)

// methods
const onDelete = async (id) => {
  try {
    await adminsStore.deleteAdmin({ id })
    await fetchAdmins()
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
const {
  execute,
  data: admins,
  isLoading
} = useAxios(
  '/api/admin/users/',
  {
    method: 'POST'
  },
  axios,
  { immediate: false }
)
const fetchAdmins = async () => {
  try {
    await execute({
      data: {
        limit: 200,
        skip: 0,
        orderBy: [
          {
            field: 'fullName',
            order: 'ASC'
          }
        ]
      }
    })
    adminsStore.setAdmins({
      admins: admins.value?.map((d, idx) => ({
        ...d,
        num: idx + 1
      }))
    })
  } catch (error) {
    emitter.emit('notify', {
      type: 'negative',
      message: error?.message
    })
  }
}

// life hooks
onMounted(async () => {
  await fetchAdmins()
})
</script>
