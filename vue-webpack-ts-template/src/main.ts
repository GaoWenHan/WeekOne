import { createApp } from 'vue'
import routes from './router/index'
import App from './App.vue'
import './styles/reset.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(routes)
app.mount('#app')
