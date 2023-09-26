const metaPublic = { layout: 'LayoutPublic' }
// const metaAccount = { layout: 'LayoutDefault' }
const metaAccount = { layout: 'LayoutDefault', auth: true }

const routes = [
  {
    path: '/',
    redirect: { name: 'page-dashboard' }
  },
  {
    path: '/sign-in',
    name: 'page-sign-in',
    component: () => import('pages/sign-in'),
    meta: metaPublic
  },
  {
    path: '/dashboard',
    name: 'page-dashboard',
    component: () => import('pages/dashboard'),
    meta: metaAccount
  },
  {
    path: '/profile',
    name: 'page-profile',
    component: () => import('pages/profile'),
    meta: metaAccount
  },
  {
    path: '/admins',
    name: 'page-admins',
    component: () => import('pages/admins'),
    meta: metaAccount
  },
  {
    path: '/admin/:id',
    name: 'page-admin',
    props: (route) => ({ id: route.params.id }),
    component: () => import('pages/admin'),
    meta: metaAccount
  },
  {
    path: '/admin/new',
    name: 'page-admin-new',
    component: () => import('pages/admin'),
    meta: metaAccount
  },
  {
    path: '/providers',
    name: 'page-providers',
    component: () => import('pages/providers'),
    meta: metaAccount
  },
  {
    path: '/provider/:id',
    name: 'page-provider',
    props: (route) => ({ id: route.params.id }),
    component: () => import('pages/provider'),
    meta: metaAccount
  },
  {
    path: '/provider/new',
    name: 'page-provider-new',
    component: () => import('pages/provider'),
    meta: metaAccount
  }
]

export default routes
