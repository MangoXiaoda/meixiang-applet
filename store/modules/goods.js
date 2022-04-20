import request from '@/common/request/request.js'
export default {
	namespaced:true,
	state: {
		goodsList: [],
		goodsDetail: []
	},
	getters: {
		
	},
	mutations: {
		set_goodsList(state,arr){
			state.goodsList = arr
		},
		set_goodsDetail(state,arr){
			state.goodsDetail = arr
		}
	},
	actions: {
		// 获取商品列表接口
		async List({
			commit,
			state
		},params) {
			let result = await request.get('https://www.meixiang.online/api/goods/list', {
				data: params
			}) 
			commit('set_goodsList', result.data)
		},
		
		// 获取商品详情接口
		async Detail([
			commit,
			state
		], params) {
			console.log(66666);
			let result = await request.get('https://www.meixiang.online/api/goods/detail', {
				data: params
			})
			 commit('set_goodsDetail', result.data)
		}
	}
}
