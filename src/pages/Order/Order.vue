<template>
  <div>
    <section v-if="!this.uid" class="order_no_login">
      <img src="./images/order/person.png">
      <h3>登录后查看外卖订单</h3>
      <button @click.stop="$router.push('/login')">立即登陆</button>
    </section>
    <scroll v-else :data="orders" ref="order" class="order">
     <ul style="background-color: #ffffff">
      <li v-for="(order,index) in orders" class="listyle">
        <div>
          <div class="suojin">
            <div class="tou">
              <div class="img">
                <img  v-lazy="order.shopAvatar" height="30px" width="30px" >
              </div>
              <div class="shopname">
                {{order.shopName}}
              </div>
              <div class="more" >
                 <!-- <router-link :to="{path:`/seller/${order.shopId}`}">
                  <span  class="iconfont iconarrowRight"></span>
                  </router-link>-->
                <button @click="topage(order.shopId)">
                  &gt
                </button>

              </div>
            </div>
            <div class="body">
              <div>
                <ul>
                  <li v-for="(list,index) in order.lists">
                    <div class="foods">
                      <p>
                        <span>{{list.foodname}}</span>
                        <span style="float: right">x️{{list.foodcount}}</span>
                      </p>
                    </div>

                  </li>
                </ul>
                <p style="margin-top: 7px;margin-bottom: 10px; vertical-align:middle">
                  <span style="font-size: 12px;color: #999999">{{order.createTime}}</span>
                  <span style="float: right;font-size: 14px;margin-right: 10px">实付¥{{order.totalPrice}}</span>
                </p>
              </div>
            </div>
            <div class="footer">
              <p>
                <mt-button style="height: 25px;background-color: #26a2ff" size="small">评价</mt-button>
                <span style="float: right">
                  <mt-button style="height: 25px" size="small" @click="delOrder(order.orderId)">删除</mt-button>
                  <mt-button style="height: 25px;background-color: #FFD161" size="small">再来一单</mt-button>
                </span>
              </p>
            </div>
          </div>
          <div style="background-color: #f5f5f5;height: 15px"></div>
        </div>
      </li>
    </ul>
      <loading v-show="!orders.length"></loading>
    </scroll>

  </div>

</template>

<script>
  import { MessageBox,Toast } from 'mint-ui';
  import {mapState} from 'vuex'
  import {getInfo} from "../../api/axios";
  import Scroll from '../../components/scroll/scroll'
  import Loading from "../../components/loading/loading";

  export default {
    name: "Order",
    data() {
      return {
        orders: [],
        uid: 0,
      }
    },
    created() {
      //获取用户的订单
      const uid = localStorage.getItem("userId")
      this.uid = uid
      if(this.uid){
        setTimeout(()=>{
          getInfo('/api/order/all', {userid: this.userinfo.id || userid})
            .then((res) => {
              this.orders = res.data
            })
        },500)
      }

    },
    methods:{
      topage(id){
        this.$router.push(`/seller/${id}`)
      },
      delOrder(id){
        MessageBox.confirm('确定删除吗?').then(() => {
          getInfo('/api/order/deleteById',{id:id})
            .then((res)=>{
              if(res.code == 200){
                Toast({
                  message: '删除成功!',
                  position: 'bottom',
                  duration: 1000
                });
                setTimeout(()=>{
                  window.location.reload()
                  this.$refs.order.refresh()
                },1000)
              }
            })
        }).catch(()=>{});


      }
    },
    computed: {
      ...mapState(['userinfo'])
    },
    components:{
      Loading,
      Scroll
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  .order_no_login
    padding-top 140px
    width 60%
    margin 0 auto
    text-align center

    > img
      display block
      width 100%
      height 30%

    > h3
      padding 10px 0
      font-size 17px
      color #6a6a6a

    > button
      display inline-block
      background #02a774
      font-size 14px
      color #fff
      border 0
      outline none
      border-radius 5px
      padding 10px 20px

  .order
    touch-action: none
    height 617px
    .listyle
      .suojin
        margin-left 20px
        .tou
          height 40px
          border-bottom #93999f 1px solid
          .img
            margin-top 5px
            display inline-block
          .shopname
            margin-bottom 15px
            margin-left 5px
            font-size 16px
            vertical-align middle
            display inline-block
          .more
            width 20px
            height 20px
            display inline-block
            float right
            margin-top 10px
            margin-right 10px


        .body
          margin-top 10px
          border-bottom #93999f 1px solid

          .foods
            line-height 20px
            font-size 14px
            margin-right 10px

        .footer
          margin-top 10px
          height 30px



</style>
