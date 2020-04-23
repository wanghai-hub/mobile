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

export function getprofile () {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile',
  })
}
// 获取用户自己的信息
export function getinfor () {
  return request({
    method: 'get',
    url: '/app/v1_0/user',
  })
}
// 关注
export function followed (authis) {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target: authid
    }
  })
}
// 取消关注
export function unfollowed (authid) {
  return request({
    method: 'delete',
    url: '/app/v1_0/user/followings'+id,
  })
}
// 修改用户的信息
export function updateUser (data) {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/profile',
    data
  })
}
// 修改用户的照片
export function updatePhoto (formdata) {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/photo',
    data: formdata
  })
}



