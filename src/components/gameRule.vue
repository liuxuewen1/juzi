<template>
    <div class="contItem">
      <h3 class="itemTit"><i>玩法介绍</i><span></span></h3>
      <div class="itemLast">
        <image src="/static/image/flow.jpg" alt="" style="width:100%;display: block;" mode="widthFix"/>
        <p>预约完成后获得二维码，找到附近的美景成真全方位激光数字影棚；</p>
        <p>在影棚扫一扫预约二维码，按照工作人员的指引，即可开始您的拍摄旅程；</p>
        <p>您可按照我们的样片进行拍摄，也可自创拍摄动作；</p>
        <p>拍摄完成后，即可在小程序内看到您的照片；</p>
      </div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style>

.itemTit{
  width: 100%;
  height: 64rpx;
  line-height: 64rpx;
  font-size: 28rpx;
  color: #999;
  position: relative;
}
.itemTit i{
  position: relative;
  display: inline-block;
  z-index: 2;
  height: 100%;
  padding-right: 25rpx;
  background-color: #fff; 
}
.itemTit span{
  position: absolute;
  right: 0;
  top: 30rpx;
  width: 100%;
  height: 1rpx;
  background-color: #ddd;
}
.imgText{
  height: 54rpx;
  width: 100%;
  font-size: 28rpx;
  color: #333;
}
.itemImg{
  padding-top: 17rpx;
  box-sizing: border-box;
  height: 197rpx;
  display: flex;
}
.itemImg .itemImgLi{
  text-align: center;
  flex: 1;
}
.itemImg image{
  width: 200rpx;
  height: 180rpx;
  display: inline-block;
  /* margin-right:  */
}
.itemLast image{
  margin-bottom:17rpx;
}
.itemLast p{
  font-size: 28rpx;
  color: #333;
  padding-left: 18rpx;
  line-height: 48rpx;
  position: relative;
}
.itemLast p::before{
  content: "";
  width: 7rpx;
  height: 7rpx;
  background-color: #333;
  border-radius: 100%;
  position: absolute;
  left: 0;
  top:28rpx;
}
</style>
