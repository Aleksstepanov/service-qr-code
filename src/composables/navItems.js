import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

class NavItem {
  constructor (
    to = { name: '' },
    key,
    permissions = [],
    isDivider = false,
    text
  ) {
    this.to = to
    this.key = key
    this.permissions = permissions
    this.isDivider = isDivider
    this.text = text
  }
}

export const useNavItems = () => {
  const navItems = ref()
  const { t } = useI18n()

  const doNavItems = () => {
    navItems.value = [
      new NavItem(
        { name: 'page-admins' },
        'admins',
        ['READ_ALL_PAGES'],
        false,
        t('admins')
      ),
      new NavItem(
        { name: 'page-service-providers' },
        'service-providers',
        ['READ_SERVICE_PROVIDERS_PAGE'],
        false,
        t('service_providers')
      ),
      new NavItem(
        { name: 'page-payment-operators' },
        'payment-operators',
        ['READ_PAYMENT_OPERATORS_PAGE'],
        false,
        t('payment_operators')
      ),
      new NavItem(
        { name: 'page-report-operators' },
        'report-operators',
        ['READ_REPORT_OPERATORS_PAGE'],
        false,
        t('report_operators')
      )
    ]
  }

  watchEffect(doNavItems)

  return {
    navItems
  }
}
