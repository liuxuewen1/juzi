<template>
  <div class="appointment">
    <div class="banner">
      <swiper :indicator-dots="indicatorDots" 
        :autoplay="autoplay" 
        :interval="interval" 
        :duration="duration" 
        :circular="circular" 
        @change="swiperChange" 
        @animationfinish="animationfinish" style="height: 400rpx;">
        <div v-for="(item,index) in imgUrls" :key="index">
          <swiper-item @click="toDetail">
            <image :src="item" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div class="bottom">
      <ul class="user-info mb30">
        <li @click="onClickGo('photo')">拍摄套系<i></i></li>
        <li @click="onClickGo('order')">套系场景<i></i></li>
        <li @click="onClickGo('collection')">选择影棚<i></i></li>
      </ul>
      <p>确认预约</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      imgUrls: [
        '/static/image/banner01.jpg',
        '/static/image/banner01.jpg',
        '/static/image/banner01.jpg'
      ]
    }
  },
  components: {
    // classification
  },

  methods: {
    swiperChange(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图发生了滑动');
    },
    animationfinish(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图滑动结束');
    }
  },

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
  height: 400rpx;
  /* box-sizing: border-box; */
}
.banner image{
  width:100%;
  height: 400rpx;
}
.bottom{
 padding: 30rpx;
}
.bottom p{
  background-color: #fbd465;
  font-size: 32rpx;
  color: #333;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  border-radius: 3rpx;
  margin-top: 30rpx;
}
.user-info{
  background-color: #fff;
  font-size: 28rpx;
  box-sizing: border-box;
  padding: 0 40rpx;
  color: #333;
  box-shadow:  0rpx 5rpx 10rpx #dfdfdf;
}
.user-info li{
  height: 120rpx;
  line-height: 120rpx;
  text-align: left;
  box-sizing: border-box;
  border-bottom: 1rpx solid #ddd;
}
.user-info li:nth-last-child(1){
  border: none;
}
.user-info li i{
  width: 14rpx;
  height: 28rpx;
  background: url(../../../static/image/icon/jiantou.png) no-repeat;
  background-size: 100% 100%;
  float: right;
  margin-top: 44rpx;
  margin-right: 1rpx;
}
</style>
