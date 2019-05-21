<template>
  <div class="order-succ-warp">
    <!-- <a href="#" class="goPre"><i></i>我的订单</a> -->
    <h2 class="title">预约成功！</h2>
    <div class="qrcode">
      <image style="width: 168px; height: 168px;" :src="qrcodeURL"> </image>
      <!-- <canvas class='canvas' style="width:168px; height:168px;" id="canvasId" canvas-id='canvas' bindlongtap='save'></canvas> -->
      <!-- <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1547392534&di=ae1a3d6c36b1c5084273cc81edfa1f61&src=http://y3.ifengimg.com/news_spider/dci_2013/09/b85234c4801f8b2d7771353867a7a0f8.jpg" alt=""> -->
    </div>
    <guide 
      :addr="data.merchantInfo.address"
      :longitude="data.merchantInfo.latitude"
      :latitude="data.merchantInfo.longitude"
    />
    <div class="rule">
      <game-rule />
    </div> 
    <!-- 
      <img src="../../../static/image/rule.jpg" alt="">
    </div> -->
  </div>
</template>

<script>
import guide from '@/components/address-guide.vue'
import qrcode from '@/utils/weapp-qrcode.js'
import gameRule from '@/components/gameRule' //
export default {
  data(){
    return {
      id: 0,
      data: { merchantInfo: {} },
      qrcode: null,
      qrcodeURL: ''
    }
  },
  computed: {
  },
  methods: {
    getDetail(){
      this.$http.get(`/wechat/user/orderDetail?orderId=${this.id}`).then(res => {
        const data = res.data;
        if(data.status == 1000 && data.data.qrStr){
          this.data = data.data;
          // this.qrcode && this.qrcode.makeCode(data.data.qrStr);
          this.qrcodeURL = qrcode.drawImg(data.data.qrStr, {
            typeNumber: 1,
            errorCorrectLevel: 'H',
            size: 168
          })
          
        }
      })
    },
  },
  components: {
    guide,
    gameRule
  },
  onShow(){
    // this.qrcode = new qrcode.QRCode("canvas", {
    //   text: "",
    //   width: 168,
    //   height: 168,
    //   colorDark : "#000000",
    //   colorLight : "#ffffff",
    //   correctLevel : qrcode.QRCode.CorrectLevel.H
    // });
    this.getDetail();
  },
  onLoad(options){
    this.id = options.id;
  }
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
  width: 168px;
  padding: 10px;
}
.qrcode img{
  height: 168px;
  width: 168px;
  margin: 15rpx;
}
.rule{
  /* background-color: #ececec; */
  /* text-align: center; */
  padding: 28rpx;
  /* margin-top: 18rpx; */
  /*margin-top: 150rpx;*/
}
/* .rule img{
  width: 665rpx;
  height: 512rpx;
} */
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
