export const OrderItems = {
  state: {
    items: []
  },
  mutations: {
    addItem(state, payload) {
      state.items.push(payload)
    },
    removeItem(state, payload) {}
  },
  actions: {
    addItem(context, payload) {
      context.commit('addItem', payload)
    }
  }
}
