<template>
  <div class="appointment">
    <div class="banner">
      <textarea placeholder="您想对我们说..."></textarea>
    </div>
    <p><span>提交</span></p>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      // indicatorDots: true,
      // autoplay: true,
      // interval: 5000,
      // duration: 900,
      // circular: true
      // imgUrls: [
      //   '/static/image/banner01.jpg',
      //   '/static/image/banner01.jpg',
      //   '/static/image/banner01.jpg'
      // ]
    }
  },
  components: {
    // studio,
    // scene
  },

  methods: {},

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
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
  line-height: 300rpx;
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
