import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store/store'
import LayoutFull from '@/layout/layoutFull'

Vue.use(Router)

import productRouter from './modules/product'
import reportRouter from './modules/report'
import categoryRouter from './modules/category'
import settingRouter from './modules/setting'
import storeRouter from './modules/store'
import transactionRouter from './modules/transaction'

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
    name: 'Dashboard',
    meta: {
      title: 'Daashboard',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
        name: 'Dashboard',
      },
      {
        path: 'user',
        component: () => import('@/views/User.vue'),
        name: 'User',
        meta: { title: 'User' }
      },
      {
        path: '/form',
        component: () => import('@/views/Form.vue'),
        name: 'Form',
        meta: { title: 'Form' }
      },
    ]
  },
  storeRouter,
  settingRouter,
  categoryRouter,
  productRouter,
  reportRouter,
  transactionRouter,
  {
    path: '/not_authorize',
    name: 'not_authorize',
    meta: {
      enName: 'Not Authorize',
      khName: 'មិនមានសិទ្ធ'
    },
    component: () => import('../views/NotAuthorize')
  },
  { path: '*', redirect: '/login' }
]

export const asyncRoutes = []

const createRouter = new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

createRouter.beforeEach((to, _from, next) => {
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
