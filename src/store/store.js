import Vuex from 'vuex'
import Vue from 'vue'
import { OrderItems } from './order_items/order_items'
import { User } from './user/user'
import { provider } from '../service/provider'
import { i18n } from '../plugins/i18n'
import auth from './auth'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    orderItem: OrderItems,
    user: User,
    auth
  },
  state: {
    defaultModule: 'salewhat',
    count: 1,
    defaultLocale: 'km',
    company: {},
    orders: [],
    upDown: null,
    dropdownMenu: [
      {
        name: () => i18n.t('sale'),
        path: '/sale',
        icon: '',
        svg: '',
        isShowing: (roles) => provider.isAdmin(roles) || provider.isSuper(roles) || provider.isGM(roles) || provider.isCashier(roles) || provider.isDecore(roles)
      },
      {
        name: () => i18n.t('transactions'),
        path: '/transactions',
        icon: '',
        svg: '',
        isShowing: (roles) => provider.isAdmin(roles) || provider.isSuper(roles) || provider.isGM(roles) || provider.isCashier(roles) || provider.isDecore(roles)
      },
      {
        name: () => i18n.t('settings'),
        path: '/settings',
        icon: '',
        svg: '',
        isShowing: (roles) => provider.isAdmin(roles) || provider.isSuper(roles) || provider.isGM(roles)
      },
      {
        name: () => i18n.t('store'),
        path: '/stores',
        icon: '',
        svg: '',
        isShowing: (roles) => provider.isSuper(roles)
      },
      {
        name: () => i18n.t('reports'),
        path: '/reports',
        icon: '',
        svg: '',
        isShowing: (roles) => provider.isAdmin(roles) || provider.isSuper(roles) || provider.isGM(roles) || provider.isCashier(roles) || provider.isDecore(roles)
      }
    ]
  },
  mutations: {
    setCompany(state, payload) {
      state.company = payload
    },
    setUpDown(state, payload) {
      state.upDown = payload
    },
    setDefaultLocale(state, locale) {
      state.defaultLocale = locale
    },
    addOrder(state, payload) {
      state.orders.push(payload)
    },
    updateOrderStatus(state, payload) {
      let order = findOrder(state, payload)
      order.status = payload.status
      if (payload.partialPaid) {
        order.partialPaid = payload.partialPaid
      }
    },
    addPropToOrder(state, payload) {
      let order = findOrder(state, payload)
      for (let k in payload) {
        if (k === 'orderId') {
          order['_id'] = payload[k]
        } else {
          order[k] = payload[k]
        }
      }
    },
    removeOrder(state, id) {
      state.orders = state.orders.filter((o) => o._id !== id)
    },
    addItemToOrder(state, payload) {
      const { orderId, product } = payload
      state.orders.forEach((o) => {
        if (orderId === o._id) {
          o.status = 'tmp'
          const item = o.items.find((p) => p._id === product._id)
          if (item) {
            item.qty += 1
          } else {
            o.items.push({
              _id: product._id,
              qty: 1,
              type: product.type,
              price: product.price,
              name: product.name,
              imageUrl: product.imageUrl.map((o) => {
                o.imageSource = product.productSource
                return o
              }),
              discount: 0,
              discountType: 'percent'
            })
          }
        }
      })
    },
    editQty(state, payload) {
      const order = findOrder(state, payload)
      const item = order.items.find((p) => p._id === payload.product._id)
      item.qty = payload.product.qty
      order.status = 'tmp'
    },
    editPrice(state, payload) {
      const order = findOrder(state, payload)
      const item = order.items.find((p) => p._id === payload.product._id)
      item.price = payload.product.price
      order.status = 'tmp'
    },
    removeItem(state, payload) {
      const order = findOrder(state, payload)
      order.status = 'tmp'
      order.items = order.items.filter((item) => item._id !== payload.product._id)
    }
  }
})

const findOrder = (state, payload) => state.orders.find((o) => o._id === payload.orderId)
