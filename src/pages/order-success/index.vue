<template>
  <div class="order-succ-warp">
    <a href="#" class="goPre"><i></i>我的订单</a>
    <h2 class="title">预约成功！</h2>
    <div class="qrcode">
      <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1547392534&di=ae1a3d6c36b1c5084273cc81edfa1f61&src=http://y3.ifengimg.com/news_spider/dci_2013/09/b85234c4801f8b2d7771353867a7a0f8.jpg" alt="">
    </div>
    <guide addr="北京市海淀区安徽大厦"></guide>
    <div class="rule">
      <img src="../../../static/image/rule.jpg" alt="">
    </div>
  </div>
</template>

<script>
import guide from '@/components/address-guide.vue'
export default {
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    guide
  },
}
</script>

<style scoped>
.title{
  font-size: 46rpx;
  font-weight: bold;
  height: 140rpx;
  line-height: 140rpx;
  text-align: center;
}
.qrcode{
  margin: 0 auto;
  margin-bottom: 18rpx;
  border: 1rpx solid #f5f2f1;
  width: 320rpx;
}
.qrcode img{
  height: 288rpx;
  width: 288rpx;
  margin: 15rpx;
}
.rule{
  background-color: #ececec;
  text-align: center;
  padding: 28rpx 30rpx 78rpx;
  margin-top: 18rpx;
  /*margin-top: 150rpx;*/
}
.rule img{
  width: 665rpx;
  height: 512rpx;
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
