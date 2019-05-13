<template>
  <div class="appointment">
    <ul class="hot">
      <li @click="onConfirm(item.name)" v-for="item in keywords" :key="item.name">#{{item.name}}</li>
      <li class="all">#全部</li>
    </ul>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      keywords: [],
      key: '',
      result: []
    }
  },
  components: {
    // studio,
    // scene
  },

  methods: {
    getHotKeywords(){
      this.$http.get('/wechat/search/hotkeywords').then(res => {
        const data = res.data;
        if(data.status == 1000){
          this.keywords = data.data.list;
        }
      })
    },
    onConfirm(e){
      if(typeof e === 'string'){
        this.key = e;
      }else{
        this.key = e.mp.detail.value;
      }
      wx.navigateTo({ url: '/pages/searchResult/main?key=' + this.key })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getHotKeywords()
  },
  onLoad(options) {
  },
  mounted(){},
}
</script>

<style scoped>
.hot{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 30rpx;
  margin: 10px;
}

.hot li{
  flex: 0 0 22%;
  font-size: 24rpx;
  text-align: center;
  border: 1px solid #eee;
  margin: 5px;
  padding: 5px 8px;
  border-radius: 5px;
  border-color: #f8dc07;
}
.cont{
  box-sizing: border-box;
  width: 100%;
  padding: 40rpx 50rpx 0;
}
.all{
  background-color: #f2cc2b;
}
</style>
