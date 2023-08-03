<template>
  <q-btn :v-close-popup="vClosePopup"
         :flat="flat"
         :label="label"
         :color="color"
         :icon="icon"
         @click="$emit('click')"
  />
</template>
<script setup>
// props
defineProps({
  vClosePopup: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'primary'
  },
  type: {
    type: String,
    default: 'button'
  },
  flat: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    default: ''
  }
})

// emits
const $emit = defineEmits(['click'])
</script>
