// 配置axios相关的设置
import axios from 'axios'
import store from '../store/index.js'
import JSONBig from 'json-bigint'
import router from '../router/index'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function(data) {
    return data ? JSONBig.parse(data) : {}
  }]
})
 
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前设置请求头
  if(store.state.user){
    config.headers.Authorization= `Bearer ${store.state.user.token}`
  } 
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

//响应拦截器处理权限过期
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, async function  (error) {
  // 对响应错误做点什么
  if(error.response.status === 401){
      if(store.state.user && store.state.user.refresh_token){
        try{
          const res = await axios({
            url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
            method: 'post',
            headers: {
              Authorization: `Bearer ${store.state.user.refresh_token}`
            }
          })
          // 从接口返回值中取得新的token
          store.commit('updatetoken',res.data.data.token)
          // 有了新的token重新发一次请求
          return request(error.config)
        }catch(e){
          // 两个token都失效，只能重新登录
          store.commit('changeuser',null)
          router.push({
            path: '/login',
            query: {
              from: router.currentRoute.fullPath
            }
          })
        }
      }else{
        router.push({
          path: '/login',
          query: {
            from: router.currentRoute.fullPath
          }
        })
      }
  }
  return Promise.reject(error);
});

export default request
