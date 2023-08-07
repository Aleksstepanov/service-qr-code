/* eslint-disable no-promise-executor-return */
import mock from './mock'
import { fakeRequest } from 'src/utils'

const user = {
  lastName: 'Smith',
  firstName: 'John'
}

localStorage.setItem('user-test', JSON.stringify(user))

mock.onGet('api/test').reply(async () => {
  try {
    await fakeRequest(5000)
    const resUser = JSON.parse(localStorage.getItem('user-test'))
    return [200, { user: resUser }]
  } catch (error) {
    return [500, { message: 'Ошибка сервера', code: 500 }]
  }
})

mock.onPost('/api/test/mutate').reply(async (config) => {
  try {
    await fakeRequest(5000)
    const { lastName, firstName } = JSON.parse(config.data)
    localStorage.setItem('user-test', JSON.stringify({ lastName, firstName }))
    return [
      200,
      true
    ]
  } catch (error) {
    console.error(error)
    return [500, { message: 'Ошибка сервера', code: 500 }]
  }
})
