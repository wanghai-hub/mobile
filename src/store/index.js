import Vue from 'vue'
import Vuex from 'vuex'

import { setuser , getuser ,deluser } from '../util/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getuser() ,// 初始页面，没有loaclstorage，user就是空
    photo: ''
  },
  mutations: {
    updatephoto(state,str) {
      state.photo = str
    },
    changeuser(state,obj){
      // 将后台返回的用户信息存在vuex中
      state.user = obj
      setuser(state.user)
    },
    updatetoken (state,newtoken) {
      state.user.token = newtoken
      setuser (state.user) // 更新后的token持久化
    },
    deleteuser (state) {
      state.user = null
      deluser()
    }
  },
  actions: {
  },
  modules: {
  }
})
