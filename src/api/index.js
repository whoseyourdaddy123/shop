

/*export const reqAddress =((location) =>{
  this.$get('/api/getLocations',location)
})*/
import {getInfo,postInfo} from "./axios";

export const reqSmsLogin = (phone, code) => postInfo('/api/font/user/smsLogin', {phone, code})

export const reqShopInfo =()=>getInfo('/info')
export const reqShopRating =()=>getInfo('/ratings')
export const reqShopGoods =()=>getInfo('/goods')
