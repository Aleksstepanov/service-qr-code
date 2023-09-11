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
      :data="state.admins"
      :drawer="drawer"
      @delete="onDelete"
      @update:drawer="drawer = !drawer"
      @update:fields="updateFields($event)"
    />
  </div>

  <!-- <ShowDialog
    :show-dialog="showModal"
    titleMsg="Delete Person"
    message="Do you really want to delete this person?"
    @update:model-value="showModal = false"
    @confirm="deletePersonHandler"
  /> -->
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
// import ShowDialog from 'src/components/dialog/ShowDialog.vue'

const { setAdmins } = useAdminsStore()
const $router = useRouter()
// state
// const showModal = ref(false)
// const id = ref(null)
const drawer = ref(false)
const isLoading = ref(false)
// eslint-disable-next-line no-unused-vars
const state = reactive({
  admins: null
})
// query

// computed
const title = computed(() => `Администраторы - ${totalAdmins.value}`)
const totalAdmins = computed(() => state.admins?.length || 0)

// methods
const fetchAdmins = async () => {
  const { execute, data: admins } = useAxios(
    '/api/admin/users/',
    {
      method: 'POST'
    },
    axios,
    { immediate: false }
  )
  try {
    isLoading.value = true
    await execute({
      data: {
        limit: 200,
        skip: 0,
        orderBy: [
          {
            field: 'fillName',
            order: 'ASC'
          }
        ]
      }
    })
    state.admins = admins.value?.map((d, idx) => ({
      ...d,
      num: idx + 1
    }))
    setAdmins({
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
  } finally {
    isLoading.value = false
  }
}
// mutations

// life hooks
onMounted(async () => {
  await fetchAdmins()
})
</script>
