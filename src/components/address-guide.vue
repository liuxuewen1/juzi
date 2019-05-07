<template>
    <p class="addr" @click="onClick">
      <i class="location"></i>
      <span>{{addr}}</span>
      <i class="jiantou"></i>
    </p>
</template>

<script>
export default {
  props: ['addr', 'longitude', 'latitude'],
  methods:{
    onClick(){
      wx.openLocation({
        longitude: this.latitude*1,
        latitude: this.longitude*1,
        scale: 14
      })
    }
  }
}
</script>

<style scoped>
.addr{
  display: flex;
  height: 88rpx;
  /*border-top: 1px solid #f5f2f1;*/
  align-items: center;
}
.addr span{
  color: #424348;
  font-size: 28rpx;
}
i.location{
  background: url("../../static/image/location.png") no-repeat center center;
  background-size: contain;
  width: 29rpx;
  height: 36rpx;
  margin-left: 22rpx;
  margin-right: 10rpx;
}
i.jiantou{
  background: url("../../static/image/jiantou.png") no-repeat center center;
  background-size: contain;
  width: 14rpx;
  height: 28rpx;
  margin-left: auto;
  margin-right: 30rpx;
}

</style>
