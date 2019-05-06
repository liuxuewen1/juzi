<template>
  <div class="container conBox" @click="clickHandle('test click', $event)">
    <a href="#" class="goPre"><i></i>嗨拍照片商城</a>
    <div class="banner">
      <swiper :indicator-dots="indicatorDots" 
        :autoplay="autoplay" 
        :interval="interval" 
        :duration="duration" 
        :circular="circular" 
        @change="swiperChange" 
        @animationfinish="animationfinish" style="height: 400rpx;">
        <div v-for="(item,index) in detail.bannerList" :key="item.id">
          <swiper-item>
            <image :src="item.imgPath" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <h3 class="title">{{detail.name}}<span class="red">¥500/套</span></h3>
    <div class="content">
      <div class="contItem">
        <h3 class="itemTit"><i>套图说明</i><span></span></h3>
        <p class="imgText">{{detail.desc}}</p>
        <!-- <p class="imgText">“拍摄时间可依据您的需求灵活选择；</p>
        <p class="imgText">“拍摄完毕后，照片会同步到您的账号内；</p> -->
      </div>
      <div class="contItem">
        <h3 class="itemTit"><i>同类作品展示</i><span></span></h3>
        <div class="itemImg">
          <div class="itemImgLi" v-for="(item,index) in imgUrls" :key="index"><img :src="item" alt=""/></div>
        </div>
      </div>
      <div class="contItem">
        <h3 class="itemTit"><i>玩法介绍</i><span></span></h3>
        <div class="itemLast">
          <image src="/static/image/flow.jpg" alt="" style="width:100%;display: block;" mode="widthFix"/>
          <p>预约完成后获得二维码，找到附近的嗨拍全方位激光数字影棚；</p>
          <p>在影棚扫一扫预约二维码，按照工作人员的指引，即可开始您的拍摄旅程；</p>
          <p>您可按照我们的样片进行拍摄，也可自创拍摄动作；</p>
          <p>付费并拍摄完成后，即可在小程序内看到您的照片；</p>
        </div>
      </div>
    </div>
    <bottom-menu 
      :packageid="detail.packageId" 
      :isstore="detail.isStore" 
      @goNext="clickActive" 
      :active-index="0">
    </bottom-menu>
    
  </div>
</template>

<script>
import classification from '@/components/classification' //大图
import smallImgItem from '@/components/smallImgItem' //小图
import bottomMenu from '@/components/bottom' //菜单
export default {
  data () {
    return {
      id: 0,
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      imgUrls: [
        '/static/image/banner01.jpg',
        '/static/image/banner01.jpg',
        '/static/image/smallimg.jpg'
      ],
      motto: 'Hello World',
      imgTit: '青春年华套图',
      describe: '科技风',
      userInfo: {},
      smallImg: require("../../../static/image/bigimg.jpg"),
      detail: {}
    }
  },
  components: {
    // card,
    classification,
    smallImgItem,
    bottomMenu
  },

  methods: {
    swiperChange(e) {
      console.log('第' + e.mp.detail.current + '张轮播图发生了滑动');
    },
    animationfinish(e) {
      console.log('第' + e.mp.detail.current + '张轮播图滑动结束');
    },
    clickActive(index){
      console.log(index);
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      // console.log('clickHandle:', msg, ev)
    },
    getData(){
      this.$http.get('/wechat/package/detail?id=' + this.id).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.detail = data.data;
          console.log(this.detail)
        }
      })
      // this.$http.get('/wechat/user/orderDetail?orderId=2').then(res => {
      //   const data = res.data;
      //   if(data.status == 1000){
      //     this.detail = data.data;
      //     console.log(this.detail)
      //   }
      // })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  onLoad(options) {
    this.id = options.id;
  },
  mounted(){
    this.getData()
  },
}
</script>

<style scoped>
.conBox{
  padding-bottom:50rpx;
  /* position: relative; */
}
img{
  display: block;
}
.swiper{
  height: 400rpx;
}
/* .data-v-60f3f098{
  height: 400rpx;
} */
.slide-image{
  width: 100%;
  height: 100%;
}
.banner{
  width: 100%;
  height: 400rpx;
  box-sizing: border-box;
}
.banner img{
  width:100%;
  height: 400rpx;
}
.content{
  box-sizing: border-box;
  width: 100%;
  padding: 20rpx 30rpx 103rpx;
  position: relative;
}
.title{
  width: 100%;
  box-sizing: border-box;
  padding: 0 30rpx;
  height: 100rpx;
  line-height: 100rpx;
  text-align: left;
  background-color: #f2f2f2;
  font-size: 36rpx;
  color: #333;
}
.title span{
  color: #e97d53;
  float: right;
}
.itemTit{
  width: 100%;
  height: 64rpx;
  line-height: 64rpx;
  font-size: 28rpx;
  color: #999;
  position: relative;
}
.itemTit i{
  position: relative;
  display: inline-block;
  z-index: 2;
  height: 100%;
  padding-right: 25rpx;
  background-color: #fff; 
}
.itemTit span{
  position: absolute;
  right: 0;
  top: 30rpx;
  width: 100%;
  height: 1rpx;
  background-color: #ddd;
}
.imgText{
  height: 54rpx;
  width: 100%;
  font-size: 28rpx;
  color: #333;
}
.itemImg{
  padding-top: 17rpx;
  box-sizing: border-box;
  height: 197rpx;
  display: flex;
}
.itemImg .itemImgLi{
  text-align: center;
  flex: 1;
}
.itemImg image{
  width: 200rpx;
  height: 180rpx;
  display: inline-block;
  /* margin-right:  */
}
.itemLast image{
  margin-bottom:17rpx;
}
.itemLast p{
  font-size: 28rpx;
  color: #333;
  padding-left: 18rpx;
  line-height: 48rpx;
  position: relative;
}
.itemLast p::before{
  content: "";
  width: 7rpx;
  height: 7rpx;
  background-color: #333;
  border-radius: 100%;
  position: absolute;
  left: 0;
  top:28rpx;
}
.goPre{
  padding-left: 30rpx;
  font-size: 36rpx;
  text-align: left;
  width: 100%;
  margin-bottom: 20rpx;
}
.goPre i{
  width: 14rpx;
  height: 28rpx;
  margin-right: 16rpx;
  display: inline-block;
  background: url("../../../static/image/icon/arrow.png") 0 0 no-repeat;
  background-size:100%;

}
</style>
