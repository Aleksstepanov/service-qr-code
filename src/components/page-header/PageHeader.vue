<template>
  <q-toolbar style="height: 10vh;">
    <q-toolbar-title>{{ title }}</q-toolbar-title>
    <template v-if="buttons?.length">
      <UiBtn v-for="(button, idx) in buttons"
             :key="idx"
             :disable="button?.disable"
             :loading="button?.loading"
             :icon="button?.icon"
             :label="button?.label"
             :other="button?.other"
             @click="btnClickHandler(button?.emit)" />
    </template>
  </q-toolbar>
</template>
<script setup>
import UiBtn from 'src/components/ui-btn'

defineProps({
  title: {
    type: String,
    default: null
  },
  buttons: {
    type: Array,
    default: () => []
  }
})

// emits
const $emit = defineEmits(['click:add', 'click:refresh', 'click', 'click:settings'])

// methods
const btnClickHandler = eventType => {
  switch (eventType) {
    case 'refresh':
      $emit('click:refresh')
      break
    case 'add':
      $emit('click:add')
      break
    case 'settings':
      $emit('click:settings')
      break
    default:
      $emit('click')
  }
}
</script>
