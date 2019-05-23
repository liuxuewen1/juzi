<template>
	<div class="logo">
	  <img :src="logo">
	</div>
</template>
<script>
	export default {
	  data () {
	    return {
	      logo: require("../../static/image/icon/logo.png"),
	    }
	  },
	}
</script>

<style scoped>
.logo{
  text-align: center;
  padding-bottom: 100rpx;
}
.logo img{
  width: 100px;
  height: 100px;
}
</style>
