import { ref, unref, isReactive, isRef, watchEffect } from 'vue'

export const useUser = user => {
  const lastName = ref()
  const firstName = ref()
  const avatar = ref()

  const doUser = () => {
    const userUnref = unref(user)
    lastName.value = userUnref?.last_name || ''
    firstName.value = userUnref?.first_name || ''
    avatar.value = userUnref?.avatar || ''
  }

  if (isReactive(user) || isRef(user)) {
    watchEffect(doUser)
  } else doUser()

  return {
    lastName,
    firstName,
    avatar
  }
}
