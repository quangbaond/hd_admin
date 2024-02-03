import { createLogger, createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  plugins: [createLogger()],
  state() {
    return {
      user: {},
      isAuthenticated: false,
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    },
  },
})

export default function (app) {
  app.use(store)
}

export { store }

