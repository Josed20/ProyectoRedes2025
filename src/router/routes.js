const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
        meta: { title: 'Inicio - Herramientas de Redes IP' }
      },
      {
        path: 'ip-converter',
        name: 'ip-converter',
        component: () => import('pages/IpConverterPage.vue'),
        meta: { title: 'Conversor de IP' }
      },
      {
        path: 'subnet-calculator',
        name: 'subnet-calculator',
        component: () => import('pages/SubnetCalculatorPage.vue'),
        meta: { title: 'Calculador de Subredes' }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
