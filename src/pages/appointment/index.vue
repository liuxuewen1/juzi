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
        <li @click="onClickChose('Package')">
            拍摄套系
            <i></i>
            <span>{{packageName}}</span>
        </li>
        <li @click="onClickChose('Scene')">
            套系场景
            <i></i>
            <span v-if="showSceneArr.length">已选取{{showSceneArr.length}}个场景</span>
        </li>
        <li @click="onClickChose('Studio')">
            选择影棚
            <i></i>
            <span v-if="showStudioName">{{showStudioName}}</span>
        </li>
      </ul>
      <p @click="onAppoint">确认</p>
    </div>
    <div class="studio" v-if="showScene">
      <h3>选择场景</h3>
      <scene 
        :onSubmit='onSubmit' 
        :id="packageId"
        :checked="showSceneArr"
      />
    </div>
    <div class="studio height" v-if="showStudio">
      <h3>选择影棚</h3>
      <studio 
        :onSubmit='onSubmit'
        :mchId='mchId'
      />
    </div>
    <div :class="{ shadow: (showScene || showStudio)}" @click="onClosePopup"></div>
    
  </div>
</template>

<script>
import studio from "@/components/studio";
import scene from "@/components/scene";
import { promisify } from '@/utils/index' 
export default {
  data () {
    return {
      packageId: 0,
      packageName: '',
      showSceneArr: [],
      showStudioName: '',
      mchId: 0,
      showStudio: false,
      showScene: false,
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      imgUrls: [
        '/static/image/banner01.jpg',
        '/static/image/banner01.jpg',
        '/static/image/banner01.jpg'
      ],
      latitude: 0,
      longitude: 0
    }
  },
  components: {
    studio,
    scene
  },
  methods: {
    onAppoint(){
      if(!this.check()) return;

      const sceneArr = [];
      this.showSceneArr.forEach(item => sceneArr.push(item.id))
      const params = 'packageId='+this.packageId+'&backIds='+sceneArr.join(',')+'&mchId='+this.mchId;
      this.$http.get('/wechat/user/subOrder?'+params).then(res => {
        const data = res.data;
        if(data.status == 1000){
          // console.log(data.data.orderId, 666)
          wx.navigateTo({ url: '/pages/order-success/main?id=' + data.data.orderId });
        }
      })
    },
    check(){
      if(!this.packageId){
        wx.showToast({
          title: '请选择套系',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      if(!this.showSceneArr.length){
        wx.showToast({
          title: '请选择套系场景',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      if(!this.mchId){
        wx.showToast({
          title: '请选择拍摄商家',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      return true;
    },
    onClosePopup(){
      this.showScene = false;
      this.showStudio = false;
    },
    onSubmit(type, list, not_check){
      if(!not_check && list.length == 0) {
        wx.showToast({ title: '请选择~', icon: 'none' })
        return;
      }
      !not_check && (this['show' + type] = false);
      if(type === 'Scene'){
        this.showSceneArr = list;
      }else if(type === 'Studio'){
        // const data = this.dataAddress.addressList.filter(item => item.is_active === true);
        if(list.length === 1){
          this.showStudioName = list[0].name;
          this.mchId = list[0].id;
        }
      }
    },
    onClickChose(type){
      if(type === 'Package'){
        // 套餐
        wx.navigateTo({ url: '/pages/series/main' })
      }else if(type === 'Scene'){
        if(!this.packageId){
          wx.showToast({
            title: '请选择套系场景',
            icon: 'none',
            duration: 2000
          })
        }else{
          this['show' + type] = true;
        }
      }else if(type === 'Studio'){
        if(!this.packageId){
          wx.showToast({
            title: '请选择拍摄商家',
            icon: 'none',
            duration: 2000
          })
        }else{
          // this.getLocation();
          this.showStudio = true;
        }
      }
    },
    getLocation(callback){
      promisify(wx.getLocation)().then(res => {
        console.log(res);
        this.longitude = res.longitude;
        this.latitude = res.latitude;
        callback && callback();
      })
    },
    swiperChange(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图发生了滑动');
    },
    animationfinish(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图滑动结束');
    },
    init(){
      this.packageId = 0;
      this.packageName = '';
      this.showSceneArr = [];
      this.showStudioName = '';
      this.mchId = 0;
    }
  },
  onLoad(options) {
    this.showStudio = false;
    this.showScene = false;
    this.init();
    this.packageId = options.id;
    this.packageName = options.name;
  },
  onShow(e){
    const { id, name } = this.$root.$mp.page.data;
    if(id && name) {
      this.packageName = name; this.packageId = id;
    }
  },
}
</script>

<style scoped>
.appointment{
  position: relative;
}
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
.user-info li span{
  float: right;
  height: 120rpx;
  line-height: 120rpx;
  margin-right: 20rpx;
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
.studio{
  width: 100%;
  height: 980rpx;
  position: fixed;
  bottom:0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
.height{
  /*height: 630rpx;*/
}
.studio h3{
  background-color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 30rpx;
  color: #333;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #ccc;
}
.shadow{
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  z-index: 0;
}
</style>
