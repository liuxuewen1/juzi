<template>
  <div class="imgBox">
    <span>{{text}}p</span>
    <image :src="imgSrc" alt="" style="width:100%;display: block;" mode="widthFix"></image>
    <p>{{tit}}</p>
  </div>
</template>

<script>
export default {
  props: ['text','imgSrc','tit'],
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
  position: relative;
  margin-bottom: 20rpx;
  width: 100%;
}
.imgBox span{
  position: absolute;
  right: 0;
  top: 0;
  height: 40rpx;
  line-height: 40rpx;
  width: 40rpx;
  text-align: center;
  background-color: #535d84;
  color: #fff;
  font-size: 20rpx;
}
.imgBox p{
  position: absolute;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: 110rpx;
  padding-left: 20rpx;
  padding-top: 62rpx;
  font-size: 28rpx;
  color: #fff;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 10%, rgba(0, 0, 0,0.1) 60%, rgba(0, 0, 0,0) 100%); 
}
</style>
