<template>
  <div class="studio">
      <div class="title">
        <h3 @click="onTab('scene')" :class="{tab_scene: true, active: active_scene}">选择场景</h3>
        <h3 @click="onTab('studio')" :class="{tab_studio: true, active: !active_scene}">选择影棚</h3>
        <div></div>
      </div>
      <scene 
        v-if="active_scene"
        :onSubmit='onSubmit' 
        :id="id"
        :checked="showSceneArr"
      />
      <studio 
        v-if="!active_scene"
        :onSubmit='onSubmit' 
        :mchId='mchId'
      />
    </div>
</template>

<script>
import studio from "@/components/studio";
import scene from "@/components/scene";
export default {
  props: ['id', 'callback'],
  data () {
    return {
      active_scene: true,
      showSceneArr: [],
      showStudioName: '',
      mchId: 0
    }
  },
  computed: {
    
  },
  methods: {
    onAppoint(){
      const sceneArr = [];
      this.showSceneArr.forEach(item => sceneArr.push(item.id))
      const params = 'packageId='+this.id+'&backIds='+sceneArr.join(',')+'&mchId='+this.mchId;
      this.$http.get('/wechat/user/subOrder?'+params).then(res => {
        const data = res.data;
        if(data.status == 1000){
          console.log(data.data.orderId, 666)
          wx.navigateTo({ url: '/pages/order-success/main?id=' + data.data.orderId });
          this.callback && this.callback();
        }
      })
    },
    onSubmit(type, list, not_check){
      if(type === 'Scene'){
        this.showSceneArr = list;
        !not_check && this.checkScene() && this.checkStudio() && this.onAppoint();
      }else if(type === 'Studio'){
        // const data = this.dataAddress.addressList.filter(item => item.is_active === true);
        if(list.length === 1){
          this.showStudioName = list[0].name;
          this.mchId = list[0].id;
        }
        !not_check && this.checkStudio() && this.checkScene() && this.onAppoint();
      }
    },
    checkScene(){
      if(!this.showSceneArr.length){
        wx.showToast({
          title: '请选择场景',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      return true;
    },
    checkStudio(){
      if(!this.mchId){
        wx.showToast({
          title: '请选择影棚',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      return true;
      
    },
    onTab(type){
      this.active_scene = type === 'scene'? true : false;
    },
    init(){
      this.showSceneArr = [];
      this.showStudioName = '';
      this.mchId = 0;
    }
  },
  components:{
    studio,
    scene
  },
  // onUnload(){
  //   console.log('unload')
  //   this.init();
  // },
  // onHide(){
  //   console.log('hide')
  // },
  onLoad(options){
    this.id = options.id;
  }
}
</script>

<style scoped>
.title{
  height: 90rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #ccc;
}
.title h3{
  width: 50%;
}
.tab_scene{
  float: left;
}
.tab_studio{
  float: right;
}
.studio{
  width: 100%;
  height: 980rpx;
  position: fixed;
  bottom:0;
  left: 0;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.5);
}
.height{
  /*height: 630rpx;*/
}
.studio h3{
  background-color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 30rpx;
  color: #333;
  padding: 0 30rpx;
  box-sizing: border-box;
  text-align: center;
}
.studio h3.active{
  color: #eb529e;
  border-bottom: 1rpx solid #eb529e;
}
</style>
