<template>
  <footer class="footer_guide border-1px">
    <a href="javascript:;" class="guide_item" @click="$router.replace('/msite')" :class="{on: $route.path =='/msite'}">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconshouye"></use>
      </svg>
      <span>首页</span>
    </a>
    <a href="javascript:;" class="guide_item" @click="$router.replace('/search')" :class="{on: $route.path =='/search'}">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconshouye9"></use>
      </svg>
      <span>搜索</span>
    </a>
    <a href="javascript:;" @click="$router.replace('/order')" class="guide_item " :class="{on: $route.path =='/order'}">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconshouye10"></use>
      </svg>
      <span>订单</span>
    </a>
    <a href="javascript:;" @click="$router.replace('/profile')" class="guide_item" :class="{on: $route.path =='/profile'}">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconshouye4"></use>
      </svg>
      <span>我的</span>
    </a>
  </footer>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
          width: 1em;
          height: 1em;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;

</style>
