<template>
  <div class='home'>
    <van-tabs v-model="activeindex">
      <van-tab v-for="(item, index) in channels" :title="item.name" :key="index">
      <!-- 内容展示组件 -->
       <articlelist :channels="item" @showmoreout="showfn"></articlelist>
     </van-tab>
   </van-tabs>

      <!-- 点击x弹出层 -->
      <van-popup :style="{width:'80%'}" v-model="showmoreaction">
        <!-- 引入moreaction组件  监听dislike 和 report -->
        <more-action @dislike="hDislike" 
        @report="hreport" 
        ref="refMoreAction">
        </more-action>
      </van-popup>


      <!-- 频道管理开关 -->
      <div class="bar-btn" @click="channeledit=true"> 
        <van-icon name="wap-nav" size="24" />
      </div>


       <!-- 点击频道控制按钮，弹出层 -->
      <van-action-sheet v-model="channeledit" title="编辑频道">
        <channel-edit :channeledit="channels"
        :activeindex="activeindex"
        @updateCurrentChannel="updateCurrentchannel"
        @updateCurrentindex="updateCurrentindex"
        @close="hcloseEdit"
        ></channel-edit>
      </van-action-sheet>
  </div>
</template>

<script>
import { getchannel } from '../../api/channel'
import { dislike ,reportart } from '../../api/article'
import moreAction from './more'
import channelEdit from './channeledit'
// 引入文章内容组件
import articlelist from './articelistl'
export default {
  name: 'home',
  components: {
    articlelist,
    moreAction,
    channelEdit
  },
  data() {
    return {
      channels: [], // 订阅的频道
      showmoreaction: false, // 是否显示x弹出层
      articleID: null,  // 文章列表组件传来的要删除文章编号
      channeledit: false, //是否展开频道编辑弹层
      activeindex: 0 // 频道下标
    }
  },
  created() {
    this.fn_getchannel()
  },
  methods: {
    // 收到more组件中传来的dislike的指令,用eventbus事件发布和监听
    async hDislike() {
      const res = await dislike(this.articleID)
      // 关闭弹出层
      this.showmoreaction = false
      // 到article组件中删除相应没兴趣的文章
      this.delart()
    },
    // 处理文章列表组件article中的点击x的操作
    showfn(article_id) {
      // 显示弹出层
      this.showmoreaction = true;
      //更改more子组件isreport 为false
      if(this.$refs.refMoreAction) {
        this.$refs.refMoreAction.isReport = false
      }
      // 保存文章列表组建传来的点击关闭文章的ID
      this.articleID = article_id
    },
    // 获取频道，发axios请求，封装一个方法，专业一些
    async fn_getchannel () { 
      const result = await getchannel()
      this.channels = result.data.data.channels
     },
     // 举报 
    async hreport(typeId) {
      // typeid 就是从more组件中抛出来的举报类型
      // 调接口
      const res = await reportart(this.articleID,typeId)
      // 退出弹出框
      this.showmoreaction = false
      // 删除文章
      this.delart()
    },
    // 在article组件中删除相应文章
    delart() {
      this.$eventbus.$emit('deleteart',{
        articleID: this.articleID,
        channelId: this.channels[this.activeindex].id
      })
    },
    // 关闭编辑频道弹层
    hcloseEdit() {
      this.channeledit = false
    },
    // 根据编辑弹层传来的频道，更新被选中的频道
    updateCurrentChannel(channel) {
      // 当前频道在频道列表中的下标
     this.activeindex = this.channels.findIndex(it => it.id === channel.id)
    },
    updateCurrentindex(index) {
      this.activeindex = index
    }
  },
    

}
</script>

<style scoped lang='less'>
.bar-btn {
  position: fixed;
  top: 52px;
  right: 5px;
  display: flex;
  align-items: center;
  opacity: .8;
  z-index: 1;
}
</style>
