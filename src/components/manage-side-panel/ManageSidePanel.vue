<template>
  <form  @submit.prevent="onSubmit">

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
               :label="isNew? 'Создать': 'Сохранить'"

      />

      <UiBtn   dense
               flat
               round
               color="white"
               class="button button-colored__primary mt-16"
               label="CANCEL"
      />

      <UiBtn   disabled="true"
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
import { reactive } from 'vue'
import UiBtn from 'src/components/ui-btn'
import { useForm } from 'src/composables/form.js'
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
// state
const fields = reactive({
  email: null,
  password: null
})
// computed
const { submit } = useForm({
  fields

})

// methods
const onSubmit = async () => {
  const formData = await submit()
  if (formData) $emit('submit-panel', formData)
}
</script>
