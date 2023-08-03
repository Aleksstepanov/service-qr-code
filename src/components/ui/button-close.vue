<template>
  <q-card-actions align="right">
    <q-btn v-close-popup
           flat
           label="Cancel"
           color="primary" />
  </q-card-actions>

</template>
<script>
app.component('btn-close', {
  data() {
    return {

    }}
  props: {
    label: {
      String,
      required: true
    },
    type: {
      String,
      default: 'button'
    }

  }

</script>
<style lang="css" scoped>

</style>
