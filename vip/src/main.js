import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './fonts/reset.css'
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'

// 导入图标
import './assets/xiaoz_icon/iconfont.css'

Vue.use(Vant)

axios.defaults.baseURL = 'http://127.0.0.1:1122/api/v1'
Vue.prototype.$http = axios

// 为axios添加拦截器
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  // Do something before request is sent
  if (token !== null) {
    config.headers.Authorization = 'Bearer' + token
  }
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
