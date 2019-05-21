<template>
  <div class="center-warp">
    <a href="#" class="goPre"><i></i>我的订单</a>
    <div class="timeline">
      <h3 class="date">{{data}}</h3>
      <h4 class="title">{{titInfo}}</h4>
    </div>
    <ul class="photo">
      <li v-for="(item,index) in order_data" :key="index">
        <img mode='aspectFill' :src="item.photo" alt="">
        <div class="photo-text">
          <span v-if="item.textInfo != ''">{{item.textInfo}}</span>
          <p v-if="item.canDown" class="blue">{{item.size}}MB<span></span></p>
          <p v-else class="orange">{{item.price}}￥<span></span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      data:"2018.12.22",
      titInfo:"周三 . 欢乐谷主题馆",
      order_data: [{
          photo: "../../../static/image/bigimg.jpg",
          canDown: false,
          price: "599",
          size:"",
          textInfo: "30天后过期",
      },{
          photo: "../../../static/image/bigimg.jpg",
          price: "599",
          canDown: true,
          size:"5.5",
          textInfo: "",
      }]
    }
  },
  computed: {
  },
  methods: {
    
  },
  components: {
  }
}
</script>

<style scoped>
.center-warp{
  min-height: 100%;
}
.goPre{
  padding-left: 30rpx;
  font-size: 36rpx;
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
  padding: 20rpx 30rpx 30rpx;
}
li{
  height: 420rpx;
  padding: 20rpx;
  box-sizing: border-box;
  box-shadow: 0rpx 5rpx 10rpx #dfdfdf;
  margin-bottom: 30rpx;
}
img{
  height: 320rpx;
  width: 100%;
  display: block;
}
.photo-text{
  margin-top: 20rpx;
  height: 40rpx;
  line-height: 40rpx;
  font-size: 20rpx;
  color: #333;
}
p{
  float: right;
  width: 150rpx;
  color:#fff;
  box-sizing: border-box;
  padding:0 18rpx 0 25rpx;
}
p span{
  float: right;
  margin-top: 9rpx;
}
p:nth-child(1) span{
  width:19rpx;
  height: 21rpx;
  background: url("../../../static/image/icon/download.png") 0 0 no-repeat;
  background-size: 100%;
}
p:nth-child(2) span{
  width:25rpx;
  height: 25rpx;
  background: url("../../../static/image/icon/sale.png") 0 0 no-repeat;
  background-size: 100%;
}
.blue{
  background-color: #4f4fe1;
}
.orange{
  background-color: #f2cc2b;
}
.timeline{
  margin: 30rpx 40rpx 0 28rpx;
  padding: 8rpx 0;
}
.timeline h3,.timeline h4{
  height: 36rpx;
  line-height: 36rpx;
  font-size: 32rpx;
  color: #333;
}
</style>
