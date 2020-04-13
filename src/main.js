import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant所有的组件
import Vant from 'vant'
// 用它的样式
import 'vant/lib/index.css'

// 它会根据的手机尺寸来调整rem的基准值：html标签上的font-size。
import 'amfe-flexible'

// 引入项目中全局样式
import './style/index.less'

// 全局过滤器
import { relTime } from './util/time'
Vue.filter('relTime', relTime)

// 用一下组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
