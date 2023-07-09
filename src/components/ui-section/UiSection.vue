<template>
  <div :class="[display, direction, justify, align, items, fullWidth ? 'full-width' : '']">
    <slot ></slot>
  </div>
</template>
<script setup>

// props
defineProps({
  display: {
    type: String,
    default: 'flex'
  },
  direction: {
    type: String,
    default: 'row'
  },
  justify: {
    type: String,
    default: 'justify-center'
  },
  align: {
    type: String,
    default: 'align-start'
  },
  items: {
    type: String,
    default: 'items-start'
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

</script>
