<template>
  <div class='articlelist'>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading"
          :finished="finished" finished-text="没有更多了"
          @load="onLoad">
           <van-cell v-for="(item,index) in list" :key="index" :title="item.title">
             <div slot="label">
               <!-- 图片 -->
               <van-grid :column-num="item.cover.images.length">
                  <van-grid-item v-for="(img,inx) in item.cover.images" :key="inx">
                    <van-image lazy-load :src="img"/>
                  </van-grid-item>
                </van-grid>
               <!-- 文字 -->
               <div class="mata">
                 <span>{{item.aut_name}}</span>
                 <span>{{item.comm_count}}</span>
                 <span>{{item.pupdate | relTime}}</span>
                 <span class="btn" v-if="$store.state.user" @click="showmore(item.art_id)">
                   <van-icon name="cross"></van-icon>
                 </span>
               </div>
             </div>
           </van-cell>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getarticle } from '../../api/article'
export default {
  name: 'articlelist',
  data () {
    return {
      list: [], //文章列表信息
      loading: false, // 是否向上获取 ,向上就自动更改成true
      finished: false,
      timestamp: null,
      isLoading: false // 是否正在下拉刷新 ,一下拉就自动更改成true
    }
  },
  // 获取父组建channels传来的信息
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  created() {
    // 监听事件总线上帝的unintrest事件
    this.$eventbus.$on('deleteart',(obj) =>{
      // 判断是否是当前频道下操作
      if(obj.channelId === this.channels.id) {
        // 从数组中删除
        const inx = this.list.findIndex(item => item.art_id.tostring() === obj.articleId)
        if(inx !== -1) {
           this.list.splice(inx,1)
        }
      }
    })
  },
  methods: {
    // 显示弹出层
    showmore(bigint) {
      this.$emit('showmoreout',bigint.tostring())
    },
    // 下拉添加新数据
    async onRefresh () {
       const result = await getarticle({
        channel_id: this.channels.id,
        timestamp: Date.now(),
        with_top: 1 // 是否包含置顶信息
      })
       // 返回信息中的文章列表数组 
      const arr = result.data.data.results
      // 把取得的最新数据添加到list顶部
      this.list.unshift(...arr)
      // 修改下拉刷新的状态
      this.isLoading = false
      // 提示信息
      let msg = arr.length ? `刷新成功${arr.length}`: `没有新数据`
      this.$toast(msg)
    },

    // 上拉加载
    async onLoad () {
       // 发请求，获取数据
      const result = await getarticle({
        channel_id: this.channels.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1 // 是否包含置顶信息
      })
      // 返回信息中的文章列表数组 
      const arr = result.data.data.results
      // 把取得的数据添加到list当中
      this.list.push(...arr)
      // 更新时间戳
      this.timestamp = result.data.data.results.pre_timestamp

      this.loading = false

      // 判断是否全部数据加载完成，不在触发load 事件
      if (arr.length === 0) {
        this.finished = true
      }

    }
  }

}
</script>

<style scoped lang='less'>
.mata {
  display: flex;
  span {
    margin-right: 10px;
  }
}
.btn {
  margin-left: auto;
}
</style>
