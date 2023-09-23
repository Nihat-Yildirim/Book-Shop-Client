import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/reset.css';
import store from './store';
import router from './router';
import { appAxios } from "@/utils/appAxios";
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.config.globalProperties.$appAxios = appAxios;
app.mount('#app');