

/*export const reqAddress =((location) =>{
  this.$get('/api/getLocations',location)
})*/
import {getInfo,postInfo} from "./axios";

export const reqSmsLogin = (phone, code) => postInfo('/api/font/user/smsLogin', {phone, code})
