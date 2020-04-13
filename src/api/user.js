// 设置发送请求的函数
import request from '../util/request'

export function login (user) {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: user
  })
}

export function logout (user) {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: user
  })
}

export function getinfor () {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile',
  })
}
