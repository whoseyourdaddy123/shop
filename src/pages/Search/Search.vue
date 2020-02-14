<template>
    <section class="search">
      <HeaderTop title="搜索"></HeaderTop>
      <form class="search_form" @submit.prevent="submitForm">
        <input type="search" name="search" placeholder="请输入商家或美食名称" v-model="searchName" class="search_input">
        <input type="submit" name="submit" class="search_submit">
      </form>
      <section class="list" v-if="!noSearchShops">
        <ul class="list_container">
          <router-link :to="{path:`/seller/${shop.id}` }"class="list_li" v-for="(shop,index) in searchList" :key="index">
            <section class="item_left"><img :src="shop.avatar" class="restaurant_img">
            </section>
            <section class="item_right">
              <div class="item_right_text"><p><span>{{shop.name}}</span></p>
                <p>月售 {{shop.sellCount}} 单</p>
                <p>{{shop.deliverPrice}}元起送 </p></div>
            </section>
          </router-link>
        </ul>
      </section >
      <div class="search_none" v-else >很抱歉..无搜索结果</div>
    </section>
</template>

<script type="text/ecmascript-6">
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import {mapState} from "vuex";

  export default {
    data(){
      return{
        searchName:'',
        noSearchShops: false
      }
    },
    methods:{
      submitForm(){
        const keyword = this.searchName.trim()
        if(keyword){
          this.noSearchShops = false
          this.$store.dispatch('search',this.searchName)
        }
      }
    },
    components: {
      HeaderTop
    },
    computed:{
      ...mapState(['searchList'])
    },
    watch:{
      searchList(val){
        if(!val.length){
          this.noSearchShops = true
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>
