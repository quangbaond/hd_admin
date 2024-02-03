export const routes = [
  { path: '/', redirect: '/users' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'users',
        component: () => import('@/pages/users.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'users/:id',
        component: () => import('@/pages/user-detail.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'settings',
        component: () => import('@/pages/settings.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
        meta: { requiresAuth: true },

      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
        meta: { requiresAuth: false },

      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
        meta: { requiresAuth: false },

      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
        meta: { requiresAuth: false },

      },
    ],
  },
]


