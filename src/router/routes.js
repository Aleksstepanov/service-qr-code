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
  }
]

export default routes
