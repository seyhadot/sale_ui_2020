import LayoutFull from '@/layout/layoutFull'

const categoryRouter = {
  path: '/categories',
  component: LayoutFull,
  redirect: '',
  name: 'Categories',
  meta: {
    title: 'Categories',
    icon: 'categories'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/pages/categories/IndexCategory.vue'),
      name: 'Categories'
    },
    {
      path: 'add',
      component: () => import('@/views/pages/categories/AddCategory.vue'),
      name: 'Add Category',
      meta: { title: 'New Category' }
    }
    // {
    //   path: 'add/:id',
    //   component: () => import('../views/pages/stores/AddStore'),
    //   name: 'Edit Store',
    //   meta: { title: 'Edit Store', icon: 'store' }
    // }
  ]
}
export default categoryRouter
