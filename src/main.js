import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/reset.css';
import store from './store';
import router from './router';
import toastrPlugin from './plugins/toastrPlugin';
import appAxios from "@/utils/appAxios";
import '@/assets/style.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(toastrPlugin);
app.config.globalProperties.$appAxios = appAxios;
app.mount('#app');