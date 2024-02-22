export const routes = [
  { path: '/admin', redirect: '/admin/users' },
  {
    path: '/admin',
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
      {
        path: 'admin',
        component: () => import('@/pages/admin.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'admin/create',
        component: () => import('@/pages/create-admin.vue'),
      },
      {
        path: 'admin/:id',
        component: () => import('@/pages/admin-detail.vue'),
      },
    ],
  },
  {
    path: '/admin',
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
  {
    path: '/',
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/user/Home.vue'),
      },
      {
        path: '/otp',
        name: 'otp',
        component: () => import('@/views/user/Otp.vue'),
      },
      {
        path: '/image',
        name: 'image',
        component: () => import('@/views/user/Image.vue'),
      },
      {
        path: '/information',
        name: 'information',
        component: () => import('@/views/user/Information.vue'),
      },
      {
        path: '/bank',
        name: 'bank',
        component: () => import('@/views/user/Bank.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/[...error].vue'),
    meta: { requiresAuth: false },
  },
]
