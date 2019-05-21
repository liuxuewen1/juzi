<template>
  <div class="center-warp">
    <div class="box-order" v-if="!isLoading && orderData.length">
      <order :datas="orderData"></order>
    </div>
    <no-photos v-if="!isLoading && !orderData.length" @click="onGoAppoint" tit="您还没有拍过美美的照片哦～" text="立即去前往拍摄"></no-photos>
    <loading v-if="isLoading" />
  </div>
</template>

<script>
import order from '@/components/order'
import loading from '@/components/loading'
import noPhotos from '@/components/noPhotos' //无照片
export default {
  data(){
    return {
      page: 1,
      pageSize: 20,
      orderData: [],
      totalCount: 0,
      isLoading: true
    }
  },
  computed: {
  },
  methods: {
    onGoAppoint(){
      wx.navigateTo({ url: '/pages/appointment/main'})
    },
    getOrderList(){
      this.$http.get(`/wechat/user/subOrderList?page=${this.page}&pageSize=${this.pageSize}`).then(res => {
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
    order,
    noPhotos,
    loading
  },
  onTabItemTap(item) {
    // this.changeTab(this.active_tab)
  },
  onShow(){
    this.page = 1;
    this.orderData = [];
    this.isLoading = true;
    this.getOrderList();
  },
  onReachBottom(){
    if(Math.ceil(this.totalCount/this.pageSize) > this.page){
      this.page += 1;
      this.getOrderList();
    }
  }
}
</script>

<style scoped>.center-warp{
  min-height: 100%;
}
.box{
  padding: 20rpx 60rpx 0 40rpx;
}
.box-collection{
  padding: 20rpx 28rpx 40rpx;
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
.photo-small{
  width: 300rpx;
  height: 180rpx;
  margin-right: 20rpx;
}
</style>
