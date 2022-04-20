import Vue from 'vue'
import store from './store'
import App from './App'
import request from '@/common/request/request.js'

import tools from './shopro/utils/tools'

Vue.prototype.$store = store

Vue.prototype.$tools = tools

// 挂载到全局vue实例上，在页面中可以使用this.$request调用request实例下相应方法
Vue.prototype.$request = request;

Vue.config.productionTip = false

App.mpType = 'app'
// 引入全局uView
import uView from "uview-ui"
Vue.use(uView);

const app = new Vue({
	  ...App,
    store
})

// 引入请求封装
// require('./util/request/index')(app)

app.$mount()
