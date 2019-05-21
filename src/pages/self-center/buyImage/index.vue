<template>
  <div class="center-warp">
    <div 
        v-if="src"
        @click="onPreview"
        :class="{imagesize: true, big: isBuy==1, small: isBuy==0}" 
        :style="{'backgroundImage': 'url('+src+')'}">
        <!-- <img :class="isBuy==0?'small': ''" @click="onPreview" :src="src" alt=""> -->
    </div>
    <div class="save">
        <button v-if="isBuy==1" class="saveBtn" @click="onDownload">下载高清照片{{progress}}</button>
        <button v-if="isBuy==0" class="saveBtn" @click="onBuy">购买高清照片</button>
    </div>
  </div>
</template>

<script>
// import tab from '@/components/center-tab'
// import timeline from '@/components/timeline'
// import order from '@/components/order' 
export default {
  data(){
    return { 
        src: '',
        progress: '',
        isBuy: 0,
        orderId: '',
        imgId: ''
    }
  },
  computed: {
  },
  methods: {
    onPreview(){
        if(this.isBuy == 0) return;
        wx.previewImage({
            current: this.src, // 当前显示图片的http链接
            urls: [this.src] // 需要预览的图片http链接列表
        })
    },
    onBuy(){
        const that = this;
        this.$http.post(`/wechat/user/buyImages?orderId=${this.orderId}&imgIds=${this.imgId}&payment=1`).then(res => {
            const data = res.data.data;
            if(res.data.status == 1000){
                console.log(data);
                wx.requestPayment({
                    nonceStr: data.nonceStr,
                    package: data.package,
                    paySign: data.paySign,
                    signType: data.signType,
                    timeStamp: data.timeStamp,
                    success(payRes){
                        console.log(payRes)
                        that.getImage();
                    },
                    fail(){
                        console.log('fail')
                    }
                })
            }
        })
    },
    getImage(){
        this.$http.get(`/wechat/user/imageInfo?orderId=${this.orderId}&imgId=${this.imgId}`).then(res => {
            const data = res.data;
            if(data.status == 1000){
                this.isBuy = data.data.imageInfo.isBuy;
                this.src = data.data.imageInfo.minImage;
            }
        })
    },
    onDownload(){
    // 下载监听进度
     const downloadTask = wx.downloadFile({
       url: this.src, 
       success: function(res) {
         // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
         console.log(res)
         if (res.statusCode === 200) {
           wx.saveImageToPhotosAlbum({
             filePath: res.tempFilePath,
             success: function(res) {
               wx.showToast({
                 title: '保存图片成功~',
               });
             },
             fail: function(res) {
               wx.showToast({
                 title: '保存图片失败~',
               });
             }
           })
         }
       }
     });
    downloadTask.onProgressUpdate((res) => {
       if (res.progress === 100) {
         this.progress = '';
    } else {
         this.progress =  res.progress + '%';
       }
     });
  },
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
  },
  onLoad(options){ 
      this.imgId = options.imgId;
      this.orderId = options.orderId;
      this.getImage();
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
.imagesize{
 display:flex;                  
 justify-content: center;   
 margin: 20rpx 10rpx;  
 position: relative;
 height: 400px;
 background-repeat: no-repeat;
 background-position: center;
}
.small{
    background-size: 100px auto;
}
.big{
    background-size: contain;
}
.save{
    text-align: center;
    margin: 20rpx;
}
.saveBtn {
    width: 80%;
    background-color: #179B16;
    color: #fff;
}
</style>
