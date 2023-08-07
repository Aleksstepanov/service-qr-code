<template>
  <UiSection full-width
             items="items-start"
             align="align-center"
             class="mt-20">
    <FormPageTest
      :is-loading="state.loading"
      :is-disabled="state.disabled"
      :data="state.user"
      @submit="onSubmit"
    />
  </UiSection>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { axios } from 'src/utils'
import UiSection from 'src/components/ui-section/'
import FormPageTest from './form'

// state
const state = reactive({
  user: null,
  disabled: false,
  loading: false,
  error: null
})

// methods
const fetchData = async () => {
  try {
    state.loading = true
    const { data } = await axios.get('api/test')
    state.user = data?.user
    state.loading = false
  } catch (error) {
    state.error = error
    state.loading = false
  }
}
const onSubmit = async ({ lastName, firstName }) => {
  try {
    state.disabled = true
    const response = await axios.post('/api/test/mutate', {
      lastName,
      firstName
    })
    if (response.status === 200) {
      state.user = null
      await fetchData()
    }
    state.disabled = false
  } catch (error) {
    state.error = error
    state.disabled = false
  }
}
// life hooks
onMounted(async () => {
  await fetchData()
})
</script>
