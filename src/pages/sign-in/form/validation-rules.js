import { required, maxLength, email } from '@vuelidate/validators'

const requiredMsg = 'This fields is required'

export default () => {
  return {
    email: {
      required: {
        validator: required,
        message: requiredMsg
      },
      email: {
        validator: email,
        message: 'Enter a valid email address '
      }
    },
    password: {
      required: {
        validator: required,
        message: requiredMsg
      },
      maxLength: {
        validator: maxLength(8),
        message: 'The maximum password length is 8 characters'
      }
    }
  }
}
