<template>
  <div class="center-warp">
    <div class="box-collection" v-if="!isLoading && collectionData.length">
      <smallitem 
        :key="item.id"
        v-for='item in collectionData' 
        :text="item.bgNumber" 
        :imgSrc="item.imgPath" 
        :tit="item.name" 
        :describe="item.cateName"
        :id="item.id"
      />
    </div>
    <loading v-if="isLoading" />
    <no-photos v-if="!isLoading && !collectionData.length" @click="onGoHot" tit="您还没有收藏过美美的照片哦～" text="立即查看样图"></no-photos>
  </div>
</template>

<script>
// import tab from '@/components/center-tab'
// import timeline from '@/components/timeline'
// import order from '@/components/order'
import loading from '@/components/loading'
import smallitem from '@/components/smallImgItem'
import noPhotos from '@/components/noPhotos' //无照片
export default {
  data(){
    return {
      page: 1,
      pageSize: 20,
      totalCount: 0,
      collectionData: [],
      isLoading: true
    }
  },
  computed: {
  },
  methods: {
    onGoHot(){
      wx.navigateTo({ url: '/pages/hotList/main?active=hot' })
    },
    getCollection(){
      this.$http.get(`/wechat/user/myStorePackages?page=${this.page}&pageSize=${this.pageSize}`).then(res => {
        const data = res.data;
        this.isLoading = false;
        if(data.status == 1000){
          this.collectionData = this.collectionData.concat(data.data.packageList);
          this.totalCount = data.data.totalCount;
        }
      })
    }
  },
  components: {
    // tab,
    // order,
    // timeline,
    smallitem,
    noPhotos,
    loading
  },
  onShow(){
    this.page = 1;
    this.collectionData = [];
    this.isLoading = true;
    this.getCollection();
  },
  onReachBottom(){
    if(Math.ceil(this.totalCount/this.pageSize) > this.page){
      this.page += 1;
      this.getCollection();
    }
  },
  onTabItemTap(item) {
    // this.changeTab(this.active_tab)
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
