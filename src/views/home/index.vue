<template>
  <div class='home'>
    <van-tabs>
      <van-tab v-for="(item, index) in channels" :title="item.name" :key="index">
      <!-- 内容展示组件 -->
       <articlelist :channels="item" @showmoreout="showfn"></articlelist>
     </van-tab>
   </van-tabs>

    <!-- 弹出层 -->
      <van-popup :style="{width:'80%'}" v-model="showmoreaction">
        <more-action @dislike="dislike"></more-action>
      </van-popup>
  </div>
</template>

<script>
import { getchannel } from '../../api/channel'
import { dislike } from '../../api/article'
import moreAction from './more'
// 引入文章内容组件
import articlelist from './articelistl'
export default {
  name: 'home',
  components: {
    articlelist,
    moreAction
  },
  data() {
    return {
      channels: [],
      showmoreaction: false,
      articleID: null
    }
  },
  created() {
    this.fn_getchannel()
  },
  methods: {
    // 收到more组件中传来的没兴趣的指令
    async dislike() {
      const res = await dislike(this.articleID)
      // 关闭弹出层
      this.showmoreaction = false
      // 到article组件中删除相应的文章
    },
    showfn(article_id) {
      this.showmoreaction = true;
      // 保存下子组建传来的文章ID
      this.articleID = article_id
    },
  // 获取频道，发axios请求，封装一个方法，专业一些
    async fn_getchannel () { 
      const result = await getchannel()
      console.log(result.data.data);
      this.channels = result.data.data.channels
    }
  }

}
</script>

<style scoped lang='less'></style>
