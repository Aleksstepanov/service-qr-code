<template>
  <div class="layout layout--public">
    <slot ></slot>
  </div>
</template>
<script>
export default {
  name: 'LayoutPublic'
}
</script>
<style scoped>
.layout--public {
  display: flex;
  min-width: var(--app-min-width);
  height: 100vh;
}
</style>
