<template>
  <div class="center-warp">
    <map-route :route-info="routeInfo"></map-route>

  </div>
</template>

<script>
let plugin = requirePlugin("mapPlugin")
console.log(plugin,222)
export default {
  data () {
    return {
      routeInfo: {}
    }
  },

  components: {
    
  },

  methods: {
    
  },
  onShow(){
    //js 引用方式
    // let mapInfo = this.$store.state.addressInfo;
    // console.log(JSON.stringify(mapInfo))
    let routeInfo = {
        startLat: 39.90469,    //起点纬度 选填
        startLng: 116.40717,    //起点经度 选填
        startName: "我的位置",   // 起点名称 选填
        endLat: 39.94055,    // 终点纬度必传
        endLng :116.43207,  //终点经度 必传
        endName:"来福士购物中心",  //终点名称 必传
        mode: "car"  //算路方式 选填
    };
    this.routeInfo = routeInfo;
    console.log(routeInfo,1111)
  },
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
