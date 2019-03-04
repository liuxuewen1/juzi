<template>
  <div class="container">
    <ul class="classList">
      <li v-for="item in classType" :key = "item.key">
        <span></span>
        <h3>{{item.tit}}</h3>
        <div class="bottom"><img :src="item.imgSrc" alt=""></div>
      </li>
    </ul>
  </div>
</template>

<script>
import classification from '@/components/classification' //大图
export default {
  data () {
    return {
      
      classType:[
        {
          tit:"二次元",
          imgSrc:"/static/image/banner01.jpg"
        },
        {
          tit:"公主风",
          imgSrc:"/static/image/bigimg.jpg"
        },
        {
          tit:"极简风",
          imgSrc:"/static/image/banner01.jpg"
        },
        {
          tit:"极简风",
          imgSrc:"/static/image/banner01.jpg"
        },
        {
          tit:"极简风",
          imgSrc:"/static/image/banner01.jpg"
        }
      ]
    }
  },
  mounted(){},
  components: {
    classification
  },

  methods: {
    
  },

  created () {
  }
}
</script>

<style scoped>
.cont{
  padding: 0 50rpx;
}
img{
  display: block;
}
.classList{
  width: 100%;
  box-sizing: border-box;
  padding: 0 30rpx;
}
.classList li{
  float: left;
  width: 160rpx;
  margin: 25rpx 30rpx;
  height: 200rpx;
  box-sizing: border-box;
  padding: 10rpx;
  position: relative;
  box-shadow: 0rpx 5rpx 10rpx #dfdfdf;
}
.classList h3{
  height: 38rpx;
  padding-top: 10rpx;
  padding-left: 10rpx;
  box-sizing: border-box;
  line-height: 1;
  font-size: 28rpx;
}
.classList .bottom{
  width: 140rpx;
  height: 142rpx;
  box-shadow: 0px 20px 30px #fff inset;
}
.classList img{
  width: 140rpx;
  height: 142rpx;
  display: block;
  box-shadow: 0px 20px 30px #fff inset;
}
.classList span{
  position: absolute;
  right: 14rpx;
  top: 14rpx;
  width: 14rpx;
  height: 14rpx;
  background:url(../../../static/image/icon/addIcon.jpg) no-repeat;
  background-size: 100% 100%;
}
</style>
