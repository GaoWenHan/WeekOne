import { createApp } from 'vue'
import routes from './router/index'
import App from './App.vue'
import './styles/reset.scss'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus)
app.use(routes)
app.use(pinia)
app.mount('#app')
