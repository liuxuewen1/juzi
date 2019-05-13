<template>
  <div class="studio">
    <div class="nearbyStudio">
      <h3 class="tit">
        <!-- <input type="radio" @click="onClickAll" v-model="picked" value="000"> -->
        <div :class="{'radio': true, 'radio-active': count === bannerList.length, 'radio-all': true }" @click="onChoseScene()"></div>
        <span>全选</span>
        <p class="titRight">已选择您想拍的场景数量：<span class="redColor">{{count}}</span></p>
      </h3>
      <ul>
        <li v-for="item in bannerList" :key="item.id">
          <img :src="item.imgPath" alt="" class="nearImg">
          <div :class="{'radio': true, 'radio-active': item.is_active }" @click="onChoseScene(item)"></div>
        </li>
      </ul>
      <p class="sureStudio" @click="onSubmitScene">确认选择</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'onSubmit', 'checked'],
  data () {
    return {
        bannerList: []
      }
  },
  computed: {
    count(){
      return this.bannerList.filter(item => item.is_active === true).length;
    }
  },
  methods: {
    getData(){
      this.$http.get('/wechat/package/detail?id=' + this.id).then(res => {
        const data = res.data;
        if(data.status == 1000){
          let checkedIds = [];
          this.checked.forEach(item => checkedIds.push(item.id))
          data.data.bannerList.forEach(item => {
            item.is_active = checkedIds.includes(item.id)? true : false;
          })
          this.bannerList = data.data.bannerList;
        }
      })
    },
    onChoseScene(item){
      if(!item){
        const res = this.count == this.bannerList.length;
        this.bannerList.forEach(item => item.is_active = res? false : true);
        this.onSubmit('Scene', this.bannerList.filter(item => item.is_active === true), true)
        return;
      }else{
        item.is_active = !item.is_active;
        this.onSubmit('Scene', this.bannerList.filter(item => item.is_active === true), true)
      }
    },
    onSubmitScene(){
      this.onSubmit('Scene', this.bannerList.filter(item => item.is_active === true))
    }
  },
  components:{},
  onLoad(options){
    this.getData();
  }
}
</script>

<style scoped>
.studio{
  background-color: #fff;
  padding-bottom: 20rpx;
}

.nearbyStudio .tit{
  height: 44rpx;
  line-height: 44rpx;
  font-size: 26rpx;
  color: #333;
  margin-bottom: 25rpx;
  padding: 26rpx 30rpx 0 13rpx;
}
.titRight{
  float: right;
  line-height: 44rpx;
  font-size: 24rpx;
}
.nearbyStudio ul{
  overflow: hidden;
  padding: 0 8rpx;
  margin-bottom: 44rpx;
  min-height: 630rpx;
}
.nearbyStudio li{
  height: 200rpx;
  width: 226rpx;
  position: relative;
  float: left;
  margin:0 5rpx 10rpx;
}
.nearbyStudio .nearImg{
  width: 226rpx;
  height: 200rpx;
}
.sureStudio{
  height: 100rpx;
  background: #fbd465;
  font-size: 30rpx;
  color: #333;
  text-align: center;
  line-height: 100rpx;
  border-radius: 5rpx;
  margin: 0 30rpx;
}
.redColor{
  color: red;
}
.radio{
  position: absolute;
  width: 44rpx;
  height: 44rpx;
  background-color: #fff;
  right:10rpx;
  top: 10rpx;
  border-radius: 50%;
  border: 1px solid #666;
}
.radio-active{
  border: none;
  background: #fff url("../../static/image/icon/chose.png") 0 0 no-repeat;
  background-size: cover;
}
.radio-all{
  position: initial;
  float: left;
  margin-right: 8rpx;
}
.radio .radioInput{
  /* width: 30rpx;
  height: 30rpx; */
}
</style>
