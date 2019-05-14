<template>
  <div class="bottom-box">
    <div class="menu" v-if="!showAppoint">
      <div class="left" @click="onMakePhone"><span></span><br>咨询</div>
      <div class="center" @click="goAppoint">立即拍摄</div>
      <div class="right" @click="collectionFn"><span :class="isstore?'orange':''"></span><br>收藏</div>
    </div>
    <appoint 
      v-if="showAppoint" 
      :id="packageid"
      :callback="succCallback"
    />
    <div :class="{ shadow: showAppoint}" @click="onClosePopup"></div>
  </div>
</template>

<script>
import appoint from "@/components/details-appoint";
export default {
  props: ['packageid', 'isstore'],
  data () {
    return {
      showAppoint: false,
      backIds: '2',
      mchId: '2'
    }
  },
  methods:{
    onMakePhone(){
      wx.makePhoneCall({
        phoneNumber: '400-8888-8888'
      })
    },
    succCallback(){
      this.showAppoint = false;
    },
    onClosePopup(){
      this.showAppoint = false;
    },
    collectionFn(){
      this.$http.get(`/wechat/package/store?id=${this.packageid}&store=${!this.isstore? 1 : 0}`).then(res => {
        if(res.data.status == 1000){
          this.isstore = this.isstore? 0 : 1;
        }
      })
    },
    gotoSucc () {
      const url = '../order-success/main'
      wx.navigateTo({ url })
      // wx.redirectTo({ url })
    },
    goAppoint(){
      this.showAppoint = true;
      // this.gotoSucc();
      // this.onAppoint();
    },
    onAppoint(){
      // const params = `packageId=${this.packageid}&backIds=${this.backIds}&mchId=${this.mchId}`;
      // this.$http.get('/wechat/user/subOrder?' + params).then(res => {
      //   const data = res.data;
      //   if(data.status == 1000){
      //     this.detail = data.data;
      //     console.log(this.detail)
      //   }
      // })
    }
  },
  mounted(){
    this.$http.post('https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + wx.getStorageSync('x-token'), {
      scene: 'MjAxOTA0MjIyMjU0NzE1OA=='
    }).then(res => {
      console.log(res)
    })
  },
  onLoad(){
    this.showAppoint = false;
  },
  components: {
    appoint
  }
}
</script>

<style scoped>
.menu{
  width: 100%;
  height: 103rpx;
  box-sizing: border-box;
  padding: 14rpx 0 4rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow:  0rpx -3rpx 20rpx #dfdfdf;
  display: flex;
}
.menu div{
  text-align: center;
}
.menu .left,.menu .right{
  font-size: 18rpx;
  flex: 1;
}
.menu span{
  /* width: 47rpx; */
  height: 44rpx;
  display: inline-block;
}
.left span{
  width: 43rpx;
  background: url('../../static/image/icon/consult.jpg') no-repeat;
  background-size: 100% 100%;
}
.right span{
  width: 47rpx;
  background: url('../../static/image/icon/collection.jpg') no-repeat;
  background-size: 100% 100%;
}
.right .orange{
  background: url('../../static/image/icon/collection2.jpg') no-repeat;
  background-size: 100% 100%;
}
.menu .center{
  flex: 4;
  font-size: 26rpx;
  height: 70rpx;
  background-color: #f2cc2b;
  color: #fff;
  line-height: 70rpx;
  border-radius: 6rpx;
}
.shadow{
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  z-index: 10;
}
</style>
