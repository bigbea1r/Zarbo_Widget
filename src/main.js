import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from '@/router/index.js';
import axios from 'axios';
import config from '/config.json';

let linkWidget = axios.create(config.linkWidget);

const app = createApp(App);
app.use(router);
app.config.globalProperties.$axios = linkWidget; 
app.mount('#app');

export { linkWidget };