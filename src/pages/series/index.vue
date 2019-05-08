<template>
  <div class="series">
    <ul class="left">
      <li :class="item.active?'active':''" v-for="(item,index) in data" :key="index" @click="itemFn(index)">{{item.text}}</li>
    </ul>
    <div class="right">
      <div v-for="(item,index) in itemData" :key="index" @click="toDetail(item)" class="smallImage">
        <div class="itemLift">
          <span>{{item.text}}p</span>
          <img :src="item.imgSrc" alt="">
        </div>
        <div class="itemRight">
          <h3>{{item.tit}}</h3>
          <p>#{{item.describe}}</p>
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
      data:[
        {
          text:"推荐",
          active:true
        },
        {
          text:"推荐",
          active:false
        },
        {
          text:"推荐",
          active:false
        },
        {
          text:"推荐",
          active:false
        },
        {
          text:"推荐",
          active:false
        },
        {
          text:"推荐",
          active:false
        }
      ],
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
    itemFn(index){
      for(let i = 0; i < this.data.length;i++){
        this.data[i].active= false;
      }
      this.data[index].active= true;
      console.log(this.data[index].active);
    },
    toDetail (item) {
      const url = '../details/main?id=' + item.id;
      wx.navigateTo({ url });
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  onLoad(options) {
  },
  mounted(){},
}
</script>

<style scoped>
.series{
  position: relative;
  height: 100%;
  border-top: 1rpx solid #f1f1f1;
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
  position: absolute;
  left: 0;
  top: 0;
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
