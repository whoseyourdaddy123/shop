<template>
  <div>
    <section class="head">
      <div class="bg">
        <div class="tx">
          <img src="./tx.jpg" width="75px" height="75px">
        </div>
        <div class="username">
          <span v-if="userinfo.username||this.user.username">{{userinfo.username ||this.user.username}}</span>
          <span v-else>尚未登录</span>
        </div>
      </div>


    </section>
    <div class="content">
      <div class="dcontent">
        <div style="margin: 10px">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshouye8"></use>
          </svg>
          <span>美团红包</span>
        </div>
      </div>

      <div class="dcontent">
        <div style="margin: 10px">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshouye8"></use>
          </svg>
          <a href="/address">收货地址</a>
        </div>
      </div>

      <div class="dcontent">
        <div style="margin: 10px">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshouye8"></use>
          </svg>
          <span>常见问题</span>

        </div>
      </div>


      <div class="dcontent">
        <div style="margin: 10px">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshouye8"></use>
          </svg>
          <span>协议与说明</span>
        </div>
      </div>

      <div class="dcontent">
        <div style="margin: 10px">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshouye8"></use>
          </svg>
          <span @click="logout">退出登录</span>
        </div>
      </div>

    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import {mapState} from "vuex";
  import { MessageBox,Toast } from 'mint-ui';
  import {getInfo} from "../../api/axios";

  export default {
    created(){
    },
    data(){
      return{
        user:{}
      }
    },
    components: {
      HeaderTop
    },
    computed:{
      ...mapState(['userinfo'])
    },
    methods:{
      logout(){
        if(!this.userinfo.id){
          Toast({
            message: '尚未登录',
            position: 'bottom',
            duration: 1000
          });
        }else{
          MessageBox.confirm('确定退出?').then(action => {
            this.$store.dispatch('logout')
            sessionStorage.removeItem("userId")
            this.$router.replace('/login')
          }).catch(()=>{});
        }

      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .head
    .bg
      width: 100%
      height 130px
      padding: 10% 0 5%
      background: url('http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/78890a8f1859bc10152151fc64aff5cc.png');
      background-size: 100% 100%;
      text-align center
  .content
    background-color #ffffff
    .dcontent
      margin 10px 5px
      border-bottom 1px solid grey



</style>
