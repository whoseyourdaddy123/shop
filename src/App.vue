<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-if="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from '../src/components/FooterGuide/FooterGuide'
import {getInfo} from "./api/axios";
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  mounted() {
    const uid = sessionStorage.getItem("userId")
    if(uid){
      getInfo('/api/user/findByUserId',{id:uid}).then((res)=>{
        this.user = res.data
        this.$store.dispatch('getUserinfo',this.user)
      })
    }
  },
  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
