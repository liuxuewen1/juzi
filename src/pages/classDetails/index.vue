<template>
  <div class="container">
    <!-- <a href="#" class="goPre"><i></i>二次元</a> -->
    <div class="cont">
      <classification
        v-for="item in data"
        :text="item.bgNumber" 
        :img-src="item.imgPath" 
        :tit="item.name"
        :id="item.id"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script>
import classification from '@/components/classification' //大图
export default {
  data () {
    return {
      id: 0,
      data: []
    }
  },
  mounted(){},
  components: {
    classification
  },
  methods: {
    getCateData(){
      this.$http.get('/wechat/package/getbycateid?cateId='+this.id).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.data = data.data.packageList;
        }
      })
    },
    
  },
  onLoad (options) {
    this.id = options.id;
    wx.setNavigationBarTitle({
      title: options.className 
    })
    this.getCateData();
  }
}
</script>

<style scoped>
img{
  display: block;
}
.cont{
  box-sizing: border-box;
  width: 100%;
  padding: 40rpx 50rpx 0;
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
