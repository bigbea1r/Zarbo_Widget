
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index.js'
import axios from 'axios'
// import config from 'C:\Users\olegp\OneDrive\Рабочий стол\Нежданчик\config.json';

// axios.defaults.baseURL = config.axiosConfig.baseURL;
// axios.defaults.headers.common = config.axiosConfig.headers.common;
// console.log(config.axiosConfig)
const app = createApp(App)
app.use(router)
app.config.globalProperties.$axios = axios
app.mount('#app')