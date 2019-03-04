import Vue from 'vue'
import App from './index'
import VueTouch from 'vue-touch'


Vue.use(VueTouch, {name: 'v-touch'})
console.log(VueTouch);
VueTouch.config.swipe = {
    threshold: 100 //手指左右滑动距离
}
const app = new Vue(App)
app.$mount()
