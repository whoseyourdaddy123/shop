import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from '../pages/MSite/MSite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shop from "../pages/Shop/Shop";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods";
import ShopInfos from "../pages/Shop/ShopInfos/ShopInfos";
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings";
import Payment from "../pages/Payment/Payment"
import Address from "../pages/Address/Address"
import NewAddress from "../pages/NewAddress/NewAddress"
import Comment from '../pages/Comment/Comment'

Vue.use(VueRouter)
export default new VueRouter({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: MSite,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/seller/:id',
      component: Shop,
      children:[
        {
          path:'/',
          redirect: '/seller/goods/:id'
        },
        {
          path:'/seller/goods/:id',
          component: ShopGoods
        },
        {
          path:'/seller/ratings/:id',
          component: ShopRatings
        },
        {
          path:'/seller/infos/:id',
          component: ShopInfos
        },
        ],

    },
    {
      path: '/payment',
      component: Payment
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/newAddress',
      component: NewAddress
    },
    {
      name: 'Comment',
      path: '/comment/:id',
      component: Comment
    }
  ]

})
