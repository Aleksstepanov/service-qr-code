<template>
  <div class="flex flex-center row">
    <div class="flex row wrap justify-start items-start content-start bg-white " style="min-height: 400px; width: 100%; padding: 24px;">
      <div id="parent" class="fit col-3 column wrap justify-between items-center content-start" style="overflow: hidden;">

        <q-input  v-model="fields.password"
                  outlined
                  label="Outlined" />
        <q-input  v-model="fields.password"
                  outlined
                  label="Outlined" />
        <q-input  v-model="fields.password"
                  outlined
                  label="Outlined" />
        <q-input  v-model="fields.password"
                  outlined
                  label="Outlined" />
        <q-input  v-model="fields.password"
                  outlined
                  label="Outlined" />
        <q-input  v-model="fields.password"
                  outlined
                  label="Outlined" />
        <q-input  v-model="fields.password"
                  outlined
                  label="Outlined" />
        <q-input  v-model="fields.password"
                  outlined
                  label="Outlined" />
      </div>
      <div id="parent" class="fit col-1 column wrap justify-between items-start content-start" style="overflow: hidden;">
        <q-item-section avatar>
          <q-avatar>
            <img src="/admin_avatar.jpg" >
          </q-avatar>
        </q-item-section>
      </div>
      <ManageSidePanel :disabled="disabled">
        <UiField full-width class="pt-20">
          <q-input
            outlined
            class="input"
            label="Email*"
            :is-disabled="disabled"
            :error-message="validationErrors.email.message"
            :error="validationErrors.email.invalid"
          />
        </UiField>
      </ManageSidePanel>
    </div>

  </div>

</template>
<script setup>

import { reactive } from 'vue'
import { useFormProps } from 'src/composables/form.js'
import ManageSidePanel from 'src/components/manage-side-panel.vue'
defineProps({
  ...useFormProps(),
  disabled: {
    type: Boolean,
    default: false
  }
})
const fields = reactive({
  email: null,
  password: null
})

</script>
