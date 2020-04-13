// 配置axios相关的设置
import axios from 'axios'
import store from '../store/index.js'
import JSONBig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function(data) {
    return data ? JSONBig.parse(data) : {}
  }]
})
 
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前设置请求头
  if(store.state.user){
    config.headers.Authorization= `Bearer ${store.state.user.token}`
  } 
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 因为有最大安全数值的影响，因此需要有jsonbig来做响应拦截


export default request
