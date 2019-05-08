<template>
  <div class="container">
    <div class="banner">
      <swiper :indicator-dots="indicatorDots" 
        :autoplay="autoplay" 
        :interval="interval" 
        :duration="duration" 
        :circular="circular" 
        @change="swiperChange" 
        @animationfinish="animationfinish" style="height: 400rpx;">
        <div v-for="(item,index) in bannerData" :key="index">
          <swiper-item @click="toDetail">
            <image :src="item.imgPath" class="slide-image"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div class="content">
      <div class="search">
        <div class="index-search" alt="" @click="onFocusSearch" />
        <!-- <div class="searchInput">
          <span class="searchIcon"></span>
          <input type="text" @focus="onFocusSearch" placeholder="搜索">
        </div> -->
      </div>
      <div class="menu-container" ref="menuContainer">    
        <ul class="classList">
          <li v-for="item in classType" :key="item.key">
            <span class="imgIcon" :style="{'backgroundImage': 'url('+item.imgPath+')'}"></span>
            <h3>{{item.name}}</h3>
          </li>
        </ul>
      </div>
      <ul class="method">
        <li @click="onGoAssistant"><i class="first"></i><span>拍摄助手</span></li>
        <li @click="onGoAppointment"><i class="second"></i><span>预约拍摄</span></li>
      </ul>
      <div class="innerItem" v-if="hotData.packageList.length">
        <h3>{{hotData.title}}推荐<span>查看更多<i></i></span></h3>
        <div class="innerCont">
          <ul class="innerList mt20">
            <li @click="onGoDetail(item.id)" :class="idx%2!=0?'':'mr40'" v-for="(item,idx) in hotData.packageList" :key="item.id"><img :src="item.imgPath" alt=""><p>{{item.name}}</p></li>
          </ul>
        </div>
      </div>
      <div class="innerItem" v-if="jxData.packageList.length">
        <h3>{{jxData.title}}推荐<span>查看更多<i></i></span></h3>
        <div class="innerCont">
          <ul class="innerList mt20">
            <li @click="onGoDetail(item.id)" :class="idx%2!=0?'':'mr40'" v-for="(item,idx) in jxData.packageList" :key="item.id"><img :src="item.imgPath" alt=""><p>{{item.name}}</p></li>
          </ul>
        </div>
      </div>
      <div class="innerItem" v-if="categoryData.packageList.length">
        <h3>{{categoryData.title}}推荐<span>查看更多<i></i></span></h3>
        <div class="innerCont">
          <ul class="innerList mt20">
            <li @click="onGoDetail(item.id)" :class="idx%2!=0?'':'mr40'" v-for="(item,idx) in categoryData.packageList" :key="item.id"><img :src="item.imgPath" alt=""><p>{{item.name}}</p></li>
          </ul>
        </div>
      </div>
      <!-- <button open-type="getUserInfo" @getuserinfo="login">获取用户信息</button>
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机号</button> -->
    </div>
  </div>
</template>

<script>
import { promisify } from '@/utils/index' 
export default {
  data () {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      bannerData: [],
      classType: [],
      motto: 'Hello World',
      imgTit: '青春年华套图',
      describe: '科技风',
      userInfo: {},
      smallImg: require("../../../static/image/bigimg.jpg"),
      hotData: { packageList: []  },
      categoryData: { packageList: [] },
      jxData: { packageList: []  }
    }
  },
  mounted(){},
  components: {},
  methods: {
    onGoAssistant(){
      wx.navigateTo({ url: '/pages/assistant/main' })
    },
    onGoAppointment(){
      wx.navigateTo({ url: '/pages/appointment/main' })
    },
    onFocusSearch(){
      const url = '../search/main'
      wx.navigateTo({ url })
    },
    getClassType(){
      this.$http.get('/wechat/pageindex/catelist').then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.classType = data.data.list;
        }
      })
    },
    toDetail () {
      const url = '../details/main'
      wx.navigateTo({ url })
    },
    toClass () {
      const url = '../classDetails/main'
      wx.navigateTo({ url })
    },
    goClass(index){
      this.toClass();
    },
    onGoDetail(id){
      const url = '/pages/details/main?id=' + id
      wx.navigateTo({ url })
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
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getList(){
      this.$http.get('/wechat/pageindex/packagelist').then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.hotData = data.data.hotData;
          this.categoryData = data.data.categoryData;
          this.jxData = data.data.jxData;
        }
      })
    },
    getBanner(){
      this.$http.get('/wechat/pageindex/adlist').then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.bannerData = data.data.list;
        }
      })
    },
    getLocation(){
      promisify(wx.getLocation)().then(res => {
        console.log(res);
      })
    },
  },

  onLoad() {
    this.getClassType();
    this.getList();
    // 调用应用实例的方法获取全局数据
    // this.login()
    this.getLocation();
    this.getBanner();
  }
}
</script>

<style scoped>
img{
  display: block;
}
.container{
  background-color: #f1f1f1;
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
  padding: 0 50rpx;
  position: relative;
  z-index: 99;
}
.search{
  height: 86rpx;
  margin-top: -43rpx;
  margin-bottom: 35rpx;
  /* background-color: #fff; */
}
.search img{
  width: 634rpx;
  height: 101rpx;
}
.index-search{
  background: url('../../../static/image/index-search.png') no-repeat;
  width: 634rpx;
  height: 101rpx;
  background-size: contain;
}
.searchInput{
  height: 86rpx;
  background-color: #fff;
  box-sizing: border-box;
  padding: 24rpx 30rpx;
  box-shadow:  0rpx 5rpx 10rpx #dfdfdf;
}
.searchInput input{
  height: 38rpx;
  min-height: 38rpx;
  margin-left: 39rpx;
  font-size: 32rpx;
}
.searchIcon{
  width: 37rpx;
  height: 38rpx;
  float: left;
  background:url(../../../static/image/icon/i_search.jpg) no-repeat;
  background-size: 100% 100%;
}
.classList{
  height: 250rpx;
  background-color: #fff;
  box-shadow:  0rpx 5rpx 10rpx #dfdfdf;
  margin-bottom: 27rpx;
}
.classList li{
  float: left;
  width: 25%;
  height: 125rpx;
  text-align: center;
  box-sizing: border-box;
  padding-top: 16rpx;
  font-size: 0;
}
.classList h3{
  height: 40rpx;
  /* padding-top: 10rpx; */
  /* padding-left: 10rpx; */
  box-sizing: border-box;
  line-height:40rpx;
  font-size: 20rpx;
  color: #333;
}

.classList .imgIcon{
  display: inline-block;
  width: 64rpx;
  height: 64rpx;
  background-repeat: no-repeat;
  background-size: cover;
}
/*.classList li:nth-child(1) .imgIcon{
  background-image: url(../../../static/image/icon/classIcon.jpg);
  background-position: 0 0;
}
.classList li:nth-child(2) .imgIcon{
  background-image: url(../../../static/image/icon/classIcon.jpg);
  background-position: -64rpx 0;
}
.classList li:nth-child(3) .imgIcon{
  background-image: url(../../../static/image/icon/classIcon.jpg);
  background-position: -128rpx 0;
}
.classList li:nth-child(4) .imgIcon{
  background-image: url(../../../static/image/icon/classIcon.jpg);
  background-position: -192rpx 0;
}
.classList li:nth-child(5) .imgIcon{
  background-image: url(../../../static/image/icon/classIcon2.jpg);
  background-position: 0 0;
}
.classList li:nth-child(6) .imgIcon{
  background-image: url(../../../static/image/icon/classIcon2.jpg);
  background-position: -64rpx 0;
}
.classList li:nth-child(7) .imgIcon{
  background-image: url(../../../static/image/icon/classIcon2.jpg);
  background-position: -128rpx 0;
}
.classList li:nth-child(8) .imgIcon{
  background-image: url(../../../static/image/icon/classIcon2.jpg);
  background-position: -192rpx 0;
}*/
.method{
  height: 100rpx;
  box-sizing: border-box;
  padding: 20rpx 0;
  background-color: #fff;
  box-shadow:  0rpx 5rpx 10rpx #dfdfdf;
  margin-bottom: 40rpx;
}
.method li{
  width: 50%;
  float: left;
  box-sizing: border-box;
  padding-left: 40rpx; 
  color: #333;
  font-size: 28rpx;
  line-height: 60rpx;
}
.method li:nth-child(1){
  border-right: 1rpx solid #ddd;
}
.method i{
  width: 51rpx;
  height: 51rpx;
  float: left;
  margin-right: 20rpx;
  margin-top: 3rpx;
}
.method .first{
  background: url(../../../static/image/icon/icon.jpg) -30rpx -23rpx no-repeat;
  background-size: 483% 200%;
}
.method .second{
  background: url(../../../static/image/icon/icon.jpg) -150rpx -23rpx no-repeat;
  background-size: 483% 200%;
}
.innerItem{
  margin-bottom: 20rpx;
}
.innerItem h3{
  height: 64rpx;
  font-size: 46rpx;
  line-height: 1;
  color: #333;
}
.innerItem h3 span{
  float: right;
  font-size: 28rpx;
  color: #666;
  line-height: 46rpx;
}
.innerItem h3 i{
  width: 27rpx;
  height: 24rpx;
  display: inline-block;
  background: url(../../../static/image/icon/jiantouLong.png) no-repeat;
  background-size: cover;
  margin-left: 5rpx;
}
.innerList{
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;
}
.innerList li{
  width: 300rpx;
  box-sizing: border-box;
  padding: 10rpx;
  float: left;
  background-color: #fff;
  box-shadow:  0rpx 5rpx 10rpx #dfdfdf;
  margin-bottom: 20rpx;
}
.innerList p{
  line-height: 60rpx;
  font-size: 28rpx;
  color: #333;
}
.innerList image{
  width: 100%;
  height: 240rpx;
}
.innerList .mr40{
  margin-right: 40rpx;
}
.innerList .mr18{
  margin-right: 18rpx;

}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* .userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
} */

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
