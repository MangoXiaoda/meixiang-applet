import request from '@/common/request/request.js'
export default {
	namespaced:true,
	state: {
		goodsList: []
	},
	getters: {
		
	},
	mutations: {
		set_goodsList(state,arr){
			state.goodsList = arr
		}
	},
	actions: {
		async List({
			commit,
			state
		},params) {
			console.log('进来了么？')
			let result = await request.get('https://demo.shopro.top/addons/shopro/goods/lists', {
				data: params
			}) 
			commit('set_goodsList', result.data)
		}
	}
}
