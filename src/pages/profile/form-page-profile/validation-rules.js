import { required, helpers, minLength, email } from '@vuelidate/validators'
const requiredMsg = 'This fields is required'

export default () => {
  return {
    fullName: {
      required: {
        validator: required,
        message: requiredMsg
      }
      //symbol, num, minLen3, maxL50
    },
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
      minLength: {
        validator: minLength(8),
        message: 'At least 8 characters long'
      },
      containsUppercase: {

        validator: (value) => {
          return !helpers.req(value) || /[A-Z]/.test(value)
        },
        message: 'Include at least one uppercase and lowercase letter'
      },
      containsLowercase: {

        validator: (value) => {
          return !helpers.req(value) || /[a-z]/.test(value)
        },
        message: 'Include at least one uppercase and lowercase letter'
      },
      containsNumber: {

        validator: (value) => {
          return !helpers.req(value) || /[0-9]/.test(value)
        },
        message: 'Include at least one uppercase and lowercase letter'
      },
      containsSpecial: {

        validator: (value) => {
          return !helpers.req(value) || /[@#$%^&+=]/.test(value)
        },
        message: 'Include at least one uppercase and lowercase letter'
      }
    }
  }
}
