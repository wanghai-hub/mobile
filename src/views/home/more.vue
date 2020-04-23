<template>
  <div class='more'>
      <van-cell-group v-if="!isReport">
    <!-- 不做具体的工作，把事件抛给父组件 -->
        <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
        <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
        <van-cell>拉黑作者</van-cell>
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
        <van-cell v-for="item in reports" 
        :key="item.value"
        @click="$emit('report',item.value)">
          {{item.label}}
        </van-cell>
      </van-cell-group>
  </div>
</template>

<script>
// 导入举报常量
import { reports } from '../../util/constant.js'
export default {
  name: 'more',
  data() {
    return {
      isReport: false,
      reports: reports
    }
  },
}
</script>

<style scoped lang='less'>
.more {
  border-radius: 15px;
}
</style>