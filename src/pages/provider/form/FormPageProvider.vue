<template>
  <q-form class="full-width row flex justify-center" @submit="() => {}">
    <div :class="classList">
      <PageHeader :title="isNew ? 'Create new person' : 'Edit person'" />
      <div class="flex row ml-12">
        <div class="col-8">
          <div class="col-1 q-pb-md">
            <q-input
              v-model="fields.name"
              dense
              filled
              label="Company name *"
              type="text"
              :disable="isDisabled"
              :error-message="validationErrors.name.message"
              :error="validationErrors.name.invalid"
            />
          </div>

        </div>
      </div>
      <div class="flex row ml-12">
        <div class="col-8">
          <div class="col-1 q-pb-md">
            <q-input
              v-model="fields.inn"
              dense
              filled
              label="INN *"
              type="number"
              :disable="isDisabled"

            />
          </div>

        </div>
      </div>
      <div class="flex row ml-12">
        <div class="col-8">
          <div class="col-1 q-pb-md">
            <q-input
              v-model="fields.rs"
              dense
              filled
              label="Checking account"
              type="number"
              :disable="isDisabled"
            />
          </div>

        </div>
      </div>
    </div>
    <ManageSidePanel
      :is-new="isNew"
      :is-disabled="isDisabled"
      :created-at="createdAt"
      :updated-at="updatedAt"
      @click="onSubmit"
      @delete="$emit('delete')"
      @cancel="$emit('cancel')"
    />
  </q-form>
</template>
<script setup>
// пример rs 40817810099910004312 пример inn 6449013711
import { reactive, computed, watch, ref } from 'vue'
import { useForm, useFormProps } from 'src/composables/form'
import validationRules from 'src/pages/provider/form/validation-rules'

import PageHeader from 'src/components/page-header/PageHeader.vue'
import ManageSidePanel from 'src/components/manage-side-panel/ManageSidePanel.vue'

// emits
const $emit = defineEmits(['submit', 'delete', 'cancel'])

// props
const props = defineProps({
  col: {
    type: Number,
    default: 9
  },
  ...useFormProps(),
  isDisabled: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  }
})

// state
const fields = reactive({
  name: null,
  rs: null,
  inn: null

})
const createdAt = ref(null)
const updatedAt = ref(null)

// computed
const classList = computed(() => `col-${props.col}`)

// methods
const onSubmit = async () => {
  const formData = await submit()
  if (formData) {
    $emit('submit', {
      ...formData
    })
  }
}

const { validationErrors, submit, populate } = useForm({
  fields,
  rules: validationRules()
})

// watch
watch(
  () => props.data,
  val => {
    populate(val)
  }
)
// TODO добавить валидацию ИНН и расчётного счёта?
</script>
