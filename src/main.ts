import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'

import '@/scss/main.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(createPinia())
// app.use(ElementPlus)
app.use(router)
app.mount('#app')
