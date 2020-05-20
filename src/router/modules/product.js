import LayoutFull from '@/layout/layoutFull'

const productRouter = {
  path: '/products',
  component: LayoutFull,
  redirect: '',
  name: 'Products',
  meta: {
    title: 'Products',
    enName: 'Products',
    khName: 'ទំនិញ'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/pages/products/IndexProduct.vue'),
      name: 'Product',
      meta: { name: 'Products' }
    },
    {
      path: 'add',
      component: () => import('@/views/pages/products/AddProduct.vue'),
      name: 'Add Product',
      meta: {
        title: 'New Product', enName: 'New Product',
        khName: 'បង្កើតទំនិញថ្មី'
      }
    },
    // {
    //   path: 'add/:id',
    //   component: () => import('../views/pages/stores/AddStore'),
    //   name: 'Edit Store',
    //   meta: { title: 'Edit Store', icon: 'store' }
    // }
  ]
}
export default productRouter;