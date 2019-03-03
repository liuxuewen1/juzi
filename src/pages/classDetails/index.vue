<template>
  <div class="container">
    <a href="#" class="goPre"><i></i>二次元</a>
    <div class="cont">
      <classification :width="620" :height="320" :text="14" :img-src="smallImg" :tit="imgTit"></classification>
      <classification :width="620" :height="320" :text="14" :img-src="smallImg" :tit="imgTit"></classification>
      <classification :width="620" :height="320" :text="14" :img-src="smallImg" :tit="imgTit"></classification>
      <classification :width="620" :height="320" :text="14" :img-src="smallImg" :tit="imgTit"></classification>
    </div>
  </div>
</template>

<script>
import classification from '@/components/classification' //大图
export default {
  data () {
    return {
      smallImg: require("../../../static/image/bigimg.jpg"),
      imgTit:"青春年华套图"
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
img{
  display: block;
}
.cont{
  box-sizing: border-box;
  width: 100%;
  padding: 40rpx 50rpx 0;
}
.goPre{
  padding-left: 30rpx;
  font-size: 36rpx;
  width: 100%;
}
.goPre i{
  width: 14rpx;
  height: 28rpx;
  margin-right: 16rpx;
  display: inline-block;
  background: url("../../../static/image/icon/arrow.png") 0 0 no-repeat;
  background-size:100%;

}
</style>
