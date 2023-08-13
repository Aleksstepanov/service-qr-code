/* eslint-disable no-promise-executor-return */
import mock from './mock'
import { fakeRequest } from 'src/utils'

const user = {
  email: 'admin@test.com',
  password: '123qwe'
}
const person = {
  email: 'admin@test.com',
  role: 'admin',
  avatar: '/admin_avatar.jpg',
  first_name: 'John',
  last_name: 'Doe',
  text: 'lorem ipsum'
}

mock.onPost('/api/account/sign-in').reply(async (config) => {
  try {
    await fakeRequest(1000)
    const { email, password } = JSON.parse(config.data)
    if (user.email === email && user.password === password) {
      return [200, {
        user: {
          ...person
        }
      }]
    }
    return [401, { message: 'Неправильный логин и/или пароль', code: 401 }]
  } catch (error) {
    console.error(error)
    return [500, { message: 'Ошибка сервера', code: 500 }]
  }
})
  .onAny().passThrough()

mock.onGet('/api/account/me').reply(async () => {
  try {
    await fakeRequest(2000)
    return [200, { user: person }]
  } catch (error) {
    return [500, { message: 'Ошибка сервера', code: 500 }]
  }
})
