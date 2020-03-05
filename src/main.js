// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store/index'
import Mint from 'mint-ui'
import './filters'
Vue.use(Mint);
//import  '../src/mock/mockServer'
import {getInfo,postInfo,updateInfo,deleteInfo} from "./api/axios";
Vue.prototype.$get=getInfo;
Vue.prototype.$post=postInfo;
Vue.prototype.$update=updateInfo;
Vue.prototype.$del=deleteInfo;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
