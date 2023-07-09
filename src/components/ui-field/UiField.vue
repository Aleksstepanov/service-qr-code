<template>
  <component :is="component" :class="classList">
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue'

// props
const props = defineProps({
  component: {
    type: String,
    default: 'div'
  },
  display: {
    type: String,
    default: 'flex'
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  fullHeight: {
    type: Boolean,
    default: false
  },
  direction: {
    type: String,
    default: 'row'
  },
  justify: {
    type: String,
    default: 'center'
  },
  align: {
    type: String,
    default: 'center'
  }
})

// computed
const classList = computed(
  () =>
    `${props.display} ${props.fullHeight ? 'full-height' : ''} ${
      props.fullWidth ? 'full-width' : ''
    } flex-${props.direction} justify-${props.justify} items-${props.align}`
)
</script>
