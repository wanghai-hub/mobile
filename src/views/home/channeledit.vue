<template>
  <div class='channeledit'>
      <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
          <van-button  size="mini" type="info">编辑</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item
        v-for="(item,idx) in channeledit" :key="item.id"
        @click="hClickMyChannel(item)"
        :class="{'cur':idx===activeIndex}">
          <span>{{item.name}}</span>
          <!-- <van-icon name="cross" class="btn"></van-icon> -->
        </van-grid-item>
      </van-grid>
    </div>
     <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="item in recommendChannels" :key="item.id">
          <span>{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '../../api/channel'
export default {
    name: 'channeledit',
    props: {
        // 组件中订阅的频道
        channeledit: {
            type: Array,
            required: true
        },
        // 当前父组件选中的频道下标
        activeindex: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            allChannels: [],
        }
    },
    created() {
        // 获取所有的频道
        this.getall_channels()
    },
    methods: {
        async getall_channels() {
            // 取回所有的频道
            const res = await getAllChannels()
            this.allChannels = res.data.data.channels
        },
        hClickMyChannel(channel) {
            this.$emit('updateCurrentChannel',channel);
            this.$emit('close')
        }
    },
    computed: {
        recchannels() {
            // 对所有频道进行过滤，留下不在已订阅的频道中出现的频道
            // return 得到一个数组
           return this.allChannels.filter((channel) =>{
               // 过滤条件：不能在已订阅的频道中出现
               // 1、把所有的频道拿过来放进已订阅频道中去找
             const idx = this.channels.findIndex(item =>channel.id === this.channels.id)
             // 如果idx不是-1 ，说明在已订阅频道中有该频道，不满足idx === -1， 不留该元素
             // 如果是idx = -1，说明该频道不在已应订阅频道中 满足idx === -1,留下该元素
             return idx === -1
           })
        }
    }
}
</script>

<style scoped lang='less'>
.channel {
    padding: 15px;
    font-size: 14px;
}
.btn {
    position: absolute;
    top: 0;
    right: 0;
}
.cur {
    color: white;
    font-weight: bold;
    background-color: black;
}
</style>