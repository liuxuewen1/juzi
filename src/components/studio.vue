<template>
  <div class="studio">
    <div class="addrBox">
      <h3 class="addr">
        <i class="location"></i>
        <span>当前定位</span>
        <!-- <i class="jiantou"></i> -->
      </h3>
      <p>{{addr}}</p>
      <span class="nextAddr" @click="onAgain">重新定位</span>
    </div>
    <div class="nearbyStudio">
      <h3 class="tit">附近的影棚</h3>
      <ul>
        <li v-for="item in addressList" :key="item.id">
          <img :src="item.image" alt="" class="nearImg">
          <div class="center">
            <h3>{{item.name}}</h3>
            <p class="address">{{item.address}}</p>
            <p class="info">{{item.info}}</p>
          </div>
          <div :class="{'radio': true, 'radio-active': item.is_active }" @click="onChoseStudio(item)"></div>
        </li>
      </ul>
      <p class="sureStudio" @click="onSubmitStudio">确认选择</p>
    </div>
  </div>
</template>

<script>
import { promisify } from '@/utils/index' 
export default {
  props: ['onSubmit', 'mchId'],
  data () {
    return {
      longitude: 0, 
      latitude: 0,
      addressList: [],
      addr:""
    }
  },
  computed: {
  },
  methods: {
    getCurLocation(){
      this.$http.get('/wechat/user/getLocation?longitude='+this.longitude+'&latitude='+this.latitude).then(res => {
        this.addr = res.data.data.address;
      })
    },
    getDataAddress(){
      this.$http.get('/wechat/merchant/nearlist?longitude='+this.longitude+'&latitude='+this.latitude).then(res => {
        const data = res.data;
        if(data.status == 1000){
          data.data.merchantList.forEach(item => {
            item.is_active = false;
            if(item.id == this.mchId) item.is_active = true;
          })
          this.addressList = data.data.merchantList;
          this.addr = data.data.userAddress;
        }
      })
    },
    getLocation(){
      const that = this;
      return promisify(wx.getSetting)().then(res => {
        // wx.showToast({title: res.authSetting['scope.userLocation'].toString()})
        const scope = res.authSetting['scope.userLocation'];
        if (scope == undefined) {
          promisify(wx.authorize)({
            scope: 'scope.userLocation'
          }).then(res => {
            return this.setLocation();
          });
        }else if(scope == false){
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则定位功能将无法使用',
            success: function (tip) {
              if (tip.confirm) {
                wx.openSetting({
                  success(){
                    return that.setLocation();
                  }
                });
              }
            }
          });
        }else{
          return this.setLocation();
        }
      });
    },
    setLocation(){
      return promisify(wx.getLocation)()
    },
    onChoseStudio(item){
      item.is_active = !item.is_active;
      this.onSubmit('Studio', this.addressList.filter(item => item.is_active === true), true);
    },
    onAgain(){
      this.getLocation().then((res) => {
        this.longitude = res.longitude;
        this.latitude = res.latitude;
        this.getDataAddress();
      })
    },
    onSubmitStudio(){
      this.onSubmit('Studio', this.addressList.filter(item => item.is_active === true))
    }
  },
  onShow(){
    console.log('show')
  },
  onLoad(){
    this.onAgain();
  },
  components:{}
}
</script>

<style scoped>
.studio{
  background-color: #fff;
  padding-bottom: 20rpx;
}
.addrBox{
  position: relative;
  height: 158rpx;
  box-sizing: border-box;
  padding-top: 44rpx 0 43rpx;
  border-bottom:1rpx solid #ccc;
}
.addrBox p{
  height: 24rpx;
  line-height: 1;
  font-size: 24rpx;
  color: #333;
  padding-left: 70rpx;
}
.nextAddr{
  width: 160rpx;
  height: 70rpx;
  position: absolute;
  right: 50rpx;
  top: 45rpx;
  background-color: #f2cc2b;
  text-align: center;
  font-size: 26rpx;
  color: #fff;
  line-height: 70rpx;
  border-radius: 5rpx;
}
.addrBox .addr{
  padding-top:44rpx;
  display: flex;
  height: 46rpx;
  line-height: 30rpx;
  font-size: 30rpx;
  color: #333;
  /*border-top: 1px solid #f5f2f1;*/
  align-items: center;
}

.addrBox i.location{
  background: url("../../static/image/location.png") no-repeat center center;
  background-size: contain;
  width: 29rpx;
  height: 36rpx;
  margin-left: 30rpx;
  margin-right: 10rpx;
}
.nearbyStudio{
  padding: 23rpx 30rpx;
}
.nearbyStudio ul{
  overflow: scroll;
  height: 530rpx;
}
.nearbyStudio .tit{
  height: 40rpx;
  line-height: 40rpx;
  font-size: 26rpx;
  color: #333;
}
.nearbyStudio li{
  height: 180rpx;
  box-sizing: border-box;
  padding: 30rpx 0;
  position: relative;
}
.nearbyStudio li h3{
  height: 44rpx;
  line-height: 1;
  font-size: 26rpx;
  color: #000;
  font-weight:bold;
}
.nearbyStudio .address{
  height: 40rpx;
  font-size: 24rpx;
  color: #333;
  max-width: 600rpx;
}
.nearbyStudio .info{
  height: 24rpx;
  line-height: 1;
  font-size: 24rpx;
  color: #000;
}
.nearbyStudio .nearImg{
  width: 106rpx;
  height: 106rpx;
  float: left;
  margin-right: 36rpx;
}
.sureStudio{
  height: 100rpx;
  background: #fbd465;
  font-size: 30rpx;
  color: #333;
  text-align: center;
  line-height: 100rpx;
  border-radius: 5rpx;
}
.radio{
  position: absolute;
  right: 35rpx;
  top: 74rpx;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  border: 1px solid #666;
}
.radio-active{
  border: none;
  background: #fff url("../../static/image/icon/chose.png") 0 0 no-repeat;
  background-size: cover;
}
.radio .radioInput{
  width: 30rpx;
  height: 30rpx;
  display: inline-block;
}
</style>
