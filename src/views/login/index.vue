<template>
  <div class='login'>
    <van-nav-bar title="登陆" />
    <van-cell-group>
      <van-field label="手机号" :error-message="errormsg.mobile" v-model.trim="user.mobile" required clearable placeholder="请输入用户名" />
      <van-field type="password" :error-message="errormsg.code" v-model.trim="user.code" required clearable label="密码" placeholder="请输入密码" />
    </van-cell-group>
    <div class="btn-wrap">
      <van-button type="primary" @click="user_login" class="btn"> 登陆 </van-button>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/user.js'

export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      errormsg: {
        mobile: '',
        code: ''
      }
    }
  },
  created () { },
  methods: {
    // 验证用户信息
    check (user) {
      if (user.mobile === '') {
        this.errormsg.mobile = '手机号不能为空'
        return false
      }else{
        this.errormsg.mobile = ''
      }
      if (user.code === '') {
        this.errormsg.code = '密码不能为空'
        return false
      }else{
        this.errormsg.code = ''
      }
      return true
    },
    
    async user_login () {
      // 校验
      if (!this.check(this.user)) {
        return
      }
      // loading效果
      this.$toast.loading({
        message: '登陆中……',
        duration: 2000,
        mask: true //遮罩层
      });
      // 发请求，拿数据  
      try{
         const result = await login(this.user)
         this.$toast.success('登陆成功')
         // todo修改 ,登陆成功将返回的token存在vuex
         this.$store.commit('changeuser',result.data.data)
         this.$router.push('/')
      }catch(e) {
        const errmsg = e.response.data.message
        if(errmsg.mobile) {
          this.$toast.fail('手机号错误')
        }
        if(errormsg.code) {
          this.$toast.fail('密码错误')
        }else {
          this.$toast.fail('出错了')
        }
      };
       
    }
  }
}
</script>

<style scoped lang='less'>
.btn-wrap {
  padding: 20px;
  .btn {
    width: 100%;
    background-color: #6db4fd;
    color: #fff;
  }
}
</style>
