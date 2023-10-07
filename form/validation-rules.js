import { required, helpers, minLength } from '@vuelidate/validators'

const requiredMsg = 'This fields is required'

export default () => {
  return {
    name: {
      required: {
        validator: required,
        message: requiredMsg
      },
      minLength: {
        validator: minLength(2),
        message: 'The minimum name length is 2 characters'
      },
      specialChar: {
        validator: (value) => {
          return !helpers.req(value) || /[a-zA-Z0-9+_@.-]/.test(value)
        },
        message: 'The'
      }
    },
    inn: {
      required: {
        validator: required,
        message: requiredMsg
      },
      minMaxLength: {
        validator: (value) => {
          if (value.length >= 10 && value.length <= 12 && !(value.length === 11)) return true
        },
        message: 'This field must contain 10 or 12 digits'
      }
    },
    rs: {
      required: {
        validator: required,
        message: requiredMsg
      },
      equal: {
        validator: (value) => {
          if (value.length === 23) return true
        },
        message: 'This field must contain 20 digits'
      }
    }

  }
}
// инн(equal), р счёт кол-во цифр, name 2 буквы, rs маска
