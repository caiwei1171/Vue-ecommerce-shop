import Vue from 'vue'
import App from './App.vue'
// 导入全局样式表
import "@/assets/css/global.css"
// 引入路由
import router from "./router/index.js"
// 引入axios
import axios from "axios"
Vue.prototype.$http = axios
// 引入字体图标
import "@/assets/fonts/iconfont.css"
// 引入plugins下的element.js文件
import "@/plugins/element.js"
// 引入插件
import TreeTable from "vue-table-with-tree-grid"
Vue.component('tree-table',TreeTable)

// 过滤器
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal);
  // padStart()第一个参数总长度多少位，第二参数：当长度不够时用第二个参数补全
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + '').padStart(2,'0');
  const d = (dt.getDate() + '').padStart(2,'0');

  const hh = (dt.getHours() + '').padStart(2,'0');
  const mm = (dt.getMinutes() + '').padStart(2,'0');
  const ss = (dt.getSeconds() + '').padStart(2,'0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 将富文本编辑器注册为全局可用组件
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
