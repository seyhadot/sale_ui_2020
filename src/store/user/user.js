export const User = {
  state: {
    token: '',
    user: null,
    activeStore: null,
    invoices: [],
    stores: []
  },
  mutations: {
    setInvoices(state, payload) {
      state.invoices = payload.invoices
    },
    setUser(state, payload) {
      state.token = payload.token
      state.user = payload.user
      state.stores = payload.user.stores.map((map) => ({
        _id: map._id,
        shortcutName: map.shortcutName,
        storeName: map.name,
        desc: map.desc
      }))
      state.activeStore = state.stores.length === 1 ? state.stores[0]._id : null
    },
    unSetUser(state) {
      state.user = null
      state.token = null
      state.stores = []
      state.activeStore = null
    },
    setActiveStore(state, payload) {
      state.activeStore = payload._id || payload.id
    }
  },
  actions: {
    setInvoices(context, payload) {
      context.commit('setInvoices', payload)
    },
    setUser(context, payload) {
      if (payload && payload.profile.approved) {
        context.commit('setUser', payload)
      }
    },
    unSetUser(context) {
      context.commit('unSetUser')
    },
    setActiveStore(context, payload) {
      context.commit('setActiveStore', payload)
    }
  }
}
