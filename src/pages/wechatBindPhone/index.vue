<template>
  <div class="center-warp">
      <button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {
    
  },

  methods: {
    getPhoneNumber(e) {
      const detail = e.mp.detail;
      if(detail.errMsg.indexOf('user deny') === -1){
        console.log(detail.iv)
        console.log(detail.encryptedData,1111)
        this.$http.post(`/wechat/user/bindPhone?encryptedData=${detail.encryptedData}&iv=${detail.iv}`).then(res => {
          console.log(res)
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
  padding-top: 300rpx;
}
</style>
