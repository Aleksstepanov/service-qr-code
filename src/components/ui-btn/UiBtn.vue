<template>
  <q-btn
    :v-close-popup="vClosePopup"
    :flat="flat"
    :label="label"
    :color="color"
    :icon="icon"
    @click="$emit('click')"
  >
    <slot></slot>
  </q-btn>
</template>
<script setup>
// props
defineProps({
  vClosePopup: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  },
  flat: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    default: ''
  },
  dense: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  push: {
    type: Boolean,
    default: false
  }
})

// emits
const $emit = defineEmits(['click'])
</script>
