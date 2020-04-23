import request from '../util/request'
// 添加评论
export function addComment (data) {
    return request({
      method: 'post',
      url: '/app/v1_0/comments',
      data
    })
  }
// 回复评论
  export function GetComment (param) {
    return request({
      method: 'get',
      url: '/app/v1_0/comments',
      param
    })
  }