import Vue from 'vue'
import Vuex from 'vuex'

import { setuser , getuser } from '../util/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:getuser() // 初始页面，没有loaclstorage，user就是空
  },
  mutations: {
    changeuser(state,obj){
      // 将后台返回的用户信息存在vuex中
      state.user = obj
      setuser(state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
