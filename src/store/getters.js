/*包含多个state的getter计算属性的对象*/
export default {
  totalCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count , 0)
  },

  totalPrice (state) {
    return Math.round(state.cartFoods.reduce((pre, food) => pre + food.count*food.price,0)*100)/100
  },
  positiveSize(state){
    return state.ratings.reduce((pre,rating)=> pre+(rating.rateType===0 ? 1 : 0 ),0)
  }
}
