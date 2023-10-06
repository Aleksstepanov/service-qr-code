<template>
  <q-form class="full-width row flex justify-center" @submit="() => {}">
    <div :class="classList">
      <PageHeader :title="isNew ? 'Create new person' : 'Edit person'" />
      <div class="flex row ml-12">
        <div class="col-8">
          <div class="col-1 q-pb-md">
            <q-input
              v-model="fields.fullName"
              dense
              filled
              label="Full name *"
              type="text"
              :disable="isDisabled"
              :error-message="validationErrors.fullName.message"
              :error="validationErrors.fullName.invalid"
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
import { reactive, computed, watch, ref } from 'vue'
import { useForm, useFormProps } from 'src/composables/form'
import validationRules from './validation-rules'
// import { dayjs, emitter } from 'src/plugins'

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
  fullName: null
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
</script>
