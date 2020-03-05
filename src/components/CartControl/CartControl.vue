<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont iconjianhao" v-if="food.count"  @click.stop="changeCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont iconjiahao"  @click.stop="changeCount(true)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

    props:{
      food: Object
    },
    methods:{
      changeCount(isAdd){
        if(isAdd){
          console.log(JSON.stringify(this.food)+ 'this food')
          this.$store.dispatch('increaseCount',{food:this.food})
        }else{
          this.$store.dispatch('decreaseCount',{food:this.food})

        }
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .iconjianhao
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .iconjiahao
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
