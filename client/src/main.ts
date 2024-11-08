// main.js or main.ts
import { createApp } from 'client/node_modules/vue/dist/vue.mjs'
import './style.css'
import App from './App.vue'

const app = createApp(App);
app.mount('#app')
