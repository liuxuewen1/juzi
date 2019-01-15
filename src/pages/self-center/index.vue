<template>
  <div class="center-warp">
    <tab :active="active_tab" :changeTab="changeTab"></tab>
    <div class="box-photo" :style="{'display': active_tab=='photo'? 'block': 'none'}">
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
      <order :datas="order_data"></order>
    </div>
    <div class="box-collection" :style="{'display': active_tab=='collection'? 'block': 'none'}">
      <smallitem text="16" imgSrc="/static/image/bigimg.jpg" tit="土星战场" describe="科技风"></smallitem>
      <smallitem text="16" imgSrc="/static/image/bigimg.jpg" tit="土星战场" describe="科技风"></smallitem>
      <smallitem text="16" imgSrc="/static/image/bigimg.jpg" tit="土星战场" describe="科技风"></smallitem>
    </div>
  </div>
</template>

<script>
import tab from '@/components/center-tab'
import timeline from '@/components/timeline'
import order from '@/components/order'
import smallitem from '@/components/smallImgItem'
export default {
  data(){
    return {
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
    changeTab(tab){
      console.log(tab, 88)
      this.active_tab = tab;
    }
  },
  components: {
    tab,
    order,
    timeline,
    smallitem
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
