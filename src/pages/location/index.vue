<template>
  <div class="center-warp">
  </div>
</template>

<script>
export default {
  props: ['latitude', 'longitude'],
  data () {
    return {
      routeInfo: {}
    }
  },

  components: {
    
  },

  methods: {
    
  },
  onShow(){
    wx.openLocation({
      latitude: this.latitude || 39.9850750000,
      longitude: this.longitude || 116.3161200000,
      scale: 18
    })

  },
}
</script>

<style scoped>
</style>
