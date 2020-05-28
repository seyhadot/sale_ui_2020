import LayoutNavbar from '@/layout/layoutNavbar'
const storeRouter = {
  path: '/stores',
  component: LayoutNavbar,
  meta: {
    title: 'stores',
    icon: 'stores'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/pages/stores/IndexStore'),
      name: 'Store',
      meta: { title: 'Store' }
    },
    {
      path: 'add',
      component: () => import('@/views/pages/stores/AddStore'),
      name: 'Add Store',
      meta: { title: 'New Store' }
    },
    {
      path: 'add/:id',
      component: () => import('@/views/pages/stores/AddStore'),
      name: 'Edit Store',
      meta: { title: 'Edit Store' }
    }
  ]
}

export default storeRouter
