<template>
  <!-- <div class="container"> -->
    <div class="content">
      <img src="../../../static/image/bg.jpg" alt="" class="imgBg">
      <div class="logIn">
        <ul class="list">
          <li>
            <input type="tel" placeholder="请输入手机号" v-model="mobileNum">
          </li>
          <li>
            <input type="number" placeholder="请输入验证码" v-model="codeNum" :disabled="!countDown">
            <span v-if="!countDown" @click="getCode">{{timeText}}</span>
            <span v-else class="gray'">{{timeNum}}</span>
          </li>
        </ul>
        <div class="logBtn"><a href="#" :class="codeNum != '' && mobileNum != ''?'':'gray'">绑定手机号登录</a></div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import classification from '@/components/classification' //大图
export default {
  data () {
    return {
      smallImg: require("../../../static/image/bigimg.jpg"),
      countDown:false,
      timeText:"获取验证码",
      timeNum: 60,
      mobileNum:"",
      codeNum:""
    }
  },
  mounted(){},
  components: {
    classification
  },

  methods: {
    getCode(){
      if(this.mobileNum == "") return;
      this.countDown = true;
    }
  },

  created () {
  }
}
</script>

<style scoped>
img{
  display: block;
}
/* .container{
  width: 100%;
  height: 100%;
} */
.content{
  width: 100%;
  height: 100%;
  /* padding: 410rpx 0 0; */
  position: relative;
}
.imgBg{
  position: absolute;
  left: 0;
  top:0;
  width: 100%;
  height: 536rpx;
}
.logIn{
  padding: 410rpx 40rpx 0;
  position: relative;
  z-index: 3;
}
.list{
  width: 100%;
  height: 240rpx;
  box-sizing: border-box;
  padding: 0 40rpx;
  background-color: #fff;
  border-radius: 15rpx;
  box-shadow: 0rpx 5rpx 10rpx #dfdfdf;
}
li{
  height: 120rpx;
  line-height: 120rpx;
  font-size: 32rpx;
}
li:nth-child(1){
  border-bottom: 1px solid #ddd;
}
li:nth-child(2) input{
  width: 50%;
  float: left;
}
span{
  width: 190rpx;
  height: 70rpx;
  text-align: center;
  /* padding: 20rpx 26rpx; */
  background-color: #f2cc2b;
  color: #fff;
  float: right;
  line-height: 70rpx;
  margin-top: 25rpx;
  border-radius: 6rpx;
}

li input{
  height: 100%;
}
.logBtn{
  margin-top: 40rpx;
}
a{
  height: 100rpx;
  width: 100%;
  background-color: #f2cc2b;
  color: #fff;
  text-align: center;
  line-height: 100rpx;
  display: inline-block;
  font-size: 28rpx;
  border-radius: 6rpx;
}
.gray{
  background-color: #c1c1c1;
}
</style>
