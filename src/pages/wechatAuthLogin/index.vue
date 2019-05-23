<template>
  <div class="center-warp">
    <logo />
    <button type="primary" open-type="getUserInfo" @getuserinfo="login">微信账号登录</button>
  </div>
</template>

<script>
import { promisify } from '@/utils/index' 
import logo from '@/components/logo' 
export default {
  data () {
    return {
    }
  },

  components: {
    logo
  },

  methods: {
    getWxUser(){
      return promisify(wx.getUserInfo)()
    },
    getUserInfo () {
      return promisify(wx.getSetting)().then(res => {
        if (!res.authSetting['scope.userInfo']) {
          promisify(wx.authorize)({
            scope: 'scope.userInfo'
          }).then(res => {
            return this.getWxUser()
          })
        }else{
          return this.getWxUser()
        }
      })
    },
    login(){
      let user_info = null;
      this.getUserInfo().then(user => {
        user_info = user.userInfo;
        return promisify(wx.login)()
      }).then(({ code }) => {
        console.log(user_info)
        return this.$http.get('/wechat/user/login', { 
          params: { 
            js_code: code,
            name: user_info.nickName,
            sexId: user_info.gender,
            avatar: user_info.avatarUrl
          } 
        })
      }).then(res => {
        console.log(res, 'token')
        wx.setStorageSync('x-token', res.data.data.token)
        wx.setStorageSync('x-avatar', res.data.data.avatar)
        if(res.data.data.phone != '') wx.setStorageSync('x-phone', res.data.data.phone)
        wx.setStorageSync('x-name', res.data.data.nickName)
        wx.setStorageSync('x-gender', user_info.gender)
        wx.setStorageSync('x-city', user_info.province + '-' + user_info.city)
        wx.navigateBack({ delta: 1 });
      })
    },

  },
  onLoad(options){
    wx.removeStorageSync('x-token')
  }
}
</script>

<style scoped>
.center-warp{
  padding: 0 58rpx;
  margin-top: 100rpx;
}
</style>
