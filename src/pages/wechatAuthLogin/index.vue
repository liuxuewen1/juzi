<template>
  <div class="center-warp">
    <button type="primary" open-type="getUserInfo" @getuserinfo="login">微信账号登录</button>
  </div>
</template>

<script>
import { promisify } from '@/utils/index' 
export default {
  data () {
    return {
    }
  },

  components: {
    
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
        wx.setStorageSync('x-token', res.data.data.token)
      })
    },

  },
  onLoad(options){
  }
}
</script>

<style scoped>
.center-warp{
  padding: 0 58rpx;
  padding-top: 300rpx;
}
</style>
