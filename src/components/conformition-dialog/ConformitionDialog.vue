<template>
  <q-dialog v-model="getShow" :persistent="persistent" :max-width="maxWidth">
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">{{ title }}</span>
      </q-card-section>

      <slot></slot>

      <q-card-actions align="right">
        <UiBtn v-if="titleCancel"
               :v-close-popup="true"
               color="primary"
               :label="titleCancel"
               @click="getShow = false"
        />
        <UiBtn
          :v-close-popup="true"
          color="red"
          :label="titleConfirm"
          @click="$emit('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'

import UiBtn from 'src/components/ui-btn'

// props
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  titleCancel: {
    type: String,
    default: null
  },
  titleConfirm: {
    type: String,
    default: 'Ok'
  },
  persistent: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: String,
    default: '30rem' // 1rem = 10px
  }
})

// emits
const $emit = defineEmits(['update:show', 'confirm'])

// computed
const getShow = computed({
  get: () => props.show,
  set: (val) => $emit('update:show', val)
})
</script>
