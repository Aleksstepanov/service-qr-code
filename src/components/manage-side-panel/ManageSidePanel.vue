<template >
  <form  @submit.prevent="$emit('submit-panel')">

    <div>
      <q-input
        v-if="createdAt"
        dense
        outlined
        readonly
        type="text"
        label="created"
        :is-disabled="disabled"
      />
      <q-input
        outlined
        dense
        type="text"
        label="Update"
        :is-disabled="disabled"
      />
    </div>

    <slot></slot>
    <div>
      <UiBtn   dense
               :flat="flat"
               type="submit"
               round
               color="white"
               class="button button-colored__primary mt-16"
               :label="isNew? 'Create': 'Save'"

      />

      <UiBtn   dense
               flat
               round
               color="white"
               class="button button-colored__primary mt-16"
               label="CANCEL"
      />

      <UiBtn v-if="!isNew"
             disabled="true"
             :dense="true"
             :flat="flat"
             round
             color="primary"
             class="button button-white mt-16"
             label="DELETE"

      ><q-icon right name="delete" /></UiBtn>
    </div>

  </form>
</template>

<script setup>
// убрать icon, поставить текст по центру

import UiBtn from 'src/components/ui-btn'
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  }
})
// emits
const $emit = defineEmits('submit-panel')

// computed

// methods

</script>
