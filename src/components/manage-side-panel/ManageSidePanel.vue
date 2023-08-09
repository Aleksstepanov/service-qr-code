<template>
  <q-form :="$attrs">
    <slot></slot>

  </q-form>
</template>
<script setup>
import { useFormProps } from 'src/composables/form.js'
// import UiField from '../ui-field/UiField.vue'
defineProps({
  ...useFormProps(),
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
