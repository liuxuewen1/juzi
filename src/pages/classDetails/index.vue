<template>
  <div class="container">
    <ul class="hot" v-if="!isLoading">
      <li 
        @click="onGetData(item)" 
        v-for="item in classType"
        :class="{active: item.active}" 
        :key="item.key">
        #{{item.name}}
      </li>
      <li :class="{active: id==-1}" @click="onGetData({id: -1})" :key="0">#全部</li>
    </ul>
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
    <loadinga v-if="isLoading" />
  </div>
</template>

<script>
import classification from '@/components/classification' //大图
import loadinga from '@/components/loading'
export default {
  data () {
    return {
      id: 0,
      data: [],
      classType: [],
      page: 1,
      pageSize: 20,
      totalCount: 0,
      isLoading: true
    }
  },
  mounted(){},
  components: {
    classification,
    loadinga
  },
  methods: {
    onGetData(item){
      this.id = item.id;
      this.classType.forEach(type => type.active = false);
      item.active = true;
      this.page = 1;
      this.data = [];
      this.getCateData(item.id);
    },
    getCateData(id){
      this.isLoading = true;
      this.$http.get(`/wechat/package/getbycateid?cateId=${id}&page=${this.page}&pageSize=${this.pageSize}`).then(res => {
        const data = res.data;
        this.isLoading = false;
        if(data.status == 1000){
          this.data = this.data.concat(data.data.packageList);
          this.totalCount = data.data.totalCount;
        }
      })
    },
    getClassType(){
      this.$http.get('/wechat/pageindex/catelist').then(res => {
        const data = res.data;
        if(data.status == 1000){
          data.data.list.forEach(item => item.active = item.id == this.id)
          this.classType = data.data.list;
        }
      })
    },
  },
  onLoad (options) {
    this.id = options.id;
    wx.setNavigationBarTitle({
      title: options.className 
    })
    this.page = 1;
    this.totalCount = 0;
    this.data = [];
    this.getClassType();
    this.getCateData(this.id);
  },
  onReachBottom(){
    if(Math.ceil(this.totalCount/this.pageSize) > this.page){
      this.page += 1;
      this.getCateData(this.id);
    }
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

.hot{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 30rpx 0 100rpx;
  margin-top: 10px;
}

.hot li{
  flex: 0 0 22%;
  font-size: 24rpx;
  text-align: center;
  border: 1px solid #eee;
  margin: 5px;
  padding: 5px 8px;
  border-radius: 5px;
  border-color: #f8dc07;
}
.hot li.active{
  color: #fff;
  background-color: #f8dc07;
}
</style>
