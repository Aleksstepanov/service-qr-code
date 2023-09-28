<template>
  <q-card :class="classList">
    <div class="full-height column no-wrap justify-center">
      <div v-if="!isNew" :class="classContent">
        <q-item-section v-if="createdAt" class="q-pl-sm">
          <div class="q-pl-sm">
            <q-item-label caption>Created:</q-item-label>
          </div>
          <q-item class="q-pl-lg q-pt-none full-width">
            <q-input
              :model-value="createdAt"
              dense
              filled
              full-width
              type="text"
              readonly
            />
          </q-item>
        </q-item-section>
        <q-item-section v-if="updatedAt">
          <div class="q-pl-sm">
            <q-item-label caption>Updated:</q-item-label>
          </div>
          <q-item class="q-pl-lg q-pt-none full-width">
            <q-input
              :model-value="updatedAt"
              dense
              filled
              full-width
              type="text"
              readonly
            />
          </q-item>
        </q-item-section>
      </div>
      <div class="col-1"><q-separator v-if="createdAt || updatedAt" /></div>
      <q-separator v-if="!isNew" />
      <div class="col-3 q-pt-md">
        <div class="col-1 q-pl-sm q-pr-sm">
          <UiBtn
            class="full-width"
            dense
            :disable="disabled"
            :label="isNew ? 'Create' : 'Save'"
            type="submit"
            color="primary"
            @click="$emit('submit')"
          />
        </div>
        <div v-if="!isNew" class="col-1 q-pt-sm">
          <UiBtn
            class="full-width"
            flat
            dense
            :disable="disabled"
            label="Delete"
            color="red"
            @click="$emit('delete')"
          />
        </div>
        <div class="col-1 q-pl-sm q-pr-sm q-pt-sm">
          <UiBtn
            class="full-width"
            dense
            :disable="disabled"
            label="Cancel"
            @click="$emit('cancel')"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

import UiBtn from 'src/components/ui-btn'
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: String,
    default: null
  },
  updatedAt: {
    type: String,
    default: null
  },
  isNew: {
    type: Boolean,
    default: false
  },
  col: {
    type: Number,
    default: 3
  }
})
// emits
const $emit = defineEmits('submit-panel', 'delete')

// computed
const classList = computed(() => `col-${props.col}`)
const classContent = computed(() => {
  if (!props.isNew) return 'full-height column no-wrap justify-center mt-12'
  return 'full-height column no-wrap justify-start'
})
// methods
</script>
