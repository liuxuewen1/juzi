<template>
  <div class="conBox">
    <div class="search">
        <div class="searchInput">
          <span class="searchIcon"></span>
          <input auto-focus :value="key" type="text" @confirm="onConfirm" confirm-type="search" placeholder="搜索">
        </div>
        <span class="cancel" @click="onCancel">取消</span>
      </div>
    <div class="box-search" v-if="!result.length">
      <img class="title" src="/static/image/hot-search.png" />
      <ul class="hot">
        <li v-for="item in keywords">{{item.name}}</li>
      </ul>
    </div>
    <div class="cont" v-if="result.length">
      <classification 
        v-for="item in result"
        :width="620" 
        :height="320" 
        :text="item.bgNumber" 
        :img-src="item.imgPath" 
        :tit="item.name"
      />
    </div>
  </div>
</template>

<script>
import classification from '@/components/classification' //大图
export default {
  data () {
    return {
      page: 1,
      keywords: [],
      key: '',
      result: []
    }
  },
  components: {
    classification
  },

  methods: {
    getHotKeywords(){
      this.$http.get('/wechat/search/hotkeywords').then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.keywords = data.data.list;
        }
      })
    },
    onConfirm(e){
      this.key = e.mp.detail.value;
      const params = `page=${this.page}&pageSize=20&key=${this.key}`;
      this.$http.get(`/wechat/search/resultlist?${params}`).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.result = data.data.packageList;
          this.result = this.result.concat(this.result)
        }
      })
    },
    onCancel(){
      if(this.result.length){
        this.result = [];
        this.key = '';
      }else{
        // 返回上一页
        wx.navigateBack({
          delta: 1
        })
      }
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  onLoad(options) {
  },
  mounted(){
    // this.getData()
    this.getHotKeywords();
  },
}
</script>

<style scoped>
  
  .search{
    height: 78rpx;
    margin-bottom: 35rpx;
    margin-top: 30rpx;
    background-color: #fff;
    padding-left: 30rpx;
  }
  .cancel{
    color: #333;
    font-size: 28rpx;
    float: left;
    height: 78rpx;
    line-height: 78rpx;
    margin-left: 24rpx;
  }
  .searchInput{
    height: 78rpx;
    width: 70%;
    background-color: #f6f6f6;
    box-sizing: border-box;
    padding: 24rpx 30rpx;
    float: left;
    border-radius: 6rpx;
    /*box-shadow:  0rpx 5rpx 10rpx #dfdfdf;*/
  }
  .searchInput input{
    height: 38rpx;
    min-height: 38rpx;
    /* line-height: 38rpx; */
    margin-left: 39rpx;
    font-size: 32rpx;
  }
  .searchIcon{
    width: 33rpx;
    height: 33rpx;
    float: left;
    background:url(../../../static/image/search-icon.png) no-repeat;
    background-size: 100% 100%;
  }
  .title{
    padding-left: 30rpx;
    width: 665rpx;
    height: 26rpx;
  }
  .hot{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 30rpx;
    margin: 10px;
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
  .cont{
    box-sizing: border-box;
    width: 100%;
    padding: 40rpx 50rpx 0;
  }
</style>
