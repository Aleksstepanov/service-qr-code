<template>
  <q-btn v-bind="$attrs"
         :v-close-popup="vClosePopup"
         :disabled ="disabled"
         :flat="flat"
         :label="label"
         :mask="mask"
         :color="color"
         :icon="icon"
         :type="type"
         :size="size"
         @click="type === 'submit' ? $emit('submit') : $emit('click')"
  ><slot></slot>
  </q-btn>
</template>
<script setup>
// props
defineProps({
  vClosePopup: {
    type: Boolean,
    default: false
  },
  background: {
    type: String,
    default: 'var(--q-primary)'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  size: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  mask: {
    type: String,
    default: ''
  },
  color: {
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
