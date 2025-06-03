import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './styles/reset.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
