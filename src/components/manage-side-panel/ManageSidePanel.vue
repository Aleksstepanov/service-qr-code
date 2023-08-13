<template>
  <div class="flex column justify-between ">
    <q-input
      dense
      outlined
      class=" mt-16"
      type="text"
      label="created"
      :is-disabled="disabled"
    />
    <q-input
      outlined
      class="input mt-16"
      type="text"
      label="upd"
      :is-disabled="disabled"
    />
    <slot></slot>
    <UiBtn   dense
             :flat="flat"
             type="submit"
             round
             color="white"
             class="button button-primary mt-16"
             label="SAVE"
             @click="$emit('click:accept')"
             @submit="$emit('submit')"
    />

    <UiBtn   dense
             flat
             round
             color="white"
             class="button button-primary mt-16"
             label="CANCEL"/>

    <UiBtn   disabled="true"
             :dense="true"
             :flat="flat"
             round
             color="primary"
             class="button button-white mt-16"
             label="DELETE"/>
  </div>
</template>

<script setup>
// убрать icon, поставить текст по центру
import UiBtn from '../ui-btn/UiBtn.vue'
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
  }
})
</script>
