<template>
  <div class="center-warp">
    <tab :active="active_tab" :changeTab="changeTab"></tab>
    <div class="box-photo" v-if="!myImgNull" :style="{'display': active_tab=='photo'? 'block': 'none'}">
      <timeline date="2018.12.12" title="周三 . 欢乐谷主题馆"></timeline>
      <div class="photo">
        <img src="/static/image/bigimg.jpg" alt="" class="photo-big">
        <img src="/static/image/smallimg.jpg" alt="" class="photo-small">
        <img src="/static/image/smallimg.jpg" alt="" class="photo-small">
        <img src="/static/image/smallimg.jpg" alt="" class="photo-small">
        <img src="/static/image/smallimg.jpg" alt="" class="photo-small">
      </div>
    </div>
    <div class="box-order" :style="{'display': active_tab=='order'? 'block': 'none'}">
      <order :datas="orderData"></order>
    </div>
    <div class="box-collection" v-if="!shouImgNull" :style="{'display': active_tab=='collection'? 'block': 'none'}">
      <smallitem 
        v-for='item in collectionData' 
        :text="item.bgNumber" 
        :imgSrc="item.imgPath" 
        :tit="item.name" 
        :describe="item.cateName"
        :id="item.id"
      />
    </div>
    <no-photos v-if="active_tab=='photo'&& myImgNull" tit="您还没有拍过美美的照片哦～" text="立即去前往拍摄"></no-photos>
    <no-photos v-if="active_tab=='collection' && shouImgNull" tit="您还没有收藏过美美的照片哦～" text="立即查看样图"></no-photos>
  </div>
</template>

<script>
import tab from '@/components/center-tab'
import timeline from '@/components/timeline'
import order from '@/components/order'
import smallitem from '@/components/smallImgItem'
import noPhotos from '@/components/noPhotos' //无照片
export default {
  data(){
    return {
      pageCollection: 1,
      pageOrder: 1,
      collectionData: [],
      orderData: [],
      myImgNull:false,
      shouImgNull:false,
      active_tab: "photo",
      order_data: [{
          date: "2018-12-22 14:23:23",
          photo: "https://www.baidu.com/img/bd_logo1.png",
          title: "青春年华套图",
          price: "599",
          count: "12",
          qrcode: "https://www.baidu.com/img/bd_logo1.png",
          status: "待拍照",
          address: "北京市海淀区农大南路1号硅谷亮城"
      },{
          date: "2018-12-22 14:23:23",
          photo: "https://www.baidu.com/img/bd_logo1.png",
          title: "青春年华套图",
          price: "599",
          count: "12",
          qrcode: "https://www.baidu.com/img/bd_logo1.png",
          status: "待拍照",
          address: "北京市海淀区农大南路1号硅谷亮城"
      }]
    }
  },
  computed: {
  },
  methods: {
    getOrderList(){
      this.$http.get(`/wechat/user/subOrderList?page=${this.pageOrder}&pageSize=20`).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.orderData = data.data.orderList; console.log(data)
        }
      })
    },
    getCollection(){
      this.$http.get(`/wechat/user/myStorePackages?page=${this.pageCollection}&pageSize=20`).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.collectionData = data.data.packageList; console.log(data)
        }
      })
    },
    changeTab(tab){
      console.log(tab, 88)
      if(tab === 'collection'){
        this.getCollection();
      }else if(tab === 'order'){
        this.getOrderList();
      }
      this.active_tab = tab;
    }
  },
  components: {
    tab,
    order,
    timeline,
    smallitem,
    noPhotos
  },
  onTabItemTap(item) {
    this.changeTab(this.active_tab)
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
