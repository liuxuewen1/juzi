<template>
  <div class="order-warp">
    <tab active="order"></tab>
    <order :datas="data"></order>
  </div>
</template>

<script>
import tab from '@/components/center-tab'
import order from '@/components/order'
export default {
  data(){
    return {
        data: [{
            date: "2018-12-22 14:23:23",
            photo: "https://www.baidu.com/img/bd_logo1.png",
            title: "青春年华套图",
            price: "599",
            count: "12",
            qrcode: "https://www.baidu.com/img/bd_logo1.png",
            status: "待拍照",
            address: "北京市海淀区农大南路1号硅谷亮城"
        },{
            date: "2018-12-22 14:23:23",
            photo: "https://www.baidu.com/img/bd_logo1.png",
            title: "青春年华套图",
            price: "599",
            count: "12",
            qrcode: "https://www.baidu.com/img/bd_logo1.png",
            status: "待拍照",
            address: "北京市海淀区农大南路1号硅谷亮城"
        }]
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
    tab,
    order
  }
}
</script>

<style>
</style>
