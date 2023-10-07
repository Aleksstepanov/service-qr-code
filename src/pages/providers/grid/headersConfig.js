import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

export const useProviderHeadersConfig = () => {
  const providerHeadersConfig = ref()
  const { t } = useI18n()
  const doProviderHeadersConfig = () => {
    providerHeadersConfig.value = [
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
        name: 'name',
        label: t('company_name'),
        align: 'left',
        field: 'name',
        style: 'width: 50%'
      },
      {
        name: 'rs',
        label: t('checking_account'),
        align: 'left',
        field: 'rs',
        style: 'width: 50%'
      },
      {
        name: 'inn',
        label: t('inn'),
        align: 'left',
        field: 'inn',
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
  watchEffect(doProviderHeadersConfig)
  return {
    providerHeadersConfig
  }
}
