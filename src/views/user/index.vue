<template>
  <div class="userIndex">
    <div class="user-profile">
      <div class="info">
        <van-image round :src="user.photo" />
        <h3 class="name">
          {{user.name}}
          <br />
          <van-tag size="mini">申请认证</van-tag>
        </h3>
      </div>
      <van-row>
        <van-col span="8">
          <p>{{user.art_count}}</p>
          <p>动态</p>
        </van-col>
        <van-col span="8">
          <p>{{user.follow_count}}</p>
          <p>关注</p>
        </van-col>
        <van-col span="8">
          <p>{{user.fans_count}}</p>
          <p>粉丝</p>
        </van-col>
      </van-row>
    </div>

    <!-- 操作链接 -->
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="newspaper-o" color="#7af" />我的作品
      </van-col>
      <van-col span="8">
        <van-icon name="star-o" color="#f00" />我的收藏
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" color="#fa0" />阅读历史
      </van-col>
    </van-row>

    <!-- 编辑入口 -->
    <van-cell-group class="user-group">
      <van-cell icon="edit" title="编辑资料" to="/user/profile" is-link />
      <van-cell icon="chat-o" title="小智同学" to="/user/chat" is-link />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <!-- 你再玩一会吧，大爷-->
      <van-cell icon="warning-o" title="退出登录" @click="hLogout" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { getprofile, getinfor ,logout } from '../../api/user.js'
import {deluser} from '../../util/storage'
export default {
  name: 'userIndex',
  data () {
    return {
      user: '',

    }
  },
  created() {
    this.getinfor()
  },
  methods: {
    async getinfor() {
      const res = await getinfor()
      this.user = res.data.data.user
      // 将返回的用户头像存在vuex中
      this.$store.commit('updatephoto',this.user.photo)
    },
    // 退出
    hlogout () {
      this.$dialog.confirm({
        title: '提示',
        message: 'see you'
      }).then(() => {
        this.$store.commit('deleteuser')
        this.$router.push('/login')
      }).catch(() =>{})
      
    }
  }

}
</script>

<style scoped lang='less'>
.user {
  &-profile {
    width: 100%;
    height: 200px;
    display: block;
    background: #3296fa;
    color: #fff;
    .info {
      display: flex;
      padding: 20px;
      align-items: center;
      .van-image{
        width: 64px;
        height: 64px;
      }
      .name {
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
      }
      .van-tag {
        background: #fff;
        color: #3296fa;
      }
    }
    p{
      margin: 0;
      text-align: center;
    }
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
      padding-bottom: 5px;
    }
  }
}
</style>
