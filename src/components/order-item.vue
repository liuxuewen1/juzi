<template>
    <div class="order-item">
        <div class="top">
          <p class="date">{{data.updateTime}}</p>
          <div class="content">
            <div class="img">
              <img mode='aspectFill' :src="data.imgPath" alt="">
            </div>
            <div class="desc">
              <p class="title">{{data.packName}}</p>
              <!-- <p class="price">{{data.bgNumber}}张</p> -->
              <p class="status">{{data.shotState==0? '未拍摄': '已拍摄'}}</p>
            </div>
            <div class="qrcode">
              <span v-if="data.shotState==0" @click="onClick">查看二维码</span>
              <span v-if="data.shotState==1" @click="onShowPhoto(data.orderId)">查看照片</span>
            </div>
          </div>
        </div>
        <guide 
          :longitude="data.latitude" 
          :latitude="data.longitude" 
          :addr="data.merchantName"
        />
    </div>
</template>

<script>
import guide from '@/components/address-guide.vue'
export default {
  props: ['data'],
  mounted(){
      
  },
  components: {
    guide
  },
  methods: {
    onShowPhoto(orderId){
      wx.navigateTo({ url: '/pages/self-center/photo/main?orderId='+orderId})
    },
    onClick(){
      wx.navigateTo({ url: `/pages/order-success/main?id=${this.data.orderId}`})
    }
  }
}
</script>

<style scoped>
.order-item{
  margin: 18rpx 30rpx 22rpx 30rpx;
  border-radius: 4rpx;
  box-shadow: 0rpx 5rpx 10rpx #dfdfdf;
}
.top{
  padding: 20rpx;
  padding-top: 0;
  border-bottom: 1px solid #f5f2f1;
}
.content{
  display: flex;
}
.date{
  font-size: 20rpx;
  height: 62rpx;
  line-height: 62rpx;
}
.desc{
  margin: 11rpx 0;
}
.desc>p{
  height: 46rpx;
  line-height: 46rpx;
}
.title{
  font-size: 32rpx;
  color: #424348;
}
.price{
  font-size: 28rpx;
  color: #424348;
}
.status{
  font-size: 28rpx;
  color: #e97d53;
}
.img{
  margin-right: 20rpx;
}
.img img{
  width: 160rpx;
  height: 160rpx;
}
.qrcode{
  margin-left: auto;
  margin-right: 20rpx;
  align-self: center;
}
.qrcode span{
  font-size: 28rpx;
  background-color: #e97d53;
  padding: 20rpx 0rpx;
  color: #fff;
  display: block;
  text-align: center;
  width: 180rpx;
}
.qrcode img{
  width: 158rpx;
  height: 158rpx;
  border: 1rpx solid #c7c7c7;
}

</style>
