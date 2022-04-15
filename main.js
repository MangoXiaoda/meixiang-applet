import Vue from 'vue'
import App from './App'
// vuex
import store from './store'
import request from '@/common/request/request.js'

// 引入全局uView
import uView from 'uview-ui'

import tools from './shopro/utils/tools'

Vue.prototype.$store = store

Vue.prototype.$tools = tools

// 挂载到全局vue实例上，在页面中可以使用this.$request调用request实例下相应方法
Vue.prototype.$request = request;

Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)

const app = new Vue({
    store,
    ...App
})

// 引入请求封装
// require('./util/request/index')(app)

app.$mount()
