// 用于时间处理的工具
import dayjs from 'dayjs'

// 引入中文语言包
import 'dayjs/locale/zh-cn'
// 引入插件,在下载dayjs时就已经下载了(相对时间处理)
import rtime from 'days/plugin/relativeTime'

dayjs.locate('zh-cn')
dayjs.extend(rtime)

export const relTime = function(time) {
    return dayjs().to(dayjs(time))
}
