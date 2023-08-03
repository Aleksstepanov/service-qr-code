<template>
  <q-card class="my-card" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="/admin_avatar.jpg">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>Admin</q-item-label>
        <q-item-label caption>
          {{ firstName}}{{lastName }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section>
        Email:{{ user?.email }}

      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-4">
        {{ userDescription  }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { computed } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
const authStore = useAuthStore()
const lastName = computed(() => authStore?.getUser?.last_name || '')
const firstName = computed(() => authStore?.getFirstName || '')
const userDescription = computed(() => authStore?.getUser?.text || '')
</script>
