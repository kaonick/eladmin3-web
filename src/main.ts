import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// import { router } from './router'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'

// Install the store instance as a plugin

// import "~/styles/index.scss";
import 'uno.css'
// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus,{
    size: Cookies.get('size') || 'small' // set element-ui default size
  })
app.mount('#app')
