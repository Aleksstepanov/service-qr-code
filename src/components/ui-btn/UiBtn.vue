<template>
  <q-btn v-bind="$attrs"
         :v-close-popup="vClosePopup"
         :to="to"
         :disabled="disabled"
         :flat="flat"
         :round="round"
         :prefixIcon="prefixIcon"
         :color="color"
         :icon="icon"
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
    default: 'sm'
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
  }

})

// emits
/*
@review
теперь про обработку событий.
Если передан submit, то передаем submit
Если type === button, то передаем click
Если передан проп to, то обработчик ничего делать не должен
*/
const $emit = defineEmits(['click'])
</script>
