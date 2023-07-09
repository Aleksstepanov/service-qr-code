<template>
  <q-form class="form-login" @submit="onSubmit">
    <div class="flex row justify-center">
      <p class="text-h1">Вход</p>
    </div>
    <UiField full-width class="pt-20">
      <q-input
        v-model="fields.email"
        outlined
        class="input"
        label="Email*"
        :is-disabled="disabled"
        :error-message="validationErrors.email.message"
        :error="validationErrors.email.invalid"
      />
    </UiField>
    <UiField full-width class="mt-28">
      <q-input
        v-model="fields.password"
        outlined
        class="input"
        label="Пароль*"
        :type="isTypeInputPassword ? 'password' : 'text'"
        :is-disabled="disabled"
        :error-message="validationErrors.password.message"
        :error="validationErrors.password.invalid"
      >
        <template v-slot:append>
          <q-icon
            :name="isTypeInputPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click.stop="isTypeInputPassword = !isTypeInputPassword"
          />
        </template>
      </q-input>
    </UiField>
    <div class="flex row justify-center full-width mt-28">
      <q-btn class="button button-primary" type="submit" :disable="disabled">
        <p class="text-button-primary q-mb-none">Войти</p>
      </q-btn>
    </div>
  </q-form>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useForm, useFormProps } from 'src/composables/form.js'
import validationRules from './validation-rules.js'
import UiField from 'src/components/ui-field'

// props
defineProps({
  ...useFormProps(),
  disabled: {
    type: Boolean,
    default: false
  }
})

// emits
const $emit = defineEmits('submit-event')

// state
const fields = reactive({
  email: null,
  password: null
})
const isTypeInputPassword = ref(true)

// computed
const { submit, validationErrors } = useForm({
  fields,
  rules: validationRules()
})

// methods
const onSubmit = async () => {
  const formData = await submit()
  if (formData) $emit('submit-event', formData)
}
</script>
