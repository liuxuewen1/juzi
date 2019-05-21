import Vue from 'vue'
import App from './App'
import http from '@chunpu/http'
http.init({
  // baseURL: 'http://116.85.20.14:8080', // 定义 baseURL, 用于本地测试
  baseURL: 'https://admin.meijingcz.com',
  wx // 标记是微信小程序用
})
http.interceptors.request.use(config => {
  console.log(config)
  const token = wx.getStorageSync('x-token');
  // if(!token){
  //   wx.navigateTo({ url: '/pages/wechatAuthLogin/main'})
  // }
  config.headers['token'] = token;
  config.headers['Authorization'] = token;
  return config
})
http.interceptors.response.use(response => {
  if(response.data.status == '1404'){
    console.log('未登录', response.data.msg)
    wx.navigateTo({ url: '/pages/wechatAuthLogin/main'})
    return;
  }
  if(response.data.status != 1000){
    wx.showToast({
      title: response.data.msg || '服务器开小差了~',
      icon: 'none',
      duration: 2000
    })
  }
  console.log(response, wx)
  return response
})
Vue.prototype.$http = http;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
