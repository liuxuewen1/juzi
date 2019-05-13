<template>
  <div class="">
    <div class="banner">
      <textarea v-model="message" placeholder="您想对我们说..."></textarea>
    </div>
    <p @click="onSubmit"><span>提交</span></p>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  components: {
    
  },

  methods: {
    onSubmit(){
        if(!this.message) {
          wx.showToast({
            title: '请输入反馈内容~',
            icon: 'none',
            duration: 2000
          })
          return;
        }
        this.$http.post(`/wechat/user/subOpinion?message=${this.message}`).then(res => {
          const data = res.data;
          if(data.status == 1000){
            wx.showToast({
              title: '谢谢您的反馈，我们会尽快处理~',
              icon: 'success',
              duration: 2000
            })
          }
        })
    }
  },

  created () {
    
  },
  onLoad(options) {
  },
  mounted(){},
}
</script>

<style scoped>
.banner{
  width: 100%;
  /* height: 300rpx; */
  padding: 50rpx 50rpx 0;
  box-sizing: border-box;
  border-top:1px solid #f2f2f2;
  /*line-height: 300rpx;*/
  /* background-color: #fff; */
}
textarea{
  width: 100%;
  height: 500rpx;
  background-color: #f4f4f4;
  border-radius: 30rpx;
  padding: 20rpx;
  box-sizing: border-box;
}
p{
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  margin-top: 50rpx;
}
span{
  width: 300rpx;
  height: 100rpx;
  display: inline-block;
  background-color: #f9614a;
  color: #fff;
  border-radius: 50rpx;
}


</style>
