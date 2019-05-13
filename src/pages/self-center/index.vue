<template>
  <div class="center-warp">
    <img src="/static/image/bg.jpg" alt="" class="imageBttom">
    <div class="cont">
      <div class="user" v-if="!phone">
        <div class="user-top">
          <img :src="avatar" alt="">
        </div>
        <a class="login" @click="onLogin">绑定手机号</a>
      </div>
      <div class="user" v-if="phone">
        <div class="user-top">
          <img :src="avatar" alt="">
        </div>
        <p>{{username}}</p>
      </div>
      <ul class="user-info mb30">
        <li @click="onClickGo('personal')">个人信息<i></i></li>
        <!-- <li @click="onClickGo('photo')">我的相册<i></i></li> -->
        <li @click="onClickGo('order')">我的订单<i></i></li>
        <li @click="onClickGo('collection')">我的收藏<i></i></li>
      </ul>
      <ul class="user-info">
        <li @click="onClickGo('assistant')">拍摄助手<i></i></li>
        <li @click="onClickGo('complaint')">投诉建议<i></i></li>
      </ul>
    </div>
    <!-- <tab :active="active_tab" :changeTab="changeTab"></tab>
    <div class="box-photo" v-if="!myImgNull" :style="{'display': active_tab=='photo'? 'block': 'none'}">
      <timeline date="2018.12.12" title="周三 . 欢乐谷主题馆"></timeline>
      <div class="photo">
        <img src="/static/image/bigimg.jpg" alt="" class="photo-big">
        <img src="/static/image/smallimg.jpg" alt="" class="photo-small">
        <img src="/static/image/smallimg.jpg" alt="" class="photo-small">
        <img src="/static/image/smallimg.jpg" alt="" class="photo-small">
        <img src="/static/image/smallimg.jpg" alt="" class="photo-small">
      </div>
    </div>
    <div class="box-order" :style="{'display': active_tab=='order'? 'block': 'none'}">
      <order :datas="orderData"></order>
    </div>
    <div class="box-collection" v-if="!shouImgNull" :style="{'display': active_tab=='collection'? 'block': 'none'}">
      <smallitem 
        v-for='item in collectionData' 
        :text="item.bgNumber" 
        :imgSrc="item.imgPath" 
        :tit="item.name" 
        :describe="item.cateName"
        :id="item.id"
      />
    </div>
    <no-photos v-if="active_tab=='photo'&& myImgNull" tit="您还没有拍过美美的照片哦～" text="立即去前往拍摄"></no-photos>
    <no-photos v-if="active_tab=='collection' && shouImgNull" tit="您还没有收藏过美美的照片哦～" text="立即查看样图"></no-photos> -->
  </div>
</template>

<script>
// import tab from '@/components/center-tab'
// import timeline from '@/components/timeline'
// import order from '@/components/order'
// import smallitem from '@/components/smallImgItem'
// import noPhotos from '@/components/noPhotos' //无照片
export default {
  data(){
    return {
      avatar: '',
      phone: 0,
      username: '',
      pageCollection: 1,
      pageOrder: 1,
      collectionData: [],
      orderData: [],
      myImgNull:false,
      shouImgNull:false,
      active_tab: "photo",
      order_data: [{
          date: "2018-12-22 14:23:23",
          photo: "https://www.baidu.com/img/bd_logo1.png",
          title: "青春年华套图",
          price: "599",
          count: "12",
          qrcode: "https://www.baidu.com/img/bd_logo1.png",
          status: "待拍照",
          address: "北京市海淀区农大南路1号硅谷亮城"
      },{
          date: "2018-12-22 14:23:23",
          photo: "https://www.baidu.com/img/bd_logo1.png",
          title: "青春年华套图",
          price: "599",
          count: "12",
          qrcode: "https://www.baidu.com/img/bd_logo1.png",
          status: "待拍照",
          address: "北京市海淀区农大南路1号硅谷亮城"
      }]
    }
  },
  computed: {
  },
  methods: {
    onLogin(){
      wx.navigateTo({ url: '/pages/wechatBindPhone/main' })
    },
    onClickGo(type){
      const url = '/pages/self-center/' + type + '/main';
      wx.navigateTo({ url })
    },
    getOrderList(){
      this.$http.get(`/wechat/user/subOrderList?page=${this.pageOrder}&pageSize=20`).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.orderData = data.data.orderList; console.log(data)
        }
      })
    },
    getCollection(){
      this.$http.get(`/wechat/user/myStorePackages?page=${this.pageCollection}&pageSize=20`).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.collectionData = data.data.packageList; console.log(data)
        }
      })
    },
    changeTab(tab){
      console.log(tab, 88)
      if(tab === 'collection'){
        this.getCollection();
      }else if(tab === 'order'){
        this.getOrderList();
      }
      this.active_tab = tab;
    },
    setInfo(){
      this.phone = wx.getStorageSync('x-phone');
      this.avatar = wx.getStorageSync('x-avatar') || '/static/image/icon/head-nologin.png';
      this.username = wx.getStorageSync('x-name');
    }
  },
  components: {
    // tab,
    // order,
    // timeline,
    // smallitem,
    // noPhotos
  },
  onTabItemTap(item) {
    // this.changeTab(this.active_tab)
  },
  onShow(){
      console.log('show',111)
    this.setInfo();
  },
  onLoad(options){
      console.log('load',111)
    this.setInfo();
  }
}
</script>

<style scoped>
.mb30{
  margin-bottom: 30rpx;
}
.imageBttom{
  width: 100%;
  position: relative;
  z-index: -1;
}
.cont{
  text-align: center;
  position: absolute;
  top: 142rpx;
  left: 0;
  width: 100%;
  z-index: 2;
  box-sizing: border-box;
  padding: 0 30rpx 30rpx;
}
.user{
  margin-bottom: 89rpx;
}
.login{
  display: block;
  margin: 0 auto;
  margin-top: 18rpx;
  width: 180rpx;
  height: 56rpx;
  line-height: 56rpx;
  background-color: #eed26e;
  color: #333;
  font-size: 28rpx;
}
.user .user-top{
  width: 160rpx;
  height: 160rpx;
  background-color: rgba(255,255,255,0.5);
  border-radius: 100%;
  box-sizing: border-box;
  padding: 6rpx;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.user p{
  height: 55rpx;
  line-height: 55rpx;
  font-size: 28rpx;
  color: #fff;
}
.user img{
  width: 148rpx;
  height: 148rpx;
  border-radius: 100%;
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
/* .center-warp{
  min-height: 100%;
}
.box{
  padding: 20rpx 60rpx 0 40rpx;
}
.box-collection{
  padding: 20rpx 28rpx 40rpx;
}
.photo{
  margin-left: 28rpx;
  padding: 20rpx 0rpx 0rpx 30rpx;
  border-left: 1px solid #f5f2f1;
}
.photo-big{
  width: 620rpx;
  height: 320rpx;
}
.photo-small{
  width: 300rpx;
  height: 180rpx;
  margin-right: 20rpx;
} */
</style>
