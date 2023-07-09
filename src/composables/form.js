import { unref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { deepClone } from '../utils'

export function useFormProps () {
  return {
    data: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    submitting: {
      type: Boolean,
      default: false
    }
  }
}

export function useForm ({
  fields,
  rules,
  data,
  composeFormData,
  beforeValidate,
  populate
}) {
  const isNew = computed(() => {
    return !data || !Object.values(data).some(val => !!val)
  })

  const validationSchema = computed(() => {
    const fields = Object.entries(rules).reduce((schema, [field, rules]) => {
      schema[field] = Object.entries(rules).reduce((validators, [name, options]) => {
        validators[name] = options.validator
        return validators
      }, {})
      return schema
    }, {})
    return { fields }
  })

  const $v = useVuelidate(validationSchema, { fields })

  const validationErrors = computed(() => {
    const errors = Object.keys(rules).reduce((allErrors, fieldName) => {
      const v = unref($v)
      if (!allErrors[fieldName]) allErrors[fieldName] = { invalid: false, message: null }
      if (!v.fields[fieldName].$dirty || v.fields[fieldName].$pending) return allErrors
      Object.entries(rules[fieldName]).forEach(([validatorName, validatorConfig]) => {
        if (
          !allErrors[fieldName].invalid &&
          v.fields[fieldName][validatorName].$invalid
        ) {
          allErrors[fieldName].invalid = true
          allErrors[fieldName].message = validatorConfig.message
        }
      })
      return allErrors
    }, {})
    return errors
  })

  const _populate = data => {
    Object.keys(fields).forEach(field => {
      const val = data?.[field]
      if (val !== undefined) fields[field] = val
    })
  }

  const _validate = async () => {
    return new Promise(resolve => {
      const v = unref($v)
      v.$reset()
      v.$touch()
      resolve(!v.fields.$error)
    })
  }

  const emitData = () => {
    const formData = composeFormData ? composeFormData(fields) : deepClone(fields)
    return formData
  }

  const _doSubmit = async () => {
    // execute pre-validation logic and exit if pre-validation didn't passed
    if (beforeValidate) {
      const next = await beforeValidate()
      if (!next) return
    }

    // validate the form and exit if validation didn't passed
    const isValid = await _validate()
    if (!isValid) return

    // emit and return form data if validation passed successfully
    return emitData()
  }

  const submit = async () => {
    try {
      return await _doSubmit()
    } catch (e) {}
  }

  return {
    isNew,
    $v,
    validationErrors,
    submit,
    populate: populate || _populate
  }
}
