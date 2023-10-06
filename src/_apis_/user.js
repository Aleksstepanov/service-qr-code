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
  avatar:
    'data:image/jpeg;base64,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',
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
    return [401, { message: 'Wrong username and/or password', code: 401 }]
  } catch (error) {
    console.error(error)
    return [500, { message: 'Server error', code: 500 }]
  }
})

mock.onGet('/api/account/me').reply(async () => {
  try {
    await fakeRequest(2000)
    return [200, { user: person }]
  } catch (error) {
    return [500, { message: 'Server error', code: 500 }]
  }
})
