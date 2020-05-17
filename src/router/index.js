import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/store'

Vue.use(Router)

import LayoutFull from '@/layout/layoutFull'
import LayoutNavbar from '@/layout/layoutNavbar'
// import LayoutNoMain from '@/layout/layoutNoMain'

const notFoundRoute = { path: '*', redirect: '/login' }
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    hidden: true
  },
  {
    path: '/',
    component: LayoutFull,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      },
      {
        path: 'user',
        component: () => import('@/views/User.vue'),
        name: 'User',
        meta: { title: 'User', icon: 'user' }
      }
    ]
  },
  {
    path: '/form',
    component: LayoutFull,
    children: [
      {
        path: '',
        component: () => import('@/views/Form.vue'),
        name: 'Form',
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/stores',
    component: LayoutNavbar,
    children: [
      {
        path: '',
        component: () => import('@/views/pages/stores/Index'),
        name: 'Store',
        meta: { title: 'Store', icon: 'store' }
      },
      {
        path: 'add',
        component: () => import('@/views/pages/stores/AddStore'),
        name: 'Add Store',
        meta: { title: 'New Store', icon: 'store' }
      },
      {
        path: 'add/:id',
        component: () => import('@/views/pages/stores/AddStore'),
        name: 'Edit Store',
        meta: { title: 'Edit Store', icon: 'store' }
      }

    ]
  },
  {
    path: '/products',
    component: LayoutFull,
    children: [
      {
        path: '',
        component: () => import('@/views/pages/products/index.vue'),
        name: 'Products',
        meta: { title: 'Products', icon: 'product' }
      },
      {
        path: 'add',
        component: () => import('@/views/pages/products/AddProduct.vue'),
        name: 'Add Product',
        meta: { title: 'New Product', icon: 'product' }
      },
      // {
      //   path: 'add/:id',
      //   component: () => import('../views/pages/stores/AddStore'),
      //   name: 'Edit Store',
      //   meta: { title: 'Edit Store', icon: 'store' }
      // }
    ]
  },
  {
    path: '/categories',
    component: LayoutFull,
    children: [
      {
        path: '',
        component: () => import('@/views/pages/categories/index.vue'),
        name: 'Category',
        meta: { title: 'Category', icon: 'category' }
      },
      {
        path: 'add',
        component: () => import('@/views/pages/categories/AddCategory.vue'),
        name: 'Add Category',
        meta: { title: 'New Category', icon: 'category' }
      },
      // {
      //   path: 'add/:id',
      //   component: () => import('../views/pages/stores/AddStore'),
      //   name: 'Edit Store',
      //   meta: { title: 'Edit Store', icon: 'store' }
      // }
    ]
  },

  {
    path: '/settings',
    name: 'Settings',
    component: LayoutFull,
    children: [
      {
        path: '',
        meta: {
          title: 'Settings',
          enName: 'Settings',
          khName: 'ការកំណត់'
          
        },
        component: () =>
          import ('../views/pages/settings/index.vue')
      },
      {
        path: "users/add",
        name: "add_user",
        meta: {
          title: 'New User',
          enName: "Add user",
          khName: "បង្កើតអ្នកប្រើប្រាស់"
        },
        component: () =>
          import ("../views/pages/settings/users/AddUser.vue")
      },
      {
        path: "users/:id/edit",
        name: "edit_user",
        meta: {
          enName: "Edit user",
          khName: "កែប្រែអ្នកប្រើប្រាស់"
        },
        component: () =>
          import ("../views/pages/settings/users/EditUser.vue")
      },
    ]

  },
  {
    path: '/not_authorize',
    name: 'not_authorize',
    meta: {
      enName: 'Not Authorize',
      khName: 'មិនមានសិទ្ធ'
    },
    component: () =>
      import ('../views/NotAuthorize')
  },
  { path: '*', redirect: '/login' }
]

export const asyncRoutes = []

const createRouter = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
createRouter.beforeEach((to, from, next) => {
  const exceptionRoutes = ['Login', 'Register', 'PrintOrder', 'printProductBarcode', 'TaxReport']
  if (exceptionRoutes.includes(to.name)) {
    if (store.state.user.user != null && !store.state.user.user.profile.approved) {
      next('/not_authorize')
    }
    next()
  } else if (store.state.user.user == null) {
    next('/login')
  }
  next()
})

export default createRouter
