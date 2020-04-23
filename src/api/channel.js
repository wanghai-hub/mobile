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

export const getAllChannels = () => {
    return request ({
        url: '/app/v1_0/channels'
    })
}

export const addChannel = (channels) =>{
    return request ({
        method: 'put',
        url: '/app/v1_0/user/channels',
        data: {
            channels
        }
    })
}

export const deleteChannels = (channels) => {
    // 默认请求类型就是get
    return request({
      url: '/app/v1_0/user/channels',
      method: 'DELETE',
      data: {
        channels
      }
    })
  }