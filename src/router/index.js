import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/store'

Vue.use(Router)

import LayoutFull from '@/layout/layoutFull'
import LayoutNavbar from '@/layout/layoutNavbar'
import LayoutNoMain from '@/layout/layoutNoMain'

const notFoundRoute = { path: '*', redirect: '/login' }
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    hidden: true
  },
  {
    path: '/',
    component: LayoutNoMain,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/Dashboard.vue'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      },
      {
        path: 'product',
        component: () => import('../views/Product.vue'),
        name: 'Product',
        meta: { title: 'Product', icon: 'product' }
      },
      {
        path: 'user',
        component: () => import('../views/User.vue'),
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
        component: () => import('../views/Form.vue'),
        name: 'Form',
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/store',
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
        component: () => import('../views/pages/stores/AddStore'),
        name: 'Add Store',
        meta: { title: 'Add Store', icon: 'store' }
      },
      {
        path: 'add/:id',
        component: () => import('../views/pages/stores/AddStore'),
        name: 'Edit Store',
        meta: { title: 'Edit Store', icon: 'store' }
      }

    ]
  },

  {
    path: '/settings',
    name: 'Settings',
    component: LayoutNavbar,
    children: [
      {
        path: '',
        meta: {
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
    console.log('inside else if ')
    next('/login')
  }
  next()
})

export default createRouter
