<template>
  <q-btn round push>
    <q-avatar
      :size="size"
      class="cursor-pointer"
      @click="$emit('click:avatar')"
    >

      <img v-if="avatar" :src="avatar">

      <img v-else src="/icons/icons8-no-image-96.png">

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
