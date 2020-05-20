import LayoutFull from '@/layout/layoutFull'

const settingRouter = {
  path: '/settings',
  name: 'Settings',
  component: LayoutFull,
  meta: {
    title: 'Settings',
    enName: 'Settings',
    khName: 'ការកំណត់'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/pages/settings/index.vue')
    },
    {
      path: 'users/add',
      name: 'add_user',
      meta: {
        title: 'New User',
      },
      component: () => import('@/views/pages/settings/users/AddUser.vue')
    },
    {
      path: 'users/:id/edit',
      name: 'edit_user',
      meta: {
        title: 'Edit User'
      },
      component: () => import('@/views/pages/settings/users/EditUser.vue')
    }
  ]
}
export default settingRouter;