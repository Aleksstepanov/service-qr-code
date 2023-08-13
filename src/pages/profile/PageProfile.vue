<template>
  <PagePreloader v-if="isLoading"/>
  <div class="full-width flex bg-white row plr-percent-2">
    <div class="col-8">
      <FormPageProfile/>
    </div>
    <div class="avatar"></div>
    <div class="col-4">
      <ManageSidePanel @submit.prevent="onSubmit"/>
    </div>
  </div>
  <!-- <q-card v-else
          class="my-card"
          flat
          bordered>
    <q-item>
      <q-item-section>
        <UiFieldVue>
          <q-item-label caption> {{ firstName }}{{ lastName }} </q-item-label>
        </UiFieldVue>
        <q-item-label>{{ userRole }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <FormPageProfile/>
    <q-card-section horizontal>
      <q-card-section> Email:{{ userEmail}} </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-4">
        {{ userDescription }}
      </q-card-section>
    </q-card-section>
    <ManageSidePanel >
      <UiField full-width class="pt-20"/>
    </ManageSidePanel>
  </q-card> -->
</template>
<script setup>

import { onMounted, ref } from 'vue' // computed,
import { useAuthStore } from 'src/stores/auth.store'
import { axios } from 'src/utils'
import { emitter } from 'src/plugins'
import PagePreloader from 'src/components/page-pre-loader'
import FormPageProfile from 'src/pages/profile/form-page-profile'
import ManageSidePanel from 'src/components/manage-side-panel'
const authStore = useAuthStore()

// state
const isLoading = ref(false)

// computed
// const userRole = computed(() => authStore?.getUser?.role || '')
// const lastName = computed(() => authStore?.getUser?.last_name || '')
// const firstName = computed(() => authStore?.getFirstName || '')
// const userEmail = computed(() => authStore?.getUser?.email || '')
// const userDescription = computed(() => authStore?.getUser?.text || '')

// methods
const fetchUser = async () => {
  isLoading.value = true
  try {
    const response = await axios.get('/api/account/me')
    const { user } = response?.data || {}
    authStore.setUser({ user })
    isLoading.value = false
  } catch (error) {
    console.log(error)
    emitter.emit('notify', {
      type: 'negative',
      message: 'Error me query'
    })
  }
}
const onSubmit = () => {
  console.log('submit')
}
// life hooks
onMounted(async () => await fetchUser())
</script>
