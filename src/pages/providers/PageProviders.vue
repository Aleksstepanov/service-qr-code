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
      @click:refresh="fetchProviders"
      @click:add="$router.push({ name: 'page-provider-new' })"
    />
    <GridPageProviders
      :data="providersStore.getProviders"
      :drawer="drawer"
      @delete="confirmWithId"
      @update:drawer="drawer = !drawer"
      @update:fields="updateFields($event)"
    />
  </div>

  <ConformitionDialog
    v-model:show="statePage.showModal"
    title="Вы действительно хотите удалить этого поставщика?"
    title-cancel="Cancel"
    @confirm=" confirmDelete"
  />
</template>
<script setup>
// state.showModal = true

import { computed, ref, reactive, onMounted } from 'vue'
import { emitter } from 'src/plugins'
import { axios } from 'src/utils'
import { useAxios } from '@vueuse/integrations/useAxios'
import { useRouter } from 'vue-router'
import { useProvidersStore } from 'src/stores/providers.store'

import { useI18n } from 'vue-i18n'
import PagePreLoader from 'src/components/page-pre-loader'
import GridPageProviders from './grid'
import PageHeader from 'src/components/page-header/PageHeader.vue'
import ConformitionDialog from 'src/components/conformition-dialog/ConformitionDialog.vue'

const { t: $t } = useI18n()

defineProps({
  props: {
    id: {
      type: Number
    }
  }
})
defineEmits(['update', 'delete'])
const providersStore = useProvidersStore()
const $router = useRouter()
//
const updateFields = (fields) => {
  console.log('fields', fields)
}
// state
const drawer = ref(false)
const statePage = reactive({
  showModal: false,
  id: null
})

// query

//

const totalProviders = computed(() => (providersStore.getProviders)?.length || 0)
const title = computed(() => `${$t('service_providers')} ${totalProviders.value}`)

// methods
function confirmWithId (id) {
  console.log('id', id)
  statePage.showModal = true
  statePage.id = id
}
function confirmDelete (id) {
  onDelete(statePage.id)
}

const {
  execute,
  data: providers,
  isLoading
} = useAxios(
  '/api/admin/providers/',
  {
    method: 'POST'
  },
  axios,
  { immediate: false }
)

const onDelete = async (id) => {
  console.log(id + ' id!!!!!')
  try {
    await providersStore.deleteProvider({ id })
    await fetchProviders()
  } catch (error) {
    console.log(error)
    emitter.emit('notify', {
      type: 'negative',
      message: error?.message
    })
  } finally {
    statePage.showModal = false
  }
}

const fetchProviders = async () => {
  try {
    await execute({
      data: {
        limit: 200,
        skip: 0,
        orderBy: [
          {
            field: 'company',
            order: 'ASC'
          }
        ]
      }
    })
    providersStore.setProviders({
      providers: providers.value?.map((d, idx) => ({
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
  await fetchProviders()
})
</script>
