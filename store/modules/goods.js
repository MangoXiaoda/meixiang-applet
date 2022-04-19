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
			let result = await request.get('https://www.meixiang.online/api/goods/list', {
				data: params
			}) 
			commit('set_goodsList', result.data)
		}
	}
}
