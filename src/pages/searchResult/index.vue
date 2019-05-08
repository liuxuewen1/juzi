<template>
  <div class="conBox">
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
    <no-photos v-else-if="!result.length" tit="没搜索到您要的结果～" text=""></no-photos>
  </div>
</template>

<script>
import classification from '@/components/classification' //大图
import noPhotos from '@/components/noPhotos' //无照片
export default {
  data () {
    return {
      page: 1,
      key: '',
      result: []
    }
  },
  components: {
    classification,
    noPhotos
  },

  methods: {
    getData(){
      const params = `page=${this.page}&pageSize=20&key=${this.key}`;
      this.$http.get(`/wechat/search/resultlist?${params}`).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.result = data.data.packageList;
          this.result = this.result.concat(this.result)
        }
      })
    }
  },

  created () {
  },
  onLoad(options) {
    this.key = options.key;
    this.getData();
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
