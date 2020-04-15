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