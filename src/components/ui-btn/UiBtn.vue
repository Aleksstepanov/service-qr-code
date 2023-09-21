<template>
  <q-btn v-bind="$attrs"
         :v-close-popup="vClosePopup"
         :to="to"
         :disabled="disabled"
         :flat="flat"
         :icon="icon"
         :prefixIcon="prefixIcon"
         :round="round"
         :color="color"
         :type="type"
         :size="size"
         @click="type === 'submit' ? $emit('submit') : $emit('click')"
  ><slot></slot>
    <UiIcon v-if="prefixIcon && !loading" :icon="prefixIcon"/>
    <span v-if="label">
      {{ label }}</span>
    <UiIcon v-if="iconOnly && !loading" :icon="iconOnly"/>
    <span
      v-if="badge"
      class="btn__badge">{{ badge }}</span>
    <UiIcon v-if="suffixIcon " :icon="suffixIcon"/>
  </q-btn>
</template>
<script setup>

import UiIcon from '../test-btn/ui-icon'
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
    requred: false

  },
  prefixIcon: {
    type: String,
    required: false
  },
  suffixIcon: {
    type: String,
    required: false
  },
  iconOnly: {
    type: String,
    default: null
  },
  badge: {
    type: String,
    default: null
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
