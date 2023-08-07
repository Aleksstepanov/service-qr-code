<template>
  <q-form @submit.prevent="onSubmit">
    <div class="flex row justify-center">
      <p class="text-h1">{{ title }}</p>
    </div>
    <UiField full-width class="pt-20">
      <q-input
        v-model="fields.lastName"
        outlined
        class="input"
        label="Last name"
        :disable="isDisabled"
        :loading="isLoading"
      />
    </UiField>
    <UiField full-width class="pt-20">
      <q-input
        v-model="fields.firstName"
        outlined
        class="input"
        label="First name"
        :disable="isDisabled"
        :loading="isLoading"
      />
    </UiField>
    <div class="flex row justify-center full-width mt-28">
      <q-btn
        class="button button-primary"
        type="submit"
        :disable="isDisabled"
        :loading="isLoading"
      >
        <p class="text-button-primary q-mb-none">Сохранить</p>
      </q-btn>
    </div>
  </q-form>
</template>
<script setup>
import { reactive, watch } from 'vue'
import UiField from 'src/components/ui-field'

// props
const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Page Test'
  },
  data: {
    type: Object,
    default: () => null
  }
})

// emits
const $emit = defineEmits(['submit'])
// state
const fields = reactive({
  lastName: null,
  firstName: null
})

// methods
const onSubmit = () => {
  $emit('submit', {
    lastName: fields.lastName,
    firstName: fields.firstName
  })
}

// watch
watch(() => props.data, val => {
  fields.lastName = val?.lastName || null
  fields.firstName = val?.firstName || null
})
</script>
