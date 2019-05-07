<template>
  <div class="center-warp">
    <div class="box-collection" v-if="collectionData.length">
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
    <no-photos v-if="!collectionData.length" tit="您还没有收藏过美美的照片哦～" text="立即查看样图"></no-photos>
  </div>
</template>

<script>
// import tab from '@/components/center-tab'
// import timeline from '@/components/timeline'
// import order from '@/components/order'
import smallitem from '@/components/smallImgItem'
import noPhotos from '@/components/noPhotos' //无照片
export default {
  data(){
    return {
      pageCollection: 1,
      collectionData: []
    }
  },
  computed: {
  },
  methods: {
    getCollection(){
      this.$http.get(`/wechat/user/myStorePackages?page=${this.pageCollection}&pageSize=20`).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.collectionData = data.data.packageList;
        }
      })
    }
  },
  components: {
    // tab,
    // order,
    // timeline,
    smallitem,
    noPhotos
  },
  created(){
    this.getCollection();
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
