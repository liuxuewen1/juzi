<template>
    <div class="setting-item">
        <span class="name">{{name}}</span>
        <i class="jiantou"></i>
    </div>
</template>

<script>
export default {
  props: ['name', 'gourl']
}
</script>

<style scoped>
.setting-item{
  display: flex;
  align-items: center;
  margin-left: 28rpx;
  border-bottom: 1rpx solid #f5f2f1;
}
.name{
  font-size: 28rpx;
  height: 80rpx;
  line-height: 80rpx;
  color: #dddddd;
}
i.jiantou{
  background: url("../../static/image/jiantou.png") no-repeat center center;
  background-size: contain;
  width: 14rpx;
  height: 28rpx;
  margin-left: auto;
  margin-right: 20rpx;
}
</style>
