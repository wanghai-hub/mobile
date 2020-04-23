<template>
  <div class='user-profile'>
      <van-nav-bar left-arrow @click-left="$router.back()" 
      title="编辑资料"></van-nav-bar>
    <!-- 选取文件的input  -->
      <input type="file" hidden @change="hFileChange" ref="fx"/>
        <van-cell-group>
        <van-cell is-link title="头像"  center @click="hShowImage">
            <van-image
            slot="default"
            width="1.5rem"
            height="1.5rem"
            fit="cover"
            round
            :src="user.photo"
            />
        </van-cell>
        <van-cell is-link title="姓名" :value="user.name" @click="showName=true"/>
        <van-cell is-link title="性别" :value="user.gender === 1?'男':'女'" @click="showGender=true"/>
        <van-cell is-link title="生日" :value="user.birthday" @click="showBirthday=true"/>
        </van-cell-group>

    <!-- 编辑区域 姓名
    confirm:是dialog组件提供的事件，用来做保存
    -->
    <van-dialog @confirm="hSaveName" v-model="showName" title="修改名字" show-cancel-button>
      <van-field type="text" focus v-model.trim="newName" placeholder="请输入名字" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-popup v-model="showGender" position="bottom">
      <van-nav-bar
          title="修改性别"
          left-text="取消"
          @click-left="showGender=false"
      >
      </van-nav-bar>
        <van-cell is-link title="男" @click="hChangeGender(1)" />
        <van-cell is-link title="女" @click="hChangeGender(0)" />
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-nav-bar
        title="修改生日"
      >
      </van-nav-bar>
      <van-datetime-picker
        v-model="newDate"
        @confirm="hSaveBirthday"
        @cancel="showBirthday=false"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
import { getprofile, updateUser ,updatePhoto} from '../../api/user'
import dayjs from 'dayjs'
export default {
    name: 'user-profile',
    data () {
        return {
            showName: false, //编辑姓名谈层
            showGender: false,
            showBirthday: false,
            user: {},
            newName: '',
             // 修改后新生日
            newDate: new Date(),
            minDate: new Date(1965, 0, 10), // dateTime-picker中最小时间
            maxDate: new Date()
        }
    },
    created() {
        this.getinformation()
    },
    methods: {
        // 获取用户档案
        async getinformation() {
         const res = await getprofile()
         this.user = res.data.data
        },
        async hSaveName () {
           if(!this.newName){
               this.showName = false
               return}
           const res = await updateUser ({
                   name: this.newName 
               })        
            this.user.name = this.newName
            this.showName = false
        },
        async hChangeGender (g) {
            const res = await updateUser ({
                  gender: g 
               })        
            this.user.gender = g
            this.showGender = false
        },
        async hSaveBirthday () {
            let birthday = dayjs(this.newDate).format('YYYY-MM-DD')
            const res = await updateUser ({
                 birthday
               })        
            this.user.birthday = birthday
            this.showBirthday = false
        },
        async hFileChange () {
            if(!this.$refs.fx.files[0]) return
            const fd = new FormData()
            fd.append('photo',this.$refs.fx.files[0])
            const res = await updatePhoto(fd)
            this.user.photo = res.data.data.photo
        },
        hShowImage () {
           this.$refs.fx.click()
        }, 
        
    },
}
</script>

<style scoped lang='less'></style>