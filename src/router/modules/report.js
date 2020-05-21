import LayoutFull from '@/layout/layoutFull'

const reportRouter = {
  path: '/reports',
  name: 'Reports',
  component: LayoutFull,
  meta: {
    title: 'Reports',
    enName: 'Reports',
    khName: 'របាយការណ៏'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/pages/reports/IndexReport.vue')
    },
  ]
}
export default reportRouter;