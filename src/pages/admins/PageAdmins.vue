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
      @delete="deleteBtnClickHandler"
      @update:drawer="drawer = !drawer"
      @update:fields="updateFields($event)"
    />
  </div>

  <ConformitionDialog
    v-model:show="state.showModal"
    :title="$t('delete_admin')"
    :title-cancel="$t('cancel')"
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
import { useI18n } from 'vue-i18n'
import PagePreLoader from 'src/components/page-pre-loader'
import GridAdmins from './grid'
import PageHeader from 'src/components/page-header/PageHeader.vue'
import ConformitionDialog from 'src/components/conformition-dialog/ConformitionDialog.vue'

const adminsStore = useAdminsStore()
const $router = useRouter()
const { t: $t } = useI18n()
// state
const drawer = ref(false)
const selectedId = ref(null)
const state = reactive({
  showModal: false
})
// query

// computed
const title = computed(() => `${$t('admins')} - ${totalAdmins.value}`)
const totalAdmins = computed(() => (adminsStore.getAdmins)?.length || 0)

// methods
const deleteBtnClickHandler = (id) => {
  state.showModal = true
  console.log(id)
  selectedId.value = id
}
const onDelete = async () => {
  if (!selectedId.value) return
  try {
    await adminsStore.deleteAdmin({ id: selectedId.value })
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
