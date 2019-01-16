<template>
  <div class="setting-warp">
    <h2 class="title">基本设置</h2>
    <div class="baseinfo">
      <item name="昵称" gourl="xxx"></item>
      <item name="性别" gourl="xxx"></item>
      <item name="生日" gourl="xxx"></item>
      <item name="签名" gourl="xxx"></item>
    </div>
    <div class="assistant">
      <h3 class="title">拍摄助手</h3>
    </div>
    <div class="bold-help">
      <itembold name="关于我们" gourl="xxx"></itembold>
      <itembold name="投诉建议" gourl="xxx"></itembold>
    </div>
  </div>
</template>

<script>
import item from '@/components/setting-item'
import itembold from '@/components/setting-item-bold'
export default {
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    item,
    itembold
  }
}
</script>

<style scoped>
.setting-warp{
  border-top: 1rpx solid #f5f2f1;
}
.title{
  margin-left: 20rpx;
  padding: 28rpx 0 46rpx;
  font-size: 46rpx;
  font-weight: bold;
  border-bottom: 1rpx solid #f5f2f1;
}
</style>
