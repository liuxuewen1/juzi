<template>
  <div class="studio">
    <div class="addrBox">
      <h3 class="addr">
        <i class="location"></i>
        <span>当前定位</span>
        <!-- <i class="jiantou"></i> -->
      </h3>
      <p>{{addr}}</p>
      <span class="nextAddr" @click="onClick">重新定位</span>
    </div>
    <div class="nearbyStudio">
      <h3 class="tit">附近的影棚</h3>
      <ul>
        <li v-for="(item,index) in data" :key="index">
          <img :src="item.imgUrl" alt="" class="nearImg">
          <div class="center">
            <h3>{{item.name}}</h3>
            <p class="address">{{item.addr}}</p>
            <p class="info">{{item.info}}</p>
          </div>
          <div class="radio">
            <input type="radio" v-model="picked" :value="item.id">
            <!-- <label for="study"></label> -->
          </div>
        </li>
      </ul>
      <p class="sureStudio">确认预约</p>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['text','imgSrc','tit','describe','id'],
  data () {
    return {
      // width: this.width,
      // text: this.text，
      picked:"0000",
      addr:"dddddddd",
      data:[
        {
          imgUrl:"/static/image/banner01.jpg",
          name:"ddd",
          addr:"ggggggggg",
          info:"sdddddddddddd",
          id:"11111"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          name:"ddd",
          addr:"ggggggggg",
          info:"sdddddddddddd",
          id:"2222"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          name:"ddd",
          addr:"ggggggggg",
          info:"sdddddddddddd",
          id:"33333"
        }
      ]
    }
  },
  methods: {
    onClick(){
      wx.openLocation({
        longitude: this.latitude*1,
        latitude: this.longitude*1,
        scale: 14
      })
    }
  },
  components:{}
}
</script>

<style scoped>
.studio{
  background-color: #fff;
  padding-bottom: 20rpx;
}
.addrBox{
  position: relative;
  height: 158rpx;
  box-sizing: border-box;
  padding-top: 44rpx 0 43rpx;
  border-bottom:1rpx solid #ccc;
}
.addrBox p{
  height: 24rpx;
  line-height: 1;
  font-size: 24rpx;
  color: #333;
  padding-left: 70rpx;
}
.nextAddr{
  width: 160rpx;
  height: 70rpx;
  position: absolute;
  right: 50rpx;
  top: 45rpx;
  background-color: #f2cc2b;
  text-align: center;
  font-size: 26rpx;
  color: #fff;
  line-height: 70rpx;
  border-radius: 5rpx;
}
.addrBox .addr{
  padding-top:44rpx;
  display: flex;
  height: 46rpx;
  line-height: 30rpx;
  font-size: 30rpx;
  color: #333;
  /*border-top: 1px solid #f5f2f1;*/
  align-items: center;
}

.addrBox i.location{
  background: url("../../static/image/location.png") no-repeat center center;
  background-size: contain;
  width: 29rpx;
  height: 36rpx;
  margin-left: 30rpx;
  margin-right: 10rpx;
}
.nearbyStudio{
  padding: 23rpx 30rpx;
}
.nearbyStudio .tit{
  height: 40rpx;
  line-height: 40rpx;
  font-size: 26rpx;
  color: #333;
}
.nearbyStudio li{
  height: 180rpx;
  box-sizing: border-box;
  padding: 30rpx 0;
  position: relative;
}
.nearbyStudio li h3{
  height: 44rpx;
  line-height: 1;
  font-size: 26rpx;
  color: #000;
  font-weight:bold;
}
.nearbyStudio .address{
  height: 40rpx;
  font-size: 24rpx;
  color: #333;
}
.nearbyStudio .info{
  height: 24rpx;
  line-height: 1;
  font-size: 24rpx;
  color: #000;
}
.nearbyStudio .nearImg{
  width: 106rpx;
  height: 106rpx;
  float: left;
  margin-right: 36rpx;
}
.sureStudio{
  height: 100rpx;
  background: #fbd465;
  font-size: 30rpx;
  color: #333;
  text-align: center;
  line-height: 100rpx;
  border-radius: 5rpx;
}
.radio{
  position: absolute;
  right: 45rpx;
  top: 74rpx;
  width: 30rpx;
  height: 30rpx;
}
.radio .radioInput{
  width: 30rpx;
  height: 30rpx;
  display: inline-block;
}
</style>
