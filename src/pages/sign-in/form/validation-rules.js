import { required, maxLength, email } from '@vuelidate/validators'

const requiredMsg = 'Это поле обязательно'

export default () => {
  return {
    email: {
      required: {
        validator: required,
        message: requiredMsg
      },
      email: {
        validator: email,
        message: 'Введите корректный адрес электронной почты'
      }
    },
    password: {
      required: {
        validator: required,
        message: requiredMsg
      },
      maxLength: {
        validator: maxLength(8),
        message: 'Максимальная длина пароля составляет 8 символов'
      }
    }
  }
}
