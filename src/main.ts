import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
   .use(pinia)
   .use(Antd)
   .mount('#app')