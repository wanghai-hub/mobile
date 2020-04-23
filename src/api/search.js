import request from '../util/request'
// 获取系统提示的相关搜索建议
export function searchSuggest(keyword) {
    return request({
        method: 'get',
        url: '/app/v1_0/suggestion',
        params: {
            q: keyword
        }
    })
}

// 获取搜索的结果
export function getsearch (params) {
    return request({
        url: '/app/v1_0/suggestion',
        method: 'get',
        params
    })
}