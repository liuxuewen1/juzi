<template>
  <div class="menu">
    <ul>
      <li>
        <span class="icon"></span>
        <p>推荐</p>
      </li>
      <li>
        <span class="icon"></span>
        <p>我的</p>
      </li>
      <li>
        <span class="icon"></span>
        <p>设置</p>
      </li>
    </ul>
  </div>
  
</template>

<script>
export default {
  // props: [],
  data () {
    return {
      // width: this.width,
      // text: this.text
    }
  }
}
</script>

<style scoped>
.menu{
  width: 100%;
  height: 103rpx;
  box-sizing: border-box;
  padding: 14rpx 50rpx 4rpx;
}
.menu ul{
  display: flex;
}
.menu li{
  flex: 33%;
  text-align: center;
}
.menu p{
  height: 38rpx;
  line-height: 38rpx;
  font-size: 18rpx;
}
.menu span{
  display: inline-block;
}
.menu span:nth-child(1){
  width: 50rpx;
  height: 43rpx;
  background: url(../../static/image/icon/i-recom-g.jpg) no-repeat;
  background-size: 100% 100%;
}
</style>
