import LayoutFull from '@/layout/layoutFull'

const productRouter = {
  path: '/products',
  component: LayoutFull,
  redirect: '',
  name: 'Products',
  meta: {
    title: 'Products',
    icon: 'products'
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
      meta: { title: 'New Product' }
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