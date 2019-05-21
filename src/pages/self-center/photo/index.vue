<template>
  <div class="center-warp">
    <div class="box-photo" v-if="!isLoading && orderData.length">
      <div class="tips red" style="color: #f92b2bcf;">温馨提示：相册中的照片，保存时间为30天，到期后系统会自动清除，请您尽快购买自己喜欢的照片并下载到自己的手机相册中</div>
      <div class="order-item" v-for="(item, idx) in orderData" :key="idx">
        <!-- <ul class="order-title">
          <li>店铺名: {{item.merchantName}}</li>
          <li class="red">照片单价：{{item.price}}/张 打印{{item.printPrice}}/张</li>
          <li class="red">优惠信息：{{item.discountNum}}张{{item.discountMoney}}元</li>
        </ul> -->
        <timeline :item="item"></timeline>
        <ul class="photo">
          <li class="photo-item" v-for="image in item.images" :key="image.imgId" >
            <img 
              mode='aspectFill'
              :src="image.minImage"  
              class="photo-small"
              @click="onGoImage(image, item.orderId)"
            />
            <img v-if="image.isBuy==1" class="buy-icon" src="/static/image/icon/has_buy.png" alt="">
          </li>
        </ul>
      </div>
    </div>
    <no-photos v-if="!isLoading && !orderData.length" tit="您还没有拍过美美的照片哦～" @click="onGoAppoint" text="立即去前往拍摄"></no-photos>
    <loading v-if="isLoading" />
  </div>
</template>

<script>
import noPhotos from '@/components/noPhotos' //无照片
import loading from '@/components/loading'
import timeline from '@/components/timeline' //
export default {
  data(){
    return {
      orderId: '',
      orderData: [],
      myImgNull:false,
      page: 1,
      pageSize: 20,
      isLoading: true
    }
  },
  computed: {
  },
  methods: {
    onGoAppoint(){
      wx.navigateTo({ url: '/pages/appointment/main'})
    },
    onGoImage(item,orderId){
      const params = 'orderId='+orderId+'&imgId='+item.imgId;
      wx.navigateTo({ url: '/pages/self-center/buyImage/main?'+params})
    },
    getOrderList(){
      this.$http.get(`/wechat/user/myPhotoList?orderId=${this.orderId}&page=${this.page}&pageSize=${this.pageSize}`).then(res => {
        const data = res.data;
        this.isLoading = false;
        if(data.status == 1000){
          this.orderData = this.orderData.concat(data.data.orderList);
          this.totalCount = data.data.totalCount;
        }
      })
    }
  },
  components: {
    noPhotos,
    timeline,
    loading
  },
  onShow(){
    this.page = 1;
    this.orderData = [];
    this.isLoading = true;
    this.getOrderList();
  },
  onLoad(options){
    this.orderId = options.orderId || '';
  },
  onReachBottom(){
    if(Math.ceil(this.totalCount/this.pageSize) > this.page){
      this.page += 1;
      this.getOrderList();
    }
  }
}
</script>

<style scoped>
.center-warp{
  min-height: 100%;
}
.box{
  padding: 20rpx 60rpx 0 40rpx;
}
.box-collection{
  padding: 20rpx 28rpx 40rpx;
}
.tips{
  /* color: #d47853; */
  font-size: 32rpx;
  line-height: 42rpx;
  padding: 30rpx 46rpx 0 46rpx;
}
.red{
  color: #f92b2bcf !important;
}
.order-item{
  overflow: hidden;
}
.order-title{
  font-size: 32rpx;
  border: 1px soild #333;
  padding: 16rpx 40rpx 0;
}
.photo{
  margin-left: 28rpx;
  padding: 20rpx 0rpx 0rpx 30rpx;
  border-left: 1px solid #f5f2f1;
}
.photo-big{
  width: 620rpx;
  height: 320rpx;
}
.photo-item{
  float: left;
  width: 200rpx;
  height: 200rpx;
  margin-right: 20rpx;
  margin-bottom: 16rpx;
  overflow: hidden;
  position: relative;
}
.photo-item .photo-small{
  width: 200rpx;
  height: 200rpx;
}
.photo-item .buy-icon{
  position: absolute;
  left: 0;
  top: 0;
  width: 99rpx;
  height: 99rpx;
}
</style>
