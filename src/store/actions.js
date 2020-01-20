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

  }

  //获取商品分类

  //获取商家
}
