<template>
  <LayoutBroker
    :layouts="layouts"
    :current="$route.meta.layout"
    :pageWrapperClasses="['layout__content']"
  />
</template>

<script setup>
import LayoutBroker from 'src/layouts/LayoutBroker.vue'
import layouts from 'src/layouts'
</script>
