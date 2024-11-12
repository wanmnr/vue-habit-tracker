// main.js or main.ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Button, DatePicker } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App);
app.use(Button)
app.use(DatePicker)
app.mount('#app')
