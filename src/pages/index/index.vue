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
          <swiper-item>
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
      <div class="classItem"></div>
      <div class="innerItem">
        <h3>人气套餐推荐</h3>
        <div class="innerCont">
          <classification :width="620" :height="320" :text="14" :img-src="smallImg" :tit="imgTit"></classification>
          <ul class="innerList mt20">
            <li class="mr40"><classification :text="14" :img-src="smallImg" :tit="imgTit"></classification></li>
            <li><classification :text="14" :img-src="smallImg" :tit="imgTit"></classification></li>
            <li class="mr40"><classification :text="14" :img-src="smallImg" :tit="imgTit"></classification></li>
            <li><classification :text="14" :img-src="smallImg" :tit="imgTit"></classification></li>
            <li><classification :text="14" :img-src="smallImg" :tit="imgTit"></classification></li>
          </ul>
        </div>
      </div>
      <div class="innerItem">
        <h3>人气套餐推荐</h3>
        <div class="innerCont">
          <classification :width="620" :height="320" :text="14" :img-src="smallImg" :tit="imgTit"></classification>
          <div class="mt20">
            <small-img-item :text="14" :img-src="smallImg" :tit="imgTit" :describe="describe"></small-img-item>
            <small-img-item :text="14" :img-src="smallImg" :tit="imgTit" :describe="describe"></small-img-item>
          </div>
        </div>
      </div>
    </div>
    <bottom-menu @goNext="clickActive"></bottom-menu>
    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div> -->
    
    <!-- <div class="usermotto">
      <div class="user-motto"> -->
        <!-- <card :text="motto"></card> -->
      <!-- </div>
    </div> -->

    <!-- <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a> -->
  </div>
</template>

<script>
import card from '@/components/card'
import classification from '@/components/classification' //大图
import smallImgItem from '@/components/smallImgItem' //小图
import bottomMenu from '@/components/menu' //菜单
export default {
  data () {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      imgUrls: [
        '../../../static/image/banner01.jpg',
        '../../../static/image/banner01.jpg',
        '../../../static/image/banner01.jpg'
      ],
      motto: 'Hello World',
      imgTit: '青春年华套图',
      describe: '科技风',
      userInfo: {},
      smallImg: require("../../../static/image/bigimg.jpg")
    }
  },
  mounted(){},
  components: {
    card,
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
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
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
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
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
  /* line-height: 38rpx; */
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
.classItem{
  height: 200rpx;
  width: 100%;
  margin-bottom: 44rpx;
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
  /* float: left; */
}
.innerList .mr40{
  margin-right: 40rpx;
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
