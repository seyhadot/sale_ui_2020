import Vue from 'vue'
import Router from 'vue-router'
import {store} from '../store/store'

Vue.use(Router)

import LayoutFull from '@/layout/layoutFull'
import LayoutNavbar from '@/layout/layoutNavbar'
import LayoutNoMain from '@/layout/layoutNoMain'

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
      },
      {
        path: 'store/add',
        component: () => import('../views/components/stores/AddStore'),
        name: 'Add Store',
        meta: {title: "Add Store", icon: 'store'}
      },
      {
        path: 'store/add/:id',
        component: () => import('../views/components/stores/AddStore'),
        name: 'Edit Store',
        meta: {title: "Edit Store", icon: 'store'}
      }
    ]
  },
  { path: '*', redirect: "/login" }
]

export const asyncRoutes = []

const createRouter = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
createRouter.beforeEach((to, from, next) => {
  const exceptionRoutes = [
    'Login',
    'Register',
    'PrintOrder',
    'printProductBarcode',
    'TaxReport'
  ]
  if (exceptionRoutes.includes(to.name)) {
    if (
      store.state.user.user != null &&
      !store.state.user.user.profile.approved
    ) {
      next('/not-authorize')
    }
    next()
  } else if (store.state.user.user == null) {
    next('/login')
  }
  next()
})



export default createRouter;
