import Vue from 'vue'
import App from './App'
import http from '@chunpu/http'
http.init({
  baseURL: 'http://116.85.20.14:8080', // 定义 baseURL, 用于本地测试
  wx // 标记是微信小程序用
})
http.interceptors.request.use(config => {
  console.log(config)
  config.headers['token'] = wx.getStorageSync('x-token');
  config.headers['Authorization'] = wx.getStorageSync('x-token');
  return config
})
http.interceptors.response.use(response => {
  if(response.data.status == '1404'){
    console.log('未登录', response.data.msg)
  }
  console.log(response, wx)
  return response
})
Vue.prototype.$http = http;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
