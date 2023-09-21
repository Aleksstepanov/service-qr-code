<template>
  <q-btn  push @click="$emit('click:avatar')">
    <q-avatar
      :size="size"
      class="cursor-pointer"

    >

      <img v-if="avatar" :src="avatar">

      <img v-else src="/public/icons/icons8-no-image-96.png">s

    </q-avatar>
  </q-btn>
</template>
<script setup>
import { computed } from 'vue'

// props
const props = defineProps({
  avatar: {
    type: String,
    default: null
  }
})

// emits
const $emit = defineEmits('click:avatar')

// computed
const size = computed(() => props.avatar ? '72px' : '32px')
</script>
