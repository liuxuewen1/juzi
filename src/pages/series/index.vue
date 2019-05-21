<template>
  <div class="series">
    <div class="border"></div>
    <ul class="left">
      <li 
        :class="item.active?'active':''" 
        v-for="item in classType" 
        :key="item.id" 
        @click="itemFn(item)">{{item.name}}
      </li>
    </ul>
    <div class="right">
      <div v-for="item in data" :key="item.id" @click="toDetail(item)" class="smallImage">
        <div class="itemLift">
          <span>{{item.bgNumber}}p</span>
          <img :src="item.imgPath" alt="">
        </div>
        <div class="itemRight">
          <h3>{{item.name}}</h3>
          <p>#{{item.cateName}}</p>
        </div>
        <a class="link">查看详情></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      classType:[],
      data: [],
      itemData: [
        {
          text:"111",
          imgSrc:"/static/image/banner01.jpg",
          tit:"jkjkjk",
          describe:"科技风",
          id:"111000",
          
        },
        {
          text:"111",
          imgSrc:"/static/image/banner01.jpg",
          tit:"jkjkjk",
          describe:"科技风",
          id:"111000"
        },
        {
          text:"111",
          imgSrc:"/static/image/banner01.jpg",
          tit:"jkjkjk",
          describe:"科技风",
          id:"111000"
        },
        {
          text:"111",
          imgSrc:"/static/image/banner01.jpg",
          tit:"jkjkjk",
          describe:"科技风",
          id:"111000"
        },
        {
          text:"111",
          imgSrc:"/static/image/banner01.jpg",
          tit:"jkjkjk",
          describe:"科技风",
          id:"111000"
        },
        {
          text:"111",
          imgSrc:"/static/image/banner01.jpg",
          tit:"jkjkjk",
          describe:"科技风",
          id:"111000"
        },
        {
          text:"111",
          imgSrc:"/static/image/banner01.jpg",
          tit:"jkjkjk",
          describe:"科技风",
          id:"111000"
        },
        {
          text:"111",
          imgSrc:"/static/image/banner01.jpg",
          tit:"jkjkjk",
          describe:"科技风",
          id:"111000"
        }
      ]
    }
  },
  computed: {
    // smallImgItem
  },

  methods: {
    getClassType(){
      this.$http.get('/wechat/pageindex/catelist').then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.classType = [{
            active: true,
            name: '热门',
            id: '-1'
          },{
            active: false,
            name: '推荐',
            id: '-2'
          }];
          data.data.list.forEach(item => item.active = false)
          this.classType = this.classType.concat(data.data.list);
          this.getHotData();
        }

      })
    },
    itemFn(item){
      for(let i = 0; i < this.classType.length;i++){
        this.classType[i].active= false;
      }
      item.active = true;
      if(item.id == -1){
        // 热门
        this.getHotData();
      }else if(item.id == -2){
        // 推荐
        this.getGreatData();
      }else{
        this.getCateData(item.id);
      }
    },
    getCateData(id){
      this.$http.get('/wechat/package/getbycateid?cateId='+id).then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.data = data.data.packageList;
        }
      })
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
    toDetail (item) {
      const url = '../details/main?chose=1&id=' + item.id;
      wx.navigateTo({ url });
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  onLoad(options) {
    this.getClassType();
  },
  mounted(){},
}
</script>

<style scoped>
.series{
  position: relative;
  /* height: 100%; */
}
.border{
  height: 1rpx;
  width: 100%;
  background-color: #f1f1f1;
  position: fixed;
  left: 0;
  top:0;
}
.link{
  position: absolute;
  bottom: 10rpx;
  right: 20rpx;
  font-size: 22rpx;
  color:#f477cf;
}
.left{
  width: 25%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 1rpx;
  background-color: #f1f1f1;
}
.left li{
  height: 100rpx;
  line-height: 100rpx;
  box-sizing: border-box;
  border-left: 4rpx #f1f1f1 solid;
  font-size: 28rpx;
  color: #333;
  text-align: center;
  background-color: #f1f1f1;
}
.left li.active{
  border-left-color:#f2cc2b;
  background-color: #fff;
}
.right{
  width: 75%;
  box-sizing: border-box;
  padding: 20rpx;
  margin-left: 25%;
  /* position: absolute; */
  /* right: 0;
  top: 0; */
}
.smallImage {
  box-sizing: border-box;
  padding: 10rpx;
  width: 100%;
  box-shadow: 0rpx 5rpx 10rpx #dfdfdf;
  margin-bottom: 20rpx;
  position: relative;
}
.itemLift{
  float: left;
  position: relative;
}
.itemLift img{
  width: 180rpx;
  height: 180rpx;
}
.itemLift span{
  position: absolute;
  right: 10rpx;
  top: -10rpx;
  height: 40rpx;
  line-height: 40rpx;
  width: 40rpx;
  text-align: center;
  background-color: #f2cc2b;
  color: #fff;
  font-size: 20rpx;
}
.itemRight{
  margin-left: 207rpx;
  box-sizing: border-box;
  padding-top: 64rpx;
}
.itemRight h3{
  height: 32rpx;
  line-height: 32rpx;
  color: #000;
  margin-bottom: 64rpx;
}
.itemRight p{
  font-size: 20rpx;
  color: #999;
}
</style>
