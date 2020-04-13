import request from '../util/request'
/**
 * 获取当前的频道
 */
export const getchannel = () => {
    return request({
        method: 'get',
        url: '/app/v1_0/user/channels',
    })
}
