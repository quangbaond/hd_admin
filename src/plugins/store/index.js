import { createLogger, createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  plugins: [createLogger()],
  state() {
    return {
      user: {},
      isAuthenticated: false,
      snackbar: {
        type: false,
        message: 'alert',
        color: 'success',
        colorBtn: '#fff',
      },
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    },
    setSnackbar(state, payload) {
      state.snackbar.type = payload.type
      state.snackbar.message = payload.message
      state.snackbar.color = payload.color
    },
  },
})

export default function (app) {
  app.use(store)
}

export { store }

