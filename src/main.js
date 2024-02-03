import App from '@/App.vue'
import { router } from '@/plugins/router'
import { registerPlugins } from '@core/utils/plugins'
import { createApp } from 'vue'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'

// Create vue app
const app = createApp(App)
app.use(router)


// Register plugins
registerPlugins(app)

// Mount vue app
app.mount('#app')
