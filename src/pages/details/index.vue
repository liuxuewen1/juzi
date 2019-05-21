<template>
  <div>
    <div v-if="!isLoading" class="container conBox" @click="clickHandle('test click', $event)">
      <!-- <a href="#" class="goPre"><i></i>美景成真照片商城</a> -->
      <div class="banner">
        <swiper :indicator-dots="indicatorDots" 
          :autoplay="autoplay" 
          :interval="interval" 
          :duration="duration" 
          :circular="circular" 
          @change="swiperChange" 
          @animationfinish="animationfinish" style="height: 400rpx;">
          <div v-for="item in detail.bannerList" :key="item.id">
            <swiper-item @click="onShowBig(item.imgPath)">
              <image mode='aspectFill' :src="item.imgPath" class="slide-image"/>
            </swiper-item>
          </div>
        </swiper>
      </div>
      <h3 class="title">{{detail.name}}
        <span>#{{detail.cateName}}</span>
      </h3>
      <div class="content">
        <div class="contItem">
          <h3 class="itemTit"><i>套图说明</i><span></span></h3>
          <p class="imgText"><text>{{detail.desc}}</text></p>
          <!-- <p class="imgText">“拍摄时间可依据您的需求灵活选择；</p>
          <p class="imgText">“拍摄完毕后，照片会同步到您的账号内；</p> -->
        </div>
        <div class="contItem">
          <h3 class="itemTit"><i>同类作品展示</i><span></span></h3>
          <ul class="photo">
            <li class="photo-item" v-for="item in detail.packageList" :key="item.id" >
              <img 
                mode='aspectFill'
                :src="item.imgPath"  
                class="photo-small"
                @click="onShowPackage(item.imgPath)"
              />
            </li>
          </ul>
          <!-- <div class="itemImg">
            <div class="itemImgLi" v-for="item in detail.packageList" :key="item.id"><img :src="item.imgPath" alt=""/></div>
          </div> -->
        </div>
        <game-rule />
      </div>
      <bottom-menu 
        v-if="isChose == 0"
        :packageid="detail.packageId" 
        :isstore="detail.isStore" 
        @goNext="clickActive" 
        :active-index="0">
      </bottom-menu>
      <div class="menu" @click="onChose(detail.name)" v-if="isChose == 1">
        <div class="chose">选择套系</div>
      </div>
    </div>
    <loadinga v-if="isLoading" />
  </div>
</template>

<script>
import classification from '@/components/classification' //大图
import smallImgItem from '@/components/smallImgItem' //小图
import bottomMenu from '@/components/bottom' //菜单
import gameRule from '@/components/gameRule' //
import loadinga from '@/components/loading'
export default {
  data () {
    return {
      id: 0,
      isChose: 0,
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      motto: 'Hello World',
      imgTit: '青春年华套图',
      describe: '科技风',
      userInfo: {},
      smallImg: require("../../../static/image/bigimg.jpg"),
      detail: { bannerList: [] },
      packageBannerList: [],
      isLoading: true
    }
  },
  components: {
    // card,
    classification,
    smallImgItem,
    bottomMenu,
    gameRule,
    loadinga
  },

  methods: {
    onShowPackage(cur){
      wx.previewImage({
        current: cur, // 当前显示图片的http链接
        urls: this.packageBannerList // 需要预览的图片http链接列表
      })
    },
    onShowBig(cur){
      let arrImg = [];
      this.detail.bannerList.forEach(item => arrImg.push(item.imgPath));
      wx.previewImage({
        current: cur, // 当前显示图片的http链接
        urls: arrImg // 需要预览的图片http链接列表
      })
    },
    onChose(name){
      wx.redirectTo({ url: '/pages/appointment/main?id='+this.id+'&name='+name })
    },
    swiperChange(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图发生了滑动');
    },
    animationfinish(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图滑动结束');
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
        this.isLoading = false;
        if(data.status == 1000){
          this.detail = data.data;
          wx.setNavigationBarTitle({
            title: this.detail.name 
          });
          let bannerList = [];
          this.detail.packageList.forEach(item => bannerList.push(item.imgPath));
          this.packageBannerList = bannerList; 
        }
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  onLoad(options) {
    this.id = options.id;
    this.isChose = options.chose == 1? 1 : 0; //0-非选择套餐 1-选择套餐
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
.imgText{
  height: auto;
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
  /* color: #e97d53; */
  float: right;
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


.photo{
  margin-left: 28rpx;
  padding: 20rpx 0rpx 0rpx 10rpx;
  border-left: 1px solid #f5f2f1;
  overflow: hidden;
}
.photo-item{
  float: left;
  width: 200rpx;
  height: 200rpx;
  margin-right: 10rpx;
  margin-bottom: 16rpx;
  overflow: hidden;
  position: relative;
}
.photo-item .photo-small{
  width: 200rpx;
  height: 200rpx;
}
.menu{
  width: 100%;
  height: 103rpx;
  box-sizing: border-box;
  /*padding: 14rpx 0 4rpx;*/
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #ed6c57;
  /*box-shadow:  0rpx -3rpx 20rpx #dfdfdf;*/
  display: flex;
}
.chose{
  text-align: center;
  color: #fff;
  margin: 0 auto;
  font-size: 32rpx;
  height: 103rpx;
  line-height: 103rpx;
}
</style>
