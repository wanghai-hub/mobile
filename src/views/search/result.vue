<template>
  <div class='result'>
      <van-nav-bar
      :title="$route.query.keyword+'的搜索结果'"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,idx) in list"
        :key="idx"
        :title="item.title"
         @click="$router.push('/article/'+item.art_id)"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getsearch } from '../../api/search'
export default {
    name: 'result',
    data() {
      return {
        list: [],
        loading: false,
        page: 1, // 当前要查询的页数
        per_page: 10, //每页显示条数
        finished: false
      }
    },
    methods: {
      async onload () {
        // 根据传过来的关键字发请求，获取详情页面
       const res = await getsearch({
          page: this.page,
          per_page: this.per_page,
          q: this.$router.query.keyword
        })
        this.list.push(...res.data.data.results)
        this.loading = false 
        this.page++
        if(res.data.data.results.length === 0){
          this.finished = true
        }
      }
    }
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  background-color: #3196fa;
  .van-nav-bar__title {
    color: #fff;
  }
  // 搜索结果页 后退按钮为白色
  .van-icon{
    color:#fff;
  }
}
</style>