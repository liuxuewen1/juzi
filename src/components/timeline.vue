<template>
    <div class="timeline">
        <p>{{item.merchantName}}</p>
        <p class="date">{{item.time}}</p>
        <p class="title">{{title}}</p>
        <p class="red">照片单价：{{item.price}}/张 打印{{item.printPrice}}/张</p>
        <p class="red">优惠信息：{{item.discountNum}}张{{item.discountMoney}}元</p>
    </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    title(){
      const objWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      return objWeek[this.item.week] + ' . ' + this.item.packName;
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.timeline{
  margin: 30rpx 40rpx 0 28rpx;
  padding: 8rpx 18rpx;
  border-left: 4rpx solid #000;
  
}
.timeline p{
  height: 36rpx;
  line-height: 36rpx;
  font-size: 32rpx;
  color: #333;
}
.timeline .red{
  color: #f92b2bcf;
}
</style>
