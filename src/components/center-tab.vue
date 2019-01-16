<template>
    <div class="self-center-tab" :class="active">
        <span @click="changeTab('photo')">我的相册</span>
        <span @click="changeTab('order')">我的订单</span>
        <span @click="changeTab('collection')">我的收藏</span>
    </div>
</template>

<script>
export default {
  props: ['active', 'changeTab']
}
</script>

<style scoped>
.self-center-tab {
  padding: 10rpx;
  display: flex;
  justify-content: center;
}
.self-center-tab span{
  text-align: center;
  font-size: 32rpx;
  height: 90rpx;
  line-height: 90rpx;
  color: #999;
  width: 130rpx;
  margin: 0 18rpx;
}
.self-center-tab.photo span:nth-child(1){
  color: #333333;
  border-bottom: 1rpx solid #333;
}
.self-center-tab.order span:nth-child(2){
  color: #333333;
  border-bottom: 1rpx solid #333;
}
.self-center-tab.collection span:nth-child(3){
  color: #333333;
  border-bottom: 1rpx solid #333;
}
</style>
