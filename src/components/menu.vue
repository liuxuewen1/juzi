<template>
  <div class="menu">
    <ul>
      <li v-for="(item,index) in tit" :key = "item.key" @click="goNext(index)" :class="activeIndex==index?'active':''" >
        <span></span>
        <p>{{item.text}}</p>
      </li>
    </ul>
  </div>
  
</template>

<script>
export default {
  props: ['activeIndex'],
  data () {
    return {
      tit:[
        {
          text:'推荐'
        },
        {
          text:'我的'
        },
        {
          text:'设置'
        }
      ]
    }
  },
  methods:{
    goNext:function(index){
      this.$emit('goNext',index);
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
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow:  0rpx -3rpx 20rpx #dfdfdf;
}
.menu ul{
  display: flex;
}
.menu li{
  flex: 33%;
  text-align: center;
}
/* .menu .active{
  
} */
.menu p{
  height: 38rpx;
  line-height: 38rpx;
  font-size: 18rpx;
}
.menu span{
  display: inline-block;
}
li.active:nth-child(1) span{
  background-image: url(../../static/image/icon/i-recom-a.jpg);
}
li.active:nth-child(2) span{
  background-image: url(../../static/image/icon/i-own-a.jpg);
}
li.active:nth-child(3) span{
  background-image: url(../../static/image/icon/i-collection-a.jpg);
}
li:nth-child(1) span{
  width: 50rpx;
  height: 47rpx;
  background: url(../../static/image/icon/i-recom-g.jpg) no-repeat;
  background-size: 100% 91.4%;
}
li:nth-child(2) span{
  width: 45rpx;
  height: 47rpx;
  background: url(../../static/image/icon/i-own-g.jpg) no-repeat;
  background-size: 100% 95.7%;
}

li:nth-child(3) span{
  width: 47rpx;
  height: 47rpx;
  background: url(../../static/image/icon/i-collection-g.jpg) no-repeat;
  background-size: 100% 100%;
}
</style>
