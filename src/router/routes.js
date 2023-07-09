const metaPublic = { layout: 'LayoutPublic' }
// const metaAccount = { layout: 'LayoutDefault' }
const metaAccount = { layout: 'LayoutDefault', auth: true }
const metaVideo = { layout: 'LayoutVideo', auth: true }

const routes = [
  {
    path: '/',
    redirect: { name: 'page-select-object' }
  },
  {
    path: '/sign-in',
    name: 'page-sign-in',
    component: () => import('pages/sign-in'),
    meta: metaPublic
  },
  {
    path: '/select-object',
    name: 'page-select-object',
    component: () => import('pages/select-object'),
    meta: metaAccount
  },
  {
    path: '/place-builder',
    name: 'page-place-builder',
    component: () => import('pages/place-builder'),
    meta: metaAccount
  },
  {
    path: '/camera',
    name: 'page-camera',
    component: () => import('pages/camera'),
    meta: metaAccount
  },
  {
    path: '/qr-code-scanner',
    name: 'page-qr-code-scanner',
    component: () => import('pages/qr-code-scanner'),
    meta: metaAccount
  },
  {
    path: '/record',
    name: 'page-record',
    component: () => import('pages/record'),
    meta: metaVideo
  },
  {
    pats: '/result-record',
    name: 'page-result-record',
    component: () => import('pages/result-record'),
    meta: metaAccount
  }
]

export default routes
