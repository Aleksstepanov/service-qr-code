<template>
  <div class="pr-12 pl-12 full-width row wrap justify-around items-start content-start bg-white " style="min-height: 400px;">
    <div class="column pt-24 col-xs-12 col-sm-12 col-md-7">
      <form >
        <q-input
          v-model="fields.fullName"
          outlined
          dense
          type="text"
          label="Full Name"
          class="full-width"
          placeholder="Enter your name"
          :is-disabled="disabled"
          :error-message="validationErrors.fullName.message"
          :error="validationErrors.fullName.invalid"

        />
        <q-input  v-model="fields.phone"
                  class="full-width mt-12"
                  outlined
                  dense
                  type="tel"
                  mask="phone"
                  label="Phone"
                  :is-disabled="disabled"
        />

        <q-input  v-model="fields.email"
                  class="full-width mt-12"
                  outlined
                  dense
                  type="email"
                  label="Email"
                  :is-disabled="disabled"
                  :error-message="validationErrors.email.message"
                  :error="validationErrors.email.invalid"
        />
        <q-input   v-model="fields.password"
                   class="full-width mt-12"
                   outlined
                   dense
                   type="password"
                   label="Password"
                   :is-disabled="disabled"
                   :error-message="validationErrors.password.message"
                   :error="validationErrors.password.invalid"
        />
        <q-input    v-model="fields.birthDate"
                    class="full-width mt-12"
                    outlined
                    dense
                    type="text"
                    label="Birth Date"
                    mask="date"
                    :is-disabled="disabled"
        />

      </form>

    </div>
    <div class=" column pt-24 col-xs-12 col-sm-12 col-md-4">
      <ManageSidePanel :is-new="false" @submit-panel="onSubmit"/>
    </div>

  </div>

</template>

<script setup>
import { reactive } from 'vue'
import { useForm, useFormProps } from 'src/composables/form.js'
import validationRules from './validation-rules.js'

import ManageSidePanel from 'src/components/manage-side-panel/ManageSidePanel.vue'

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
  phone: null,
  email: null,
  password: null,
  birthDate: null
})
// const onSubmit = () => {
//   $emit('update:user', fields)
// }
// computed
const { submit, validationErrors } = useForm({
  fields,
  rules: validationRules()
})

// methods
const onSubmit = async () => {
  const formData = await submit()
  if (formData) $emit('update:user', formData)
  console.log(formData)
}
</script>

<style scoped>

</style>
