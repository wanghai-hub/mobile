<template>
  <div class='search'>
    <van-nav-bar left-arrow title="搜索中心"  @click-left="$router.back()">
    </van-nav-bar>
    <!-- 当用户在输入框中写入内容时去调用接口 -->
    <van-search
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      @input="hSearch" 
      v-model.trim="keyword">
      <div slot="action" @click="hClickSearchInput">搜索</div>
    </van-search>

    <!-- 联想建议 与 搜索历史记录互斥
      如果用户在搜索框中输入了内容，则显示联想建议，
      否则，显示搜索历史
    -->
    <van-cell-group v-if="keyword">
      <van-cell
      v-for="(item,idx) in highlight" :key="idx"
      @click="hClickSuggestion(idx)" icon="search"> 
        <!-- 此处的item是高亮的 -->
        <div v-html="item"></div>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
      </van-cell>
      <van-cell
        v-for="(item,idx) in history"  :title="item"
        :key="idx"  @click="hClickHistory(item)">
        <!-- 阻止在关闭图标上的点击事件冒泡给父元素 -->
        <van-icon name="close" @click.stop="hRemoveHistory(idx)" />
      </van-cell>

    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { searchSuggest } from '../../api/search'
export default {
  name: 'search',
  data() {
    return {
      keyword: '', // 用户输入的搜索字
      sugList: [], // 搜索建议返回的列表
      history: localStorage.getItem('history') || [],
      timer: null
    }
  },
  computed: {
    // 对后台返回的数据进行高亮效果处理
    highlight() {
      const str = new RegExp(this.keyword,'gi')
       return  this.sugList.map(it => {
        // 对输入的关键字进行高亮的效果
         const str1 = it.replace(str,function (obj) {
           return `<span style="color:red">${obj}</span>`
         })
         return str1
      })
    }
  },
  methods: {
    // 输入框一变化就调用
    // hSearch() {
    //   // 清除之前的定时器以及定时器里的函数操作
    //   clearTimeout(timer)
    //   // 重新开始下一次定时器
    //   this.timer = setTimeout(async () => {
    //     if (!this.keyword) {
    //       return
    //     }
    //     const res = await searchSuggest (this.keyword)
    //     this.sugList = res.data.data.options // 获得的数据没有高亮效果
    //   }, .3*1000);   
    // },
    // 点击下拉联想列表，存入历史记录
    hSearch() {
      if(!this.timer){
        this.timer = setTimeout(async () => {
          this.timer = null
          if (!this.keyword) {
             return
           }
         const res = await searchSuggest (this.keyword)
         this.sugList = res.data.data.options
        }, .3*1000);
      }
    },
    hClickSearchInput() {
      if(this.keyword){
        // 将输入的关键字填入到历史记录中
        this.addHistory (this.keyword)
        // 跳转到结果页,并传入参数
        this.$router.push({
          name: 'result',
          query: {
            keyword: this.keyword
          }
        })
      }
    },
    hClickSuggestion (idx) {
      const str = this.sugList[idx]
      this.addHistory (str)
      // 跳转到结果页面，并传参
      this.$router.push({
        name: 'reslut',
        query: {
          keyword: str
        }
      })
    },
    addHistory (str) {
      // 查看当前输入的搜索词有没有记录
      const idx = this.history.indexOf(str)
      if(idx !==-1){
        // 说明历史记录有该关键词，不需要增加，只需要调换顺序
        // 删除以前的记录
        this.history.splice(idx,1)
      }
      // 放在第一个
        this.history.unshift(str)
      window.localStorage.setItem('history',str)
    },
    hRemoveHistory (idx) {
      this.history.splice(idx,1)
      window.localStorage.removeItem('history')
    },
    hClickHistory (str) {
      this.addHistory(str)
      this.$router.push({
        name: 'result',
        query: {
            keyword: str
          }
      })
    }
  },


}
</script>

<style scoped lang='less'></style>