/*直接更新state的方法的对象*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS
} from "./mutation-types";
import {getInfo} from "../api/axios";

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
  }
}
