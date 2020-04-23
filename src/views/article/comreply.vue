<template>
  <div class='comment-preplay'>
      <van-nav-bar :title="comment.reply_count+'条回复'">
        <van-icon slot="left" name="cross" 
        @click="$emit('close')"/>
      </van-nav-bar>

      <!-- 当前评论 -->
       <van-cell title="当前评论">
         <van-image slot="icon"  round width="30" height="30"
                style="margin-right: 10px;"
                :src="comment.aut_photo"/>
         <span style="color: #466b9d;" slot="title">{{comment.aut_name}}</span>
         <div slot="label">
                <p style="color: #363636;">{{comment.content}}</p>
                <p>
                <span style="margin-right: 10px;">{{comment.pubdate | relTime}}</span>
                <van-button
                    size="mini"
                    type="default"
                >回复 {{comment.reply_count}}</van-button>
                </p>
         </div>
         <van-icon slot="right-icon" />
      </van-cell>
       <van-divider>全部回复</van-divider>

       <!-- 对当前评论回复 -->
       <van-list
      v-model="loading"
      :finished="finished"
      finished-text="还想看点啥"
      @load="onLoad"
     >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate|relTime}}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
            <!-- 发布回复 -->
      <van-cell-group class="publish-wrap">
        <van-field clearable placeholder="请输入回复内容"
        v-model.trim="commentText">
            <van-button slot="button" 
            size="mini"
            type="info"
            @click="hAddReply"
            >发布</van-button>
        </van-field>
      </van-cell-group>
  </div>
</template>

<script>
import { GetComment ,addComment} from '../../api/comment'
export default {
    name: 'comment-preplay',
    props: {
      comment: {
        required: true,
        type: Object
      }
    },
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            offset: null,
            commentText: '' //回复的评论
        }
    },
    methods: {
        async onload () {
            const res = await GetComment({
              type: 'c',
              source: this.comment.com_id.toString(),
              offset: this.offset
            })
            this.list.push(...res.data.data.results)
            this.loading = false
            if(res.data.data.results.length){
                this.offset = res.data.data.last_id
            }else{
                this.finished = true
            }
        },
        // 添加回复
        async hAddReply() {
          if(!this.commentText) return
          const res = await addComment({
            target: this.comment.com_id.toString(),
            content: this.commentText,
            art_id: this.$route.params.id
          })
          this.list.unshift(res.data.data.new_obj)
          this.$toast('回复评论成功')
          this.comment.reply_count++
          this.commentText = ''
        }

    }
}
</script>

<style scoped lang='less'>
// 发表评论的区域是固定在下端的
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