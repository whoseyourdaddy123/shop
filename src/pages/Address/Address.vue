<template>
  <div>
    <mt-header title="地址列表">
    <router-link to="/payment" slot="left">
        <mt-button icon="back" >返回</mt-button>
      </router-link>

    </mt-header>

    <div class="nowAddress">
      <ul>
        <li v-for="(item,index) in addresses" class="address">
          <div class="tb">
            <span  v-if="item.id == currentAddress.id" class="iconfont iconshouye3"></span>
          </div>
          <div class="info" :class="{checked: item.id == address.id}" @click.prevent="chooseAddress(item)">
            <div class="infoaddress" >{{item.address }}</div>
            <div class="infoname">{{item.username }} &nbsp {{item.phone}}</div>
          </div>
          <a class="edit"></a>

        </li>
      </ul>
    </div>
    <div class="newAddress">
      <button class="btn" type="default" @click="addNewAddress">
        + 新增收货地址
      </button>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import {getInfo} from "../../api/axios";

  export default {
    name:'address1',
    data() {
      return{
        currentAddress:{},
        addresses:[]
      }
    },
    components: {},
    methods: {
      addNewAddress() {
        this.$router.push('/newAddress')
      },
      getAllAddress() {
       setTimeout(()=>{
         getInfo('/api/address', {id: this.userinfo.id}).then((res) => {
           this.addresses = res.data})
      },400)



      },
      chooseAddress(address){
        this.currentAddress = address
        this.$store.dispatch('getAddress',address)
      }
    },
    computed: {
      ...mapState(['userinfo', 'info','address'])
    },
    created() {
        this.getAllAddress()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .nowAddress
    .address
      height 50px
      border-bottom #93999f solid 1px
      .tb
        float: left
        display inline-block
        margin-top 20px
        .iconshouye3
          width 30px
          height 30px
      .info
        margin 5px 0 0 10px
        width 90%
        display inline-block
        &.checked
          background-color  grey
        .infoaddress
          font-size 16px
          color #333
        .infoname
          margin-top 10px
          font-size 14px
          line-height 20px
          color #666

  .newAddress
    position absolute
    bottom 0
    left 0
    width 100%
    height 50px
    border-top 1px solid #93999f

    .btn
      width 100%
      line-height 50px
      text-align center
      font-size 14px solid

</style>
