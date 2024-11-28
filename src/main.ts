// main.js or main.ts

/** Vue core imports */
import { createApp } from 'vue'
import App from './App.vue'

/** Router and Store */
import router from './router'

/** Third-party plugins/libraries and their styles */
import { Button, DatePicker } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

/** Global styles */
import './style.css'

const app = createApp(App)

app.use(router)
app.use(Button)
app.use(DatePicker)

app.mount('#app')