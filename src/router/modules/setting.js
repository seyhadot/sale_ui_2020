import LayoutFull from '@/layout/layoutFull'

const settingRouter = {
  path: '/settings',
  name: 'Settings',
  component: LayoutFull,
  children: [
    {
      path: '',
      meta: {
        title: 'Settings',
        enName: 'Settings',
        khName: 'ការកំណត់'
      },
      component: () => import('@/views/pages/settings/index.vue')
    },
    {
      path: 'users/add',
      name: 'add_user',
      meta: {
        title: 'New User',
        enName: 'Add user',
        khName: 'បង្កើតអ្នកប្រើប្រាស់'
      },
      component: () => import('@/views/pages/settings/users/AddUser.vue')
    },
    {
      path: 'users/:id/edit',
      name: 'edit_user',
      meta: {
        title: 'Edit User',
        enName: 'Edit user',
        khName: 'កែប្រែអ្នកប្រើប្រាស់'
      },
      component: () => import('@/views/pages/settings/users/EditUser.vue')
    }
  ]
}
export default settingRouter;