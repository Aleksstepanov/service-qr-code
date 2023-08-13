<template>
  <div class="flex flex-center row">
    <div class="flex row wrap justify-start items-start content-start bg-white " style="min-height: 400px; width: 100%; padding: 24px;">

      <div  class="fit col-3 column wrap justify-between items-center content-start" style="overflow: hidden;">
        <q-input
          v-model="fields.fullName"
          outlined
          dense
          class="input "
          type="text"
          label="name"
          placeholder="Enter your name"
          :is-disabled="disabled"

        />
        <q-input
          outlined
          dense

          type="text"
          label="family name"
          :is-disabled="disabled"
        />
        <q-input
          outlined
          dense
          class="input"
          type="tel"
          mask="phone"
          label="Phone Number"
          :is-disabled="disabled"
        />
        <q-input  v-model="fields.email"
                  outlined
                  dense
                  type="email"
                  label="Email" />
        <q-input
          outlined
          dense
          class="input"
          type="text"
          label="Birth Date"
          mask="date"
          :is-disabled="disabled"
        />

      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useFormProps } from 'src/composables/form.js'

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
const fields = reactive({
  fullName: null,
  password: null
})

</script>
