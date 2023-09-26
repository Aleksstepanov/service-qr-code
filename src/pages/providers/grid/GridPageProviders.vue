<template>
  <div style="width: 100%">
    <TableWrapper
      v-if="data?.length > 0"
      :pagination="pagination"
      :class-list="classList"
      to="page-provider"
      :title="title"
      :columns="headersConfig"
      :rows="data"
      @delete="$emit('delete', $event)"
      @update:fields="$emit('update:fields', $event)"
      @update:pagination="$emit('update:pagination', $event)"
    />
    <p v-else>No data...</p>

  </div>
</template>
<script setup>
import headersConfig from './headersConfig'
import TableWrapper from 'src/components/table-wrapper/TableWrapper.vue'

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
