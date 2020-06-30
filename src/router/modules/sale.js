import layoutEmpty from '@/layout/layoutEmpty'

const saleRouter = {
  path: '/sales',
  component: layoutEmpty,
  redirect: '',
  name: 'Sales',
  meta: {
    title: 'Sales',
    enName: 'Sales',
    khName: 'ទំនិញ'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/pages/sales/indexSale.vue'),
      name: 'Sale',
      meta: { name: 'Sales' }
    },
    // {
    //   path: 'add',
    //   component: () => import('@/views/pages/sales/AddSale.vue'),
    //   name: 'Add Sale',
    //   meta: {
    //     title: 'New Sale',
    //     enName: 'New Sale',
    //     khName: 'បង្កើតទំនិញថ្មី'
    //   }
    // }
    // {
    //   path: 'add/:id',
    //   component: () => import('../views/pages/stores/AddStore'),
    //   name: 'Edit Store',
    //   meta: { title: 'Edit Store', icon: 'store' }
    // }
  ]
}
export default saleRouter
