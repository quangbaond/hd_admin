import App from '@/App.vue'
import { router } from '@/plugins/router'
import { registerPlugins } from '@core/utils/plugins'
import { createApp } from 'vue'

// Styles

// Create vue app
const app = createApp(App)
app.use(router)

// Register plugins
registerPlugins(app)

// Mount vue app
app.mount('#app')
