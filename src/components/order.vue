<template>
    <div class="order">
        <item v-for="(value, index) in datas" :data="value" :key="index"></item>
    </div>
</template>

<script>
import item from '@/components/order-item.vue'
export default {
  props: ['datas'],
  components: {
    item
  },
  methods: {
        getData(){
            this.$http.get('/wechat/user/myPhotoList').then(res => {
                const data = res.data;
                if(data.status == 1000){
                  this.detail = data.data;
                  console.log(this.detail)
                }
            }) 
        }
  },
  created(){
    // this.getData();
  }
}
</script>

<style scoped>

</style>
