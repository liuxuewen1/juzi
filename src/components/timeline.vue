<template>
    <div class="timeline">
        <p class="date">{{date}}</p>
        <p class="title">{{title}}</p>
    </div>
</template>

<script>
export default {
  props: ['date', 'title']
}
</script>

<style scoped>
.timeline{
  margin: 30rpx 40rpx 0 28rpx;
  padding: 8rpx 18rpx;
  border-left: 4rpx solid #000;
  
}
.timeline p{
  height: 36rpx;
  line-height: 36rpx;
  font-size: 32rpx;
  color: #333;
}
</style>
