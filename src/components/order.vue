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
  }
}
</script>

<style scoped>

</style>
