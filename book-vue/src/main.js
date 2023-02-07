import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import axios from 'axios'
import global from "@/assets/global.js";
Vue.prototype.$global = global;

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:9000/'
// 设置图片访问的端口

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
