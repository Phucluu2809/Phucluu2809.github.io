import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: App },
  { path: '/pokemon/:name', component: App, props: true } 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');
