<template>
  <UiSection full-width items="items-center" align="align-center">
    <FormPageSignIn :disabled="isLoading" @submit-event="onSubmit" />
  </UiSection>
</template>
<script setup>
import { ref } from 'vue'
import { axios, generateToken } from 'src/utils'
import { useAuthStore } from 'src/stores/auth.store'
import { useRouter } from 'vue-router'
import { emitter } from 'src/plugins'

import UiSection from 'src/components/ui-section/'
import FormPageSignIn from './form'

const authStore = useAuthStore()
const $router = useRouter()

// state
const isLoading = ref(false)

// methods
const onSubmit = async ({ email, password }) => {
  isLoading.value = true
  try {
    const response = await axios.post('/api/account/sign-in', {
      email,
      password
    })
    if (response.status === 200) {
      const accessToken = generateToken()
      authStore.authenticate({ accessToken })
      const { user } = response?.data
      authStore.setUser({ user })
      isLoading.value = false
      $router.push({ name: 'page-dashboard' })
    }
  } catch (error) {
    console.log(error)
    emitter.emit('notify', {
      type: 'negative',
      message: 'Authentication error'
    })
    isLoading.value = false
  }
}
</script>
