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

export const navListSideBar = [
  new NavItem(
    { name: 'page-admins' },
    'admins',
    ['READ_SERVICE_PROVIDERS_PAGE'],
    false,
    'Администраторы'
  ),
  new NavItem(
    { name: 'page-providers' },
    'service-providers',
    ['READ_SERVICE_PROVIDERS_PAGE'],
    false,
    'Поставщики услуг'
  ),
  new NavItem(
    { name: 'page-payment-operators' },
    'payment-operators',
    ['READ_PAYMENT_OPERATORS_PAGE'],
    false,
    'Операторы пунктов приёма платежей'
  ),
  new NavItem(
    { name: 'page-report-operators' },
    'report-operators',
    ['READ_REPORT_OPERATORS_PAGE'],
    false,
    'Операторы отчетов'
  )
]
