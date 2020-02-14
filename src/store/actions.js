/*直接更新state的方法的对象*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO, RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCR_CART,
  DEC_CART, CLEAR_CART, SEARCH_LIST
} from "./mutation-types";
import axios from 'axios'
import {getInfo,postInfo,updateInfo,deleteInfo} from "../api/axios";

export default {
  //获取地址
   getAddress({commit,state}){
     //发送ajax请求
    const location =state.latitude + "," + state.longitude
    /*this.$get('/api/getLocations',location)
      .then(res =>{
        this.address = res.data
      })*/

     //提交给mutations
    getInfo(`/api/getLocations/${location}`).then(res =>{
      const address  = res.result
      commit(RECEIVE_ADDRESS,{address})
    })

  },

  //获取商品分类
  getCategories({commit,state}){
    getInfo(`/api/category`) .then(res =>{
      if(res.code == 200 ){
        const categories = res.data
        commit(RECEIVE_CATEGORIES,{categories})
      }
    })
  },
  //获取商家
  getShops({commit}){
    getInfo(`/api/seller`) .then(res =>{
      if(res.code == 200 ){
        const shops = res.data
        commit(RECEIVE_SHOPS,{shops})
      }
    })
  },
  //用户信息
  getUserinfo({commit},userinfo){
     commit(RECEIVE_USERINFO,{userinfo})
  },
  //刷新页面给userinfo赋值
  regetUserinfo({commit}){
     getInfo('/api/font/user/userinfo').then((userinfo)=>{
       commit(RECEIVE_USERINFO,{userinfo})
     })
  },
  //退出
  logout({commit}){
     getInfo('/api/font/user/logout').then(()=>{
       commit(RESET_USERINFO)
     })
  },

  //goods
  getGoods({commit},id){
    getInfo(`/api/seller/${id}`).then(res=>{
      if(res.code == 200){
        const goods = res.data
        commit(RECEIVE_GOODS,{goods})
        //id()
      }
    })

  },
  //info
  getInfos({commit,state},id){
     getInfo(`/api/info/${id}`).then(res=>{
      if(res.code == 200){
        const info = res.data
        commit(RECEIVE_INFO,{info})
      }
    })
  },
  //ratings
  getRatings({commit,state},id){
    getInfo(`/api/ratings/${id}`).then((res)=>{
      if(res.code == 200){
        const ratings = res.data
        commit(RECEIVE_RATINGS,{ratings})
      }
    })
  },

  //cartControl增加
  increaseCount({commit},{food}){
     commit(INCR_CART,{food})
  },
  //cartControl减少
  decreaseCount({commit},{food}){
    commit(DEC_CART,{food})
  },
  //清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  },
  search({commit,state},searchName){

     getInfo(`/api/search`,{searchName:searchName})
       .then(res=>{
         if(res.code=== 200){
           const searchList = res.data
           this.commit(SEARCH_LIST,{searchList})
         }
       })
  }
}
