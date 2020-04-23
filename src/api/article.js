// 处理与文章相关的请求操作
import request from '../util/request'

export const getarticle = (data) => {
  return request({
    method: 'get',
    url: 'app/v1_1/articles',
    params: data
  })
}

// 不感兴趣的请求
export const dislike = (id) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: id
    }
  })
}

// 举报
export const reportart = (artId,type) => {
  return request ({
    method: 'post',
    url: '/app/v1_0/article/reports',
    data: {
      target: artId,
      type: type
    }
  })
}
// 
export const get_article = (id) => {
  return request ({
    method: 'get',
    url: '/app/v1_0/articles/'+id,
  })
}
// 点赞
export function focus (id) {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: {
      target: id
    }
  })
}
// 取消点赞
export function unfocus (id) {
  return request({
    method: 'delete',
    url: '/app/v1_0/article/likings/'+id,
  })
}

