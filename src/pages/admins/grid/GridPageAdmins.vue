<template>
  <div style="width: 100%">
    <TableWrapper
      v-if="data?.length > 0"
      :pagination="pagination"
      :class-list="classList"
      :title="title"
      :columns="adminHeadersConfig"
      :rows="data"
      @delete="$emit('delete', $event)"
      @update:pagination="$emit('update:pagination', $event)"
    />
    <p v-else>No data...</p>

  </div>
</template>
<script setup>
import { useAdminHeadersConfig } from './headersConfig'
import TableWrapper from 'src/components/table-wrapper/TableWrapper.vue'

const { adminHeadersConfig } = useAdminHeadersConfig()
// props
defineProps({
  classList: {
    type: String,
    default: 'q-pa-md'
  },
  title: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  },
  drawer: {
    type: Boolean,
    default: null
  },
  pagination: {
    type: Object,
    default: () => ({})
  }
})

// emits
const $emit = defineEmits([
  'delete',
  'update:drawer',
  'update:fields',
  'reset:filters',
  'update:pagination'
])

</script>
