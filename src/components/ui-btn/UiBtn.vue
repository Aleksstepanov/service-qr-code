<template>
  <q-btn
    v-bind="$attrs"
    :v-close-popup="vClosePopup"
    :to="to"
    :disabled="disabled"
    :flat="flat"
    :round="round"
    :mask="mask"
    :color="color"
    :icon="icon"
    :type="type"
    :size="size"
    @click="type === 'submit' ? $emit('submit') : $emit('click')"
  >

    <slot></slot>
    <!-- span давай уберем -->
    <span v-if="label"> {{ label }}</span>
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
    // @review required удалить
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
    // @review лучше по дефолту что то передать
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  mask: {
    // @review такого пропа я не нашел
    type: String,
    default: ''
  },
  color: {
    type: String,
    // @review лучше по дефолту что то передать
    default: ''
  },
  flat: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    // @review required удалить
    requred: false,
    default: ''
  },
  dense: {
    type: Boolean,
    default: false
  },
  round: {
    // @review не думаю, что нам этот проп вообще нужен будет
    type: Boolean,
    default: false
  },
  push: {
    // @review не думаю, что нам этот проп вообще нужен будет
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
