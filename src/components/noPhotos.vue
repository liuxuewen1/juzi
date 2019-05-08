<template>
  <div class="imgBox">
    <image src="/static/image/icon/smile.jpg" alt="" mode="widthFix"></image>
    <p>{{tit}}</p>
    <div v-if="text!=''" class="goPage"><span>{{text}}</span></div>
  </div>
</template>

<script>
export default {
  props: ['tit','text'],
  data () {
    return {
      // width: this.width,
      // text: this.text
    }
  }
}
</script>

<style scoped>
.imgBox {
  text-align: center;
  width: 100%;
  margin-top: 207rpx;
}
p{
  height: 74rpx;
  font-size: 36rpx;
  color: #999;
}
.imgBox image{
  width:93rpx;
  height:77rpx;
  margin-bottom:50rpx;
}
.goPage{
  width: 100%;
}
.goPage span{
  display: inline-block;
  width: 480rpx;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 28rpx;
  background-color: #f2cc2b;
  color: #fff;
  border-radius: 6rpx;
}
</style>
