import { createRouter, createWebHistory } from 'vue-router'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import UserListView from '@/views/users/UserListView.vue'
import CreateUser from '@/components/users/CreateUser.vue'
// Asumo que crearás esta vista o usarás el mismo componente para probar
// import UserCreateView from '@/views/users/UserCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      // meta: { breadcrumb: 'Inicio' },
      children: [
        {
          path: 'usuarios',
          name: 'UserList',
          component: UserListView,
        },
        {
          path: 'nuevo',
          name: 'UserCreate',
          component: CreateUser,
        },
        {
          path: 'editar/:id',
          name: 'UserEdit',
          component: CreateUser,
          props: true,
        },
      ],
    },
  ],
})

export default router
