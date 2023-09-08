<template>
  <div :class="classList">
    <q-table
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      :hide-pagination="hidePagination"
      :pagination="pagination"
      @update:pagination="updatePagination({ pagination: $event })"
      @row-click="onRowClick"
      @request="updatePagination"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn flat icon="edit" :to="{ name: to, params: { id: props.row.id } }" />
            <q-btn
              flat
              color="red"
              icon="delete"
              @click="$emit('delete', props.row.id)"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div>
            <router-link :to="{ name: to, params: { id: props.row.id } }">{{
              props.key
            }}</router-link>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup>
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
  columns: {
    type: Array,
    default: () => []
  },
  rows: {
    type: Array,
    default: () => []
  },
  slotName: {
    type: String,
    default: ''
  },
  contentSlot: {
    type: String,
    default: ''
  },
  to: {
    type: String,
    default: () => 'page-persons-edit'
  },
  pagination: {
    type: Object,
    default: () => ({})
  },
  hidePagination: {
    type: Boolean,
    default: false
  }
})

// emits
const $emit = defineEmits(['delete', 'row-click', 'update:pagination'])

// methods
const onRowClick = (e, row, index) => {
  $emit('row-click', row)
}
const updatePagination = ({ pagination }) => {
  $emit('update:pagination', pagination)
}
</script>
