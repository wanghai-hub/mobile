<template>
  <div class='layout'>
    <!-- 头 -->
    <van-nav-bar title="头条" fixed
    right-text="搜索" @click-right="search"/>

    <router-view></router-view>
    <!-- 脚 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/question">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data(){
    return {

    }
  },
  methods: {
    search() {}
  }
}
</script>

<style scoped lang='less'></style>
