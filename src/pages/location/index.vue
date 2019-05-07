<template>
  <div class="center-warp">
  </div>
</template>

<script>
export default {
  data () {
    return {
      routeInfo: {},
      longitude: '116.3161200000',
      latitude: '39.9850750000'
    }
  },

  components: {
    
  },

  methods: {
    
  },
  onShow(){
    console.log(this.latitude)
    wx.openLocation({
      longitude: this.latitude*1,
      latitude: this.longitude*1,
      scale: 18
    })

  },
  onLoad(options){
    this.latitude = options.latitude;
    this.longitude = options.longitude;
    console.log(this.latitude,22)
  }
}
</script>

<style scoped>
</style>
