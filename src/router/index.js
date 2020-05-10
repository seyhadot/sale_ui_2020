import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import LayoutFull from '@/layout/layoutFull'
import LayoutNavbar from '@/layout/layoutNavbar'
import LayoutNoMain from '@/layout/layoutNoMain'

export const constantRoutes = [
  {
    path: '/login',
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
      },
    ]
  },
  {
    path: '/',
    component: LayoutFull,
    children: [
      {
        path: 'form',
        component: () => import('../views/Form.vue'),
        name: 'Form',
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/',
    component: LayoutNavbar,
    children: [
      {
        path: 'store',
        component: () => import('../views/Store.vue'),
        name: 'Store',
        meta: { title: 'Store', icon: 'store' }
      }
    ]
  }
]

export const asyncRoutes = []

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
const router = createRouter()

export default router
