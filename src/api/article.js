// 处理与文章相关的请求操作
import request from '../util/request'

export const getarticle = (data) => {
  return request({
    method: 'get',
    url: 'app/v1_1/articles',
    params: data
  })
}
