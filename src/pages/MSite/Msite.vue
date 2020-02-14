<template>
    <div>
      <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.formatted_address">
          <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
          <router-link class="header_login" slot="left" :to="userinfo.id ? '/userinfo': '/login'">
            <i v-if="userinfo.id" class="iconfont icon-person"></i>
            <span v-else class="header_login_text">登录｜注册</span>
          </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categories.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categories,index) in categoryArr" :key="index">
                <a href="javascript:" class="link_to_food"  v-for="(category,index) in categories" :key="index">
                  <div class="food_container">
                    <img src="">
                  </div>
                  <span>{{category.cname}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" v-else>
        </nav>
        <!--首页附近商家-->
        <ShopList></ShopList>
      </section>
    </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import {mapState} from 'vuex'
export default {

    computed: {
      ...mapState(['address', 'categories','userinfo']),
      categoryArr() {
        const {categories} = this
        const arr = []
        let minArr = []
        //遍历categories
        categories.forEach(category => {
          if (minArr.length == 8) {
            minArr = []
          }
          if (minArr.length == 0) {
            arr.push(minArr)
          }
          minArr.push(category)
        })
        return arr
      }
    },
  watch:{
      categories(value) {
        this.$nextTick(()=>{
          new Swiper('.swiper-container',{
            loop:false,
            pagination:{
              el: '.swiper-pagination'
            }
          })
        })
    }
  },

    components:{
      HeaderTop,
      ShopList
    },
    mounted() {
      //this.getAddress(),
      //this.$store.dispatch('getAddress')
      this.$store.dispatch('getCategories')
      this.$store.dispatch('getShops')
    },
   /* methods:{
      ...mapActions(['getAddress'])
    }*/
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
