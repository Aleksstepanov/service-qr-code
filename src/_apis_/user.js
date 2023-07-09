/* eslint-disable no-promise-executor-return */
import mock from './mock'
import { fakeRequest } from 'src/utils'

const user = {
  email: 'admin@test.com',
  password: '123qwe'
}

mock.onPost('/api/account/sign-in').reply(async (config) => {
  try {
    await fakeRequest(1000)
    const { email, password } = JSON.parse(config.data)
    if (user.email === email && user.password === password) {
      return [200, {
        user: {
          email,
          role: 'admin',
          avatar: '/admin_avatar.jpg'
        }
      }]
    }
    return [401, { message: 'Неправильный логин и/или пароль', code: 401 }]
  } catch (error) {
    console.error(error)
    return [500, { message: 'Ошибка сервера', code: 500 }]
  }
})
