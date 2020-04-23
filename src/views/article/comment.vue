<template>
  <div class='comment'>
      <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,idx) in list"
        :key="idx"
        :title="item.content"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate | relTime}}</span>
            <van-button size="mini" type="default" @click="hReplay(item)">{{item.reply_count}}回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入评论内容"
        v-model.trim="commentText"
      >
        <van-button
        slot="button"
        size="mini"
        type="info"
        @click="addComment">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->

    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      round
      position="bottom"
      :style="{height:'85%'}"
    >
       <!--传给子组件 -->
      <comment-reply
        v-if="isReplyShow"
        @close="isReplyShow=false"
        :comment="currentComment">
      </comment-reply>
    </van-popup>
     <!-- 评论回复 -->

  </div>
</template>

<script>
import { addComment,GetComment} from '../../api/comment.js'
import CommentReply from './comreply'
export default {
    name: 'comment',
    props: {
        articleId: {
            type: String,
            required: true
        }
    },
    // 回复评论组件
    components: {
        CommentReply
    },
    data() {
        return {
            commentText: '', //当前输入的评论内容
            list: [], // 评论列表
            loading: false,
            finished: false,
            offset: null ,
            isReplyShow: false,//评论回复弹出层
            currentComment: {}, // 点击的当前评论
        }
    },
    methods: {
        // 添加评论
        async addComment () {
            if(!this.commentText){
                return
            }
            const res = await addComment({
                target: this.articleId, // 文章编号
                content: this.commentText
            })
            this.list.unshift (res.data.data.new_obj)
            this.commentText = ''
        },
        async onload () {
            // 获取文章评论
           const res = await GetComment({
               type: 'a',
                source: this.articleId,
                offset: this.offset
            })
            // 将评论添加到列表
            this.list.push(...res.data.data.results) 
            this.loading = false 
            if(res.data.data.results.length){
                this.offset = res.data.data.last_id
            }else{
                this.finished = true
            }
        },
        // 回复评论
        hReplay(item) {
            this.isReplyShow = true
            this.currentComment = item
        },
    }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>