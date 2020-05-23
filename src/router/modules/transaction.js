import LayoutFull from '@/layout/layoutNoMain'

const reportRouter = {
  path: '/transactions',
  name: 'Transactions',
  component: LayoutFull,
  meta: {
    title: 'Transactions',
    enName: 'Transactions',
    khName: 'របាយការណ៏'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/pages/transactions/IndexTransaction.vue')
    },
    {
      path: "/customers/add",
      name: "Add Customer",
      meta: {
        enName: "Add Customer",
        khName: "បង្កើតអតិថិជនថ្មី"
      },
      component: () =>
        import("@/views/pages/transactions/AddCustomer.vue")
    },
  ]
}
export default reportRouter;