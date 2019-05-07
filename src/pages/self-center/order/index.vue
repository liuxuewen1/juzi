<template>
  <div class="center-warp">
    <div class="box-order" v-if="orderData.length">
      <order :datas="orderData"></order>
    </div>
    <no-photos v-if="!orderData.length" tit="您还没有拍过美美的照片哦～" text="立即去前往拍摄"></no-photos>
  </div>
</template>

<script>
import order from '@/components/order'
import noPhotos from '@/components/noPhotos' //无照片
export default {
  data(){
    return {
      pageOrder: 1,
      orderData: [],
      myImgNull:false
    }
  },
  computed: {
  },
  methods: {
    getOrderList(){
      this.$http.get(`/wechat/user/subOrderList?page=${this.pageOrder}&pageSize=20`).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.orderData = data.data.orderList;
        }
      })
    }
  },
  components: {
    order,
    noPhotos
  },
  onTabItemTap(item) {
    // this.changeTab(this.active_tab)
  },
  onLoad(){
    this.getOrderList();
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
