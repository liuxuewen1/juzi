<template>
  <div class="container">
    <!-- <a href="#" class="goPre"><i></i>二次元</a> -->
    <div class="title">
      <h3 @click="onGetData('great')" :class="{active: active == 'great'}">推荐</h3>
      <h3 @click="onGetData('hot')" :class="{active: active == 'hot'}">热门</h3>
    </div>
    <div class="cont">
      <classification
        v-for="item in data"
        :text="item.bgNumber" 
        :img-src="item.imgPath" 
        :tit="item.name"
        :id="item.id"
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
      data: [],
      active: 'hot'
    }
  },
  mounted(){},
  components: {
    classification
  },
  methods: {
    onGetData(type){
      this.active = type;
      this.getData();
    },
    getHotData(){
      this.$http.get('/wechat/package/hotlist').then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.data = data.data.packageList;
        }

      })
    },
    getGreatData(){
      this.$http.get('/wechat/package/greatlist').then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.data = data.data.packageList;
        }

      })
    },
    getData(){
      if(this.active === 'hot'){
        this.getHotData();
      }else if(this.active === 'great'){
        this.getGreatData();
      }
    }
  },
  onLoad (options) {
    this.active = options.active;
    this.getData();
  }
}
</script>

<style scoped>
.title{
  width: 260rpx;
  margin: 0 auto;
}
.title h3{
  float: left;
  width: 130rpx;
  height: 90rpx;
  line-height: 90rpx;
  color: #999;
  text-align: center;
  font-size: 32rpx;
}
.title h3.active{
  color: #ed50a3;
  border-bottom: 1px solid #ed50a3;
}
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
