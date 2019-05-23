<template>
  <div class="center-warp">
      <logo />
      <button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</button>
  </div>
</template>

<script>
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
    getPhoneNumber(e) {
      const detail = e.mp.detail;
      if(detail.errMsg.indexOf('user deny') === -1){
        this.$http.post(`/wechat/user/bindPhone?encryptedData=${detail.encryptedData}&iv=${detail.iv}`).then(res => {
          const data = res.data;
          if(data.status == 1000){
            wx.navigateBack({ delta: 1 });
            wx.setStorageSync('x-phone', res.data.data.phone)
          }else{
            wx.navigateTo({ url: '/pages/wechatAuthLogin/main'});
          }
        })
      }
    },
    
  },
  onLoad(options){
  }
}
</script>

<style scoped>
.center-warp{
  padding: 0 58rpx;
  margin-top: 100rpx;
}
</style>
