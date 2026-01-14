import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局样式
import "normalize.css";
import "./assets/css/index.css";

import pinia from './stores'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
