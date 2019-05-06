<template>
  <div @click="toDetail" class="smallImage">
    <div class="lift">
      <span>{{text}}p</span>
      <img :src="imgSrc" alt="">
    </div>
    <div class="right">
      <h3>{{tit}}</h3>
      <p>#{{describe}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text','imgSrc','tit','describe','id'],
  data () {
    return {
      // width: this.width,
      // text: this.text
    }
  },
  methods: {
    toDetail () {
      const url = '../details/main?id=' + this.id
      wx.navigateTo({ url })
    }
  }
}
</script>

<style scoped>
img{
  display: block;
}
.smallImage {
  box-sizing: border-box;
  padding: 10rpx;
  width: 100%;
  box-shadow: 0rpx 5rpx 10rpx #dfdfdf;
  margin-bottom: 20rpx;
}
.lift{
  float: left;
  position: relative;
}
.lift img{
  width: 300rpx;
  height: 180rpx;
}
.lift span{
  position: absolute;
  right: 10rpx;
  top: -10rpx;
  height: 40rpx;
  line-height: 40rpx;
  width: 40rpx;
  text-align: center;
  background-color: #f2cc2b;
  color: #fff;
  font-size: 20rpx;
}
.right{
  margin-left: 327rpx;
  box-sizing: border-box;
  padding-top: 64rpx;
}
.right h3{
  height: 32rpx;
  line-height: 32rpx;
  color: #000;
  margin-bottom: 64rpx;
}
.right p{
  font-size: 20rpx;
  color: #999;
}
</style>
