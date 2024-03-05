import { createApp } from 'vue';
import './assets/style.css';
import App from './App.vue';
import {createPinia} from "pinia";
import router from './router';
import ElementPlus from 'element-plus';
//import VForm3 from 'vform3-builds';



const app = createApp(App)

app.use(router);
app.use(createPinia());
app.mount('#app');
app.use(ElementPlus);
//app.use(VForm3)