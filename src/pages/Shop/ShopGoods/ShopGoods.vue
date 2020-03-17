<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul class="content">
          <li v-for="(good,index) in goods" :key="index"
              class="menu-item" :class="{current: index==currentIndex }"
            @click="changIndex(index)"
            >
            <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon"> {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper" >
        <ul ref="cheight" >
          <li class="food-list-hook"  v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods"
                  :key="index" @click="clickFood(food)">
                <div class="aa"><img width="57" height="57" v-lazy="food.img"></div>
                <div class="content"><h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.info}}</p>
                  <div class="extra"><span class="count">月售 {{food.sellCount}} 份</span>
                    <span v-if="food.rating">好评率 {{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food :food="food" ref="food"  />
    <ShopCart />
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import CartControl from '../../../components/CartControl/CartControl'
  import Food from '../../../components/Food/Food'
  import ShopCart from "../../../components/ShopCart/ShopCart";
  export default {

    data(){
      return{
        scrollY: 0,
        tops: [],
        food: {},
      }
    },
    components:{
      ShopCart,
      CartControl,
      Food
    },
    mounted(){
      const id = this.$route.params.id
      this.$store.state.id = id
      this.$store.dispatch('getInfos',id)
      this.$store.dispatch('getRatings',id)
      this.$store.dispatch('getGoods',id)
      localStorage

     /*this.$store.dispatch('getGoods',id).then(()=> {
       this.$nextTick(() => {
         console.log("tick...")
         let scroll = new BScroll('.menu-wrapper')
         console.log(scroll)
         console.log("after tick...")
       })
     })*/

    },
    methods:{
      //初始化滚动条
      _initScroll(){
        this.menuScroll = new BScroll('.menu-wrapper',{
          click: true
        })
        this.foodScroll = new BScroll('.foods-wrapper',{
          scrollY: true,
          click: true,
          probeType: 2
        })
        this.foodScroll.on('scroll', ({x,y})=>{
          this.scrollY = Math.abs(y)
         })
        this.foodScroll.on('scrollEnd',({x,y})=>{
          this.scrollY = Math.abs(y)
        })
        },
      //初始化tops
      _initTop(){
        const tops= []
        let top = 0
        tops.push(top)
        const lis = this.$refs['cheight'].children
        Array.prototype.slice.call(lis).forEach(li =>{
          top =  li.clientHeight+top
          tops.push(top)
        })
        this.tops = tops
        console.log(this.tops)
      },
      //点击左侧分类右侧联动
      changIndex(index){
        let y = this.tops[index]
        this.scrollY = y
        this.foodScroll.scrollTo(0,-y,900)
      },
      clickFood(food){
        this.food =food
        this.$refs.food.toggleShow()

      }

    },
    watch:{
      goods(value){
        this.$nextTick(()=>{
          this._initScroll()
          this._initTop()
        })
        }
    },
    computed:{
      ...mapState(['goods']),
      //当前分类的下标
      currentIndex(){
        const{tops,scrollY} = this
        const index = tops.findIndex((top,index)=>{
          return scrollY >= top && scrollY < tops[index + 1]
        })
        return index
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .aa
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
