import { required } from '@vuelidate/validators'

const requiredMsg = 'This fields is required'

export default () => {
  return {
    name: {
      required: {
        validator: required,
        message: requiredMsg
      }
    }
  }
}
