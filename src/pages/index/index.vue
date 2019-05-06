<template>
  <div class="container" @click="clickHandle('test click', $event)">
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
    <div class="content">
      <div class="search">
        <div class="searchInput">
          <span class="searchIcon"></span>
          <input type="text" placeholder="复仇者联盟">
        </div>
      </div>
      <!-- <div class="classItem"> -->
        <!-- <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="wrapper"> -->
      <div class="menu-container" ref="menuContainer">    
        <ul class="classList">
          <li v-for="item in classType" :key="item.key">
            <img :src="item.imgUrl" alt="">
            <h3>{{item.tit}}</h3>
          </li>
        </ul>
      </div>
      <ul class="method">
        <li><i class="first"></i><span>拍摄助手</span></li>
        <li><i class="second"></i><span>预约拍摄</span></li>
      </ul>
        <!-- </v-touch> -->
        
      <!-- </div> -->
      <div class="innerItem">
        <h3>人气套餐推荐</h3>
        <div class="innerCont">
          <!-- <classification :width="620" :height="320" :text="14" :img-src="smallImg" :tit="imgTit"></classification> -->
          <ul class="innerList mt20">
            <li :class="idx%2!=0?'':'mr40'" v-for="(item,idx) in listImg" :key="idx"><img :src="item.imgUrl" alt=""><p>{{item.tit}}</p></li>
          </ul>
        </div>
      </div>
      <!-- <div class="innerItem">
        <h3>{{jxData.title}}</h3>
        <div class="innerCont">
          <ul class="innerList mt20">
            <li :class="idx%2==0?'':'mr18'" v-for='(item,idx) in jxData.packageList' :key="idx">
              <classification :id="item.id" :key="item.id" :text="14" :img-src="item.imgPath" :tit="item.name"></classification>
            </li>
          </ul>
        </div>
      </div> -->
      <!-- <button open-type="getUserInfo">获取用户信息</button> -->
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import classification from '@/components/classification' //大图
import smallImgItem from '@/components/smallImgItem' //小图
import { promisify } from '@/utils/index' 
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
      ],
      listImg:[
        {
          tit:"玩心大作战",
          imgUrl:"/static/image/banner01.jpg"
        },
        {
          tit:"自然传奇",
          imgUrl:"/static/image/banner01.jpg"
        },
        {
          tit:"自然传奇",
          imgUrl:"/static/image/banner01.jpg"
        },
        {
          tit:"自然传奇",
          imgUrl:"/static/image/banner01.jpg"
        },
        {
          tit:"自然传奇",
          imgUrl:"/static/image/banner01.jpg"
        },
        {
          tit:"自然传奇",
          imgUrl:"/static/image/banner01.jpg"
        },
        {
          tit:"自然传奇",
          imgUrl:"/static/image/banner01.jpg"
        }
      ],
      classType:[
        {
          tit:"欢乐谷",
          imgUrl:"/static/image/banner01.jpg"
        },
        {
          tit:"欢乐谷",
          imgUrl:"/static/image/classIcon2.jpg"
        },
        {
          tit:"欢乐谷",
          imgUrl:"/static/image/classIcon3.jpg"
        },
        {
          tit:"欢乐谷",
          imgUrl:"/static/image/classIcon4.jpg"
        },
        {
          tit:"欢乐谷",
          imgUrl:"/static/image/classIcon5.jpg"
        },
        {
          tit:"欢乐谷",
          imgUrl:"/static/image/classIcon6.jpg"
        },
        {
          tit:"欢乐谷",
          imgUrl:"/static/image/classIcon7.jpg"
        },
        {
          tit:"欢乐谷",
          imgUrl:"/static/image/classIcon8.jpg"
        }
      ],
      motto: 'Hello World',
      imgTit: '青春年华套图',
      describe: '科技风',
      userInfo: {},
      smallImg: require("../../../static/image/bigimg.jpg"),
      hotData: {},
      categoryData: {},
      jxData: {}
    }
  },
  mounted(){},
  components: {
    card,
    classification,
    smallImgItem
    // bottomMenu
  },

  methods: {
    // getClassType(){
    //   this.$http.get('/wechat/pageindex/catelist').then(res => {
    //     const data = res.data;
    //     if(data.status == 1000){
    //       this.classType = data.data.list;
    //     }
    //   })
    // },
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
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getList(){
      this.$http.get('/wechat/pageindex/packagelist').then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.hotData = data.data.hotData;
          // this.categoryData = data.data.hotData;
          this.jxData = data.data.jxData;
        }
      })
    }
  },

  created () {
    // this.getClassType();
    this.getList();
    // 调用应用实例的方法获取全局数据
    // this.login()
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
  background-color: #fff;
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
}
.classList h3{
  height: 38rpx;
  padding-top: 10rpx;
  padding-left: 10rpx;
  box-sizing: border-box;
  line-height: 1;
  font-size: 28rpx;
}
.classList img{
  width: 64rpx;
  height: 64rpx;
}
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
  height: 76rpx;
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
