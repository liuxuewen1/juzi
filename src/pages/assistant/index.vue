<template>
  <div class="assistant">
    <div class="use">
      <h3>如何使用拍摄影棚？</h3>
      <ul class="use-list">
        <li :class="index%2==0?'':'floatRight'" v-for="(item,index) in useStep" :key="index">
          <div class="top">
            <img mode='aspectFill' :src="item.imgUrl" alt="">
            <span>{{index+1}}</span>
          </div>
          <p>{{item.test}}</p>
        </li>
      </ul>
    </div>
    <div class="skill">
      <h3>拍摄小技巧</h3>
      <ul class="skill-list">
        <li>
          <img mode='aspectFill' src="/static/image/banner01.jpg" alt="">
          <p>玩心大作战</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      useStep:[
        {
          imgUrl:"/static/image/banner01.jpg",
          test:"第一步：预约拍摄，选择套系场景和影棚，获取二维码"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          test:"第二步：前往全方位激光数字影棚，出示二维码，将有工作人员前来服务"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          test:"第三步：您只需要提前准备好梳妆打扮、拍照动作等，然后摄影师将为您开始拍摄"
        },
        {
          imgUrl:"/static/image/banner01.jpg",
          test:"第四步：拍摄完套系中所以背景图，可支付打印也可以在小程序完成照片购买服务"
        }
      ]
    }
  },
  components: {
    // classification
  },

  methods: {},

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  },
  onLoad(options) {
  },
  mounted(){
    // this.getData()
    // this.getHotKeywords();
  },
}
</script>

<style scoped>
.assistant{
  padding: 30rpx;
}
.assistant h3{
  height: 70rpx;
  line-height: 1;
  font-size: 46rpx;
  color: #333;
}
.use{
  margin-bottom: 30rpx;
}
.use-list{
  overflow: hidden;
}
.use li{
  width: 310rpx;
  height: 370rpx;
  box-sizing: border-box;
  padding: 10rpx;
  box-shadow:  0rpx 5rpx 10rpx #dfdfdf;
  float: left;
  margin-bottom: 20rpx;
}
.use .floatRight{
  /* margin-right: 40rpx; */
  float: right;
}
.use .top{
  position: relative;
  margin-bottom: 16rpx;
}
.top img{
  width: 290rpx;
  height: 240rpx;
  border-radius: 30rpx 0 0 0;
}
.top span{
  position: absolute;
  left: 0;
  top: 0;
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  background-color: #ed50a3;
  color: #fff;
  font-size: 40rpx;
  border-radius: 50%;
  text-align: center;
}
.use p{
  line-height: 28rpx;
  font-size: 22rpx;
  color: #333;
}
.skill-list li{
  height: 360rpx;
  width: 100%;
  box-sizing: border-box;
  padding: 10rpx;
  box-shadow:  0rpx 5rpx 10rpx #dfdfdf;
}
.skill-list img{
  width: 100%;
  height: 82.3%;
}
.skill-list p{
  font-size: 26rpx;
  color: #333;
  line-height: 55rpx;
  height: 55rpx;
}
</style>
