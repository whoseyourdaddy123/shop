<template>
    <div class="tj">
      <div class="title">
        <mt-header title="提交订单">
          <router-link :to="`/seller/${info.id}`" slot="left">
            <mt-button icon="back" >返回</mt-button>
          </router-link>
        </mt-header>
      </div>
      <div class="address">
        <mt-cell v-if="!address.id" title="选择收货地址" to="/address" is-link></mt-cell>

          <mt-cell v-else :title="address.address"  to="/address" is-link :label="nameandphone" >

          </mt-cell>


        <mt-cell title="立即送出" class="label" label="为减少接触,封闭管理时,请在地址中更新具体取餐地址"></mt-cell>
      </div>

      <div class="shop">
        <div class="title">
          <img style="padding: 5px" :src="info.avatar" width="20px" height="20px">
          <div class="sname">
            {{info.name}}
          </div>
        </div>
        <div class="item">
          <ul>
            <li class="ditem" v-for="(cartFood,index) in cartFoods">
              <div class="diteml">
                <img v-lazy="cartFood.img"  width="55px" height="55px">
              </div>
              <div class="ditemr">
                <div class="foodnameprice">
                  <span>{{cartFood.name}} </span>
                  <span class="foodprice">¥{{Math.round(cartFood.price* cartFood.count*100)/100}}</span>
                </div>
                <div class="muti"><span>x️{{cartFood.count}} 份</span></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="deliver">
          <span>配送费</span>
          <span class="deliverprice">¥{{info.deliverPrice}}</span>
        </div>
        <div class="total">
          <span class="totalprice">共计¥{{info.deliverPrice + totalPrice }}</span>
        </div>
      </div>

      <div class="pay">
        <mt-cell title="支付方式" >
            <span >在线支付</span>
        </mt-cell>
        <mt-cell title="餐具选择"  >
          <mt-button size="small" @click="open" > {{message}}  > </mt-button>
          <mt-popup
            v-model="popupVisible"
            closeOnClickModal="true"
            popup-transition="popup-fade"
            position="bottom">
            <mt-picker style="width: 400px" :slots="slots" @change="getPeople"></mt-picker>
          </mt-popup>
        </mt-cell>
        <mt-cell title="发票" >
          <mt-switch v-model="fp" ></mt-switch>
        </mt-cell>
      </div>

      <div class="order">
        <div class="heprice">

          <span class="hj">合计
            <i class="money">¥{{info.deliverPrice + totalPrice }}</i>
          </span>
        </div>
        <div class="tjbtn">
          <button  @click="submitOrder">提交订单</button>

        </div>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState,mapGetters} from 'vuex'
  import {postInfo} from "../../api/axios";
  import {Toast} from 'mint-ui'
  export default {
    data(){
      return{
        popupVisible: false,
        slots:[{values:['无需餐具','1份','2份','3份','3份以上']}],
        message:'',
        fp: false
      }
    },
    methods: {
      open(){
       this.popupVisible = true
      },
      getPeople(picker, values) {
        let peoplenum = picker.getSlotValue(0);
        this.message = peoplenum;
      },
      submitOrder(){
        if(!this.address.address){
          Toast({
            message: '选择送货地址!',
            position: 'bottom',
            duration: 1500
          });
        }else{
          postInfo('/api/order/submitOrder',this.orderinfo).then((res)=>{
            if(res.code == 200){
              Toast({
                message: '下单成功!',
                position: 'bottom',
                duration: 2000
              });
              setTimeout(()=>{
                this.$store.dispatch('clearCart')
                this.$router.push('/order')
              },2000)
            }
          })
        }

      },

    },
    computed:{
      nameandphone(){
        return this.address.username + " " + this.address.phone
      },
        ...mapState(['info','cartFoods','userinfo','address']),
        ...mapGetters(['totalPrice'])
    },
    created() {
      this.orderinfo = {
        uid: this.userinfo.id,
        username: this.userinfo.username,
        deliveruser: this.address,
        phone: this.userinfo.phone,
        cartFoods: JSON.parse(localStorage.getItem("cartfoods")),
        totalprice: this.totalPrice + this.info.deliverPrice,
        shopid: this.info.id
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .tj
    position: absolute
    top: 0px
    width 100%
    background: #fff;
    .address
      padding: 7px
    .shop
      margin: 10px
      padding-left: 10px
      background-color: #fff
      overflow hidden
      .title
        display inline-block
        color: #999999;
        background-color: #fff;
        width: 100%;
        line-height 33px
        height 33px
        .sname
          display inline-block
          vertical-align top

    .item
      .ditem
        margin-bottom 5px
        padding 2px
        box-sizing border-box
        height 60px
        background-color #F8F8F8
        .diteml
          display inline-block

        .ditemr
          width 270px
          float: right
          display inline-block
          vertical-align top
          .foodnameprice
            height: 20px
            line-height: 20px
            margin-right 10px

            .foodprice
              float: right
          .fen

            height 16px
          .muti
            margin-top 10px
            margin-right 8px
            float right

    .deliver
      display flex
      padding 30px 0 0 5px
      span
        margin-bottom 10px
        width 300px
      .deliverprice
        text-align  right
        padding-right 20px

    .total
      height 30px
      border-top  1px grey dashed
      span
        width 100px
      .totalprice
        float  right
        margin-top 10px

    .order
      left 0
      right 0
      bottom 0
      flex 1
      height 40px
      background-color #fff
      text-align center

      .heprice
        display inline-block
        margin-left 100px

        .hj
          float right
          font-size: 16px
          color: #333
          .money
            color #FB4E44
            font-style normal
            font-weight bold
      .tjbtn
        float right
        display inline-block
        background-color #f8c74e

</style>
