<template>
  <div class="appointment">
    <div class="banner"><span>头像</span><img :src="avatar" alt=""></div>
    <div class="bgc"></div>
    <div class="bottom">
      <ul class="user-info mb30">
        <li>昵称<i>{{username}}</i></li>
        <li>性别<i>{{gender}}</i></li>
        <!-- <li>出生日期<i>1990-10-18</i></li> -->
        <li>地区<i>{{city}}</i></li>
        <li>手机号<i>{{phone}}</i></li>
      </ul>
    </div>
    <!-- <p>退出登录</p> -->
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      avatar: '',
      username: '',
      city: '',
      phone: '',
      gender: '',
    }
  },
  components: {
  },

  methods: {
    getInfo(){
      this.avatar = wx.getStorageSync('x-avatar');
      this.username = wx.getStorageSync('x-name');
      this.city = wx.getStorageSync('x-city');
      this.phone = wx.getStorageSync('x-phone');
      this.gender = wx.getStorageSync('x-gender') == 1? '男' : '女';
    }
  },

  created () {
  },
  onLoad(options) {
    this.getInfo();
  },
  mounted(){},
}
</script>

<style scoped>
.banner{
  width: 100%;
  height: 300rpx;
  padding: 0 50rpx;
  box-sizing: border-box;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
  line-height: 300rpx;
  /* background-color: #fff; */
}
.banner img{
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  float: right;
  margin-top: 50rpx;
}
.bgc{
  height: 26rpx;
  background-color: #f5f4f9;
}
.banner image{
  width:100%;
  height: 400rpx;
}
.bottom{
  padding: 30rpx;
  padding-top:0;
  border-top:1px solid #f2f2f2;
}
p{
  background-color: #f9614a;
  font-size: 32rpx;
  color: #fff;
  height: 100rpx;
  width: 100%;
  line-height: 100rpx;
  text-align: center;
  border-radius: 3rpx;
  margin-top: 30rpx;
  position: fixed;
  bottom: 0;
  left: 0;
}
.user-info{
  background-color: #fff;
  font-size: 28rpx;
  box-sizing: border-box;
  padding: 0 40rpx;
  color: #333;
  /* box-shadow:  0rpx 5rpx 10rpx #dfdfdf; */
}
.user-info li{
  height: 120rpx;
  line-height: 120rpx;
  text-align: left;
  box-sizing: border-box;
  border-bottom: 1rpx solid #ddd;
}
.user-info li:nth-last-child(1){
  border: none;
}
.user-info li i{
  /* width: 14rpx;
  height: 28rpx; */
  /* background: url(../../../static/image/icon/jiantou.png) no-repeat; */
  /* background-size: 100% 100%; */
  float: right;
  color: #929292;
  /* margin-top: 44rpx;*/
  padding-right: 10rpx; 
}

</style>
