/*通过传递过来的action,更新state对象*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES, RECEIVE_GOODS, RECEIVE_INFO, RECEIVE_RATINGS,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  INCR_CART,
  DEC_CART, CLEAR_CART, SEARCH_LIST
} from "./mutation-types";
import  Vue from "vue";

export default {
  [RECEIVE_ADDRESS] (state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORIES] (state,{categories}){
    state.categories = categories
  },
  [RECEIVE_SHOPS] (state,{shops}){
    state.shops = shops
  },
  [RECEIVE_USERINFO] (state,{userinfo}){
    state.userinfo = userinfo
  },
  [RESET_USERINFO](state){
    state.userinfo = {}
  },
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  }
  ,
  [RECEIVE_RATINGS](state,{ratings}){
    state.ratings = ratings
  },
  [RECEIVE_INFO](state,{info}){
    state.info = info
  },
  [INCR_CART](state,{food}){
    if(!food.count){
      Vue.set(food,'count',1)
      console.log("fod init++")

      state.cartFoods.push(food)
    }else{
      console.log("fod count++")
      food.count++
    }
  },
  [DEC_CART](state,{food}){
    if(food.count >0){
      food.count--
      if(food.count ==0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    state.cartFoods.forEach((food)=>{
      food.count = 0
    })
    state.cartFoods = []
  },

  [SEARCH_LIST](state,{searchList}){
    state.searchList = searchList
  }
}
