import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
export const useAdminHeadersConfig = () => {
  const adminHeadersConfig = ref()
  const { t } = useI18n()
  const doAdminHeadersConfig = () => {
    adminHeadersConfig.value = [
      {
        name: 'num',
        label: '№',
        align: 'left',
        field: 'num',
        style: 'width: 15%'
      },
      {
        name: 'id',
        label: '#',
        align: 'left',
        field: 'id',
        style: 'width: 15%'
      },
      {
        name: 'fullName',
        label: t('user_name'),
        align: 'left',
        field: 'fullName',
        style: 'width: 50%'
      },
      {
        name: 'actions',
        label: t('actions'),
        align: 'left',
        style: 'width: 15%'
      }
    ]
  }
  watchEffect(doAdminHeadersConfig)
  return {
    adminHeadersConfig
  }
}
