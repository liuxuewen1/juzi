<template>
  <div class="menu">
    <div class="left"><span></span><br>咨询</div>
    <div class="center" @click="goAppoint">预约拍摄</div>
    <div class="right" @click="collectionFn"><span :class="collectionRs?'orange':''"></span><br>收藏</div>

  </div>
  
</template>

<script>
export default {
  data () {
    return {
      collectionRs:false
    }
  },
  methods:{
    collectionFn(){
      this.collectionRs = !this.collectionRs;
    },
    gotoSucc () {
      const url = '../order-success/main'
      wx.navigateTo({ url })
      // wx.redirectTo({ url })
    },
    goAppoint(){
      this.gotoSucc();
    }
  }
}
</script>

<style scoped>
.menu{
  width: 100%;
  height: 103rpx;
  box-sizing: border-box;
  padding: 14rpx 0 4rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow:  0rpx -3rpx 20rpx #dfdfdf;
  display: flex;
}
.menu div{
  text-align: center;
}
.menu .left,.menu .right{
  font-size: 18rpx;
  flex: 1;
}
.menu span{
  /* width: 47rpx; */
  height: 44rpx;
  display: inline-block;
}
.left span{
  width: 43rpx;
  background: url('../../static/image/icon/consult.jpg') no-repeat;
  background-size: 100% 100%;
}
.right span{
  width: 47rpx;
  background: url('../../static/image/icon/collection.jpg') no-repeat;
  background-size: 100% 100%;
}
.right .orange{
  background: url('../../static/image/icon/collection2.jpg') no-repeat;
  background-size: 100% 100%;
}
.menu .center{
  flex: 4;
  font-size: 26rpx;
  height: 70rpx;
  background-color: #f2cc2b;
  color: #fff;
  line-height: 70rpx;
  border-radius: 6rpx;
}
</style>
