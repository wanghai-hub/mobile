<template>
  <div class='home'>
    <van-tabs>
      <van-tab v-for="(item, index) in channels" :title="item.name" :key="index">
      <!-- 内容展示组件 -->
       <articlelist :channel="item"></articlelist>
     </van-tab>
   </van-tabs>
  </div>
</template>

<script>
import { getchannel } from '../../api/channel'
// 引入文章内容组件
import articlelist from './articelistl'
export default {
  name: 'home',
  components: {
    articlelist
  },
  data() {
    return {
      channels: []
    }
  },
  created() {
    this.fn_getchannel()
  },
  methods: {
  // 获取频道，发axios请求，封装一个方法，专业一些
    async fn_getchannel () { 
      const result = await getchannel()
      this.channels = result.data.data
    }
  }

}
</script>

<style scoped lang='less'></style>
