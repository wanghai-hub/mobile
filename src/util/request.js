// 配置axios相关的设置
import axios from 'axios'
import store from '../store/index.js'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
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

export default request
