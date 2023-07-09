<template>
  <div :class="[display, direction, justify, align, item]">
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
  item: {
    type: String,
    default: 'item-start'
  }
})

</script>
