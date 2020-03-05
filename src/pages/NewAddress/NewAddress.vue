<template>
    <form>
      <mt-field label="联系人: " placeholder="请输入联系人" v-model="username"></mt-field>
      <mt-field label="手机号: " placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field label="收货地址: " placeholder="请输入收货地址" v-model="address"></mt-field>
      <div>
     <router-link :to="{path:'/address'}">
       <mt-button type="primary" style="width: 100%" @click="submitAddress">提交</mt-button>
     </router-link>

      </div>
      <router-link :to="{path:'/address'}">
        <mt-button type="default" style="width: 100%">返回</mt-button>
      </router-link>
    </form>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import {postInfo} from "../../api/axios";
  import Toast from "mint-ui/packages/toast/src/toast";
    export default {
      data(){
        return{
          username:'',
          phone: '',
          address: '',

        }
      },
      computed:{
        ...mapState(['userinfo'])
      },
      methods:{
        submitAddress(){
          postInfo('/api/address/new',{uid:this.userinfo.id,username:this.username,phone:this.phone,address:this.address})
            .then((res)=>{
            if(res.code == 200){
              let address = {username:this.username,phone:this.phone,address:this.address}
              console.log("address ajax"+JSON.stringify(address))
              this.$store.dispatch('getAddress',address)
              return
            }
          })
        },

      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
