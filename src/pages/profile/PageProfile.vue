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
          {{ user.first_name}}{{ user.last_name }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section>
        Email:{{ user.email }}

      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-4">
        {{ lorem }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script setup>
</script>
