<template>
    <!-- 文章详情页 -->
  <div class='article'>
      <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading class="article-loading" v-if="loading" />
    <!-- /加载中 loading -->

    <!-- 文章详情 -->
    <div class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | relTime}}</p>
        </div>
        <van-button
         @click="hFollow"
          round
          size="small"
          type="info"
        >{{ article.is_followed ? '取消关注' : '+ 关注一下'}}</van-button>
      </div>

      <!-- 文章正文 -->
      <div class="content">
        <div v-html="article.content"></div>
      </div>
      <van-divider>END</van-divider>

      <!-- 点赞和不喜欢按钮 -->
      <div class="zan">
        <van-button  round size="small"  hairline type="primary" plain
        @click="hLike" :icon="article.attitude === 1 ? 'good-job' : 'good-job-o'">
        {{ article.attitude === 1 ? "取消点赞" : "+点赞"}}
        </van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 文章评论 -->
    <article-comment
      :articleId="$route.params.id">
    </article-comment>
  </div>
</template>

<script>
// 导入评论组件
import ArticleComment from './comment'
import { followed, unfollowed } from '../../api/user'
import { unfocus, focus, get_article} from '../../api/article'
export default {
    components: {
        ArticleComment
    },
    data() {
        return {
            loading: false,
            article: {}, // 文章对象
        }
    },
    created() {
        this.loadArticle()
    },
    methods: {
        // 获取文章详情
        async loadArticle() {
            this.loading = true
          const res = await get_article(this.$route.params.id)
            this.loading = false  // 取消加载状态
            this.article = res.data.data
        },
        // 关注
        async hFollow () {
            if(this.article.is_followed){
                await followed(this.article.aut_id)
            }else{
                await unfollowed(this.article.aut_id)
            }
            // 更换关注按钮状态
            this.article.is_followed = !this.article.is_followed
        },
        // 点赞
        async hLike () {
            if(this.article.attitude === 1) {
                await unfocus (this.article.art_id.toString())
                this.article.attitude = -1
            }else {
                await focus (this.article.art_id.toString())
                this.article.attitude = 1
            }
        }
    }
}
</script>

<style scoped lang='less'>
.article{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    font-size:14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
  }
}
</style>