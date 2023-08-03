<template>
  <PagePreloader v-if="isLoading"/>
  <q-card v-else
          class="my-card"
          flat
          bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="/admin_avatar.jpg" >
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>Admin</q-item-label>
        <q-item-label caption> {{ firstName }}{{ lastName }} </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section> Email:{{ user?.email }} </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-4">
        {{ userDescription }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
import { axios } from 'src/utils'
import { emitter } from 'src/plugins'

import PagePreloader from 'src/components/page-pre-loader'
const authStore = useAuthStore()

// state
const isLoading = ref(false)

// computed
const lastName = computed(() => authStore?.getUser?.last_name || '')
const firstName = computed(() => authStore?.getFirstName || '')
const userDescription = computed(() => authStore?.getUser?.text || '')

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
// life hooks
onMounted(async () => await fetchUser())
</script>
