<template>
  <div class="form-page__wrapper bg-white " style="min-height: 400px;">
    <div class="form__wrapper">
      <form @submit.prevent="onSubmit">
        <q-input
          v-model="fields.fullName"
          outlined
          dense
          type="text"
          label="Name"
          class="full-width"
          placeholder="Enter your name"
          :is-disabled="disabled"

        />

        <q-input
          class="full-width"
          outlined
          dense
          type="tel"
          mask="phone"
          label="Phone"
          :is-disabled="disabled"
        />

        <q-input  v-model="fields.email"
                  class="full-width"
                  outlined
                  dense
                  type="email"
                  label="Email"
        />
        <q-input   class="full-width"
                   outlined
                   dense
                   type="text"
                   label="Birth Date"
                   mask="date"
                   :is-disabled="disabled"
        />
        <UiBtn   dense
                 :flat="flat"
                 :disable="disabled"
                 type="submit"
                 round
                 color="white"
                 class="button button-colored__primary"
                 label='Сохранить'

        />
      </form>

    </div>
    <div class="manage-side-panel__wrapper">
      <ManageSidePanel @submit="onSubmit"/>
    </div>

  </div>

</template>

<script setup>
import { reactive } from 'vue'
import { useFormProps } from 'src/composables/form.js'
import ManageSidePanel from 'src/components/manage-side-panel/ManageSidePanel.vue'
import UiBtn from 'src/components/ui-btn/UiBtn.vue'
defineProps({
  ...useFormProps(),
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const $emit = defineEmits(['update:user'])
const fields = reactive({
  fullName: null,
  password: null
})
const onSubmit = () => {
  $emit('update:user', fields)
}
</script>

<style scoped>
.form-page__wrapper{
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px;
}
.form__wrapper{
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding-top: 24px;
  width: 60%;
}

.manage-side-panel__wrapper{
  display: flex;
  flex-direction: column;
  gap: 12rem;
  padding-top: 24px;
  width: 30%;
}
</style>
