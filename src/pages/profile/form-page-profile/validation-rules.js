import { required, helpers, minLength, maxLength, email } from '@vuelidate/validators'
const requiredMsg = 'This fields is required'
// const specialСhar = helpers.regex(/[@#$%^&+=]/)

export default () => {
  return {
    fullName: {
      required: {
        validator: required,
        message: requiredMsg
      },
      maxLength: {
        validator: maxLength(50),
        message: 'No more than 50 characters'
      },
      minLength: {
        validator: minLength(3),
        message: 'At least 3 characters long'
      },

      containsSpecial: {

        validator: (value) => {
          return !helpers.req(value) || !(/[@#$%^&+=]/.test(value))
        },
        message: 'Must not include special character'
      },
      containsNumber: {

        validator: (value) => {
          return !helpers.req(value) || !(/[0-9]/.test(value))
        },
        message: ' Must not include numbers'
      }
      //  minLen3, maxL50, must not include special characters, must not include numbers
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
        message: 'Include at least one digit'
      },
      containsSpecial: {

        validator: (value) => {
          return !helpers.req(value) || /[@#$%^&+=]/.test(value)
        },
        message: 'Include at least one special character'
      }
    }
  }
}
