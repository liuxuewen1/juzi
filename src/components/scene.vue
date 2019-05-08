<template>
  <div class="studio">
    <div class="nearbyStudio">
      <h3 class="tit">
        <input type="radio" v-model="picked" value="000">
        <span>全选</span>
        <p class="titRight">已选择您想拍的场景数量：<span class="redColor">1</span></p>
      </h3>
      <ul>
        <li v-for="(item,index) in data" :key="index">
          <img :src="item.imgUrl" alt="" class="nearImg">
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
          id:"11111"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          name:"ddd",
          id:"2222"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          name:"ddd",
          id:"33333"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          name:"ddd",
          id:"33333"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          name:"ddd",
          id:"33333"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          name:"ddd",
          id:"33333"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          name:"ddd",
          id:"33333"
        }
      ]
    }
  },
  methods: {
    
  },
  components:{}
}
</script>

<style scoped>
.studio{
  background-color: #fff;
  padding-bottom: 20rpx;
}

.nearbyStudio .tit{
  height: 44rpx;
  line-height: 44rpx;
  font-size: 26rpx;
  color: #333;
  margin-bottom: 25rpx;
  padding: 26rpx 30rpx 0 13rpx;
}
.titRight{
  float: right;
  line-height: 44rpx;
  font-size: 24rpx;
}
.nearbyStudio ul{
  overflow: hidden;
  padding: 0 8rpx;
  margin-bottom: 44rpx;
}
.nearbyStudio li{
  height: 200rpx;
  width: 226rpx;
  position: relative;
  float: left;
  margin:0 5rpx 10rpx;
}
.nearbyStudio .nearImg{
  width: 226rpx;
  height: 200rpx;
}
.sureStudio{
  height: 100rpx;
  background: #fbd465;
  font-size: 30rpx;
  color: #333;
  text-align: center;
  line-height: 100rpx;
  border-radius: 5rpx;
  margin: 0 30rpx;
}
.redColor{
  color: red;
}
.radio{
  position: absolute;
  right:10rpx;
  top: 10rpx;
}
.radio .radioInput{
  /* width: 30rpx;
  height: 30rpx; */
}
</style>
