<template>
  <q-btn v-bind="$attrs"
         :v-close-popup="vClosePopup"
         :to="to"
         :disabled ="disabled"
         :flat="flat"
         :round="round"
         :mask="mask"
         :color="color"
         :icon="icon"
         :type="type"
         :size="size"
         @click="type === 'submit' ? $emit('submit') : $emit('click')"
  ><slot></slot>
    <span v-if="label">
      {{ label }}</span>
  </q-btn>
</template>
<script setup>
// import { computed } from 'vue'

// props
defineProps({

  vClosePopup: {
    type: Boolean,
    default: false
  },
  to: {
    type: [String, Object],
    requred: false,
    default: null
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
    requred: false,
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
