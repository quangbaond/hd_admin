import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log(to)

  const isAuthenticated = window.localStorage.getItem('isAuthenticated') || store.state.isAuthenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/admin/login')
  } else {
    console.log('isAuthenticated', isAuthenticated)
    next()
  }
})
export default function (app) {
  app.use(router)
}
export { router }
