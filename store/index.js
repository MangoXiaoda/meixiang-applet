import Vue from 'vue'
import Vuex from 'vuex'

import goods from '@/store/modules/goods.js'
Vue.use(Vuex) // vue的插件机制

// Vuex.Store 构造器选项
const store = new Vuex.Store({
    // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
    state: {
        
    },
	modules: {
		goods
	}
})

export default store
