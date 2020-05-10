export const mixins = {
  methods: {
    currencySymbol(currency) {
      switch (currency) {
        case 'KHR':
          return '៛'
        case 'USD':
          return '$'
        case 'THB':
          return 'B'
      }
    }
  }
}
