<template>
  <div class="user"></div>
</template>

<script>
import { getinfor } from '../../api/user.js'
export default {
  created() {
    getinfor()
  },
}
</script>

<style scoped lang='less'>
</style>
