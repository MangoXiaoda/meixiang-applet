<template>
	<!-- 为你推荐 -->
	<view class="hot-goods u-m-b-10 u-p-x-16">
		<!-- <view class="warp" v-if="goodsType === 2"> -->
			<!-- <u-waterfall v-model="goodsList" ref="uWaterfall"> -->
				<!-- <view>手动瀑布流</view> -->
		<!-- 		<template v-slot:left="{leftList}">
					<view v-for="(item, index) in leftList" :key="index">
						<view>1111</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view v-for="(item, index) in rightList" :key="index">
						<view>2222</view>
					</view>
				</template> -->
			<!-- </u-waterfall> -->
		<!-- </view> -->
		<!-- m -->
		<view class="big-card-wrap u-p-10">
			<block v-for="item in goodsList" :key="item.id">
				<sh-goods-card
					:detail="item"
					:type="item.activity_type"
					:image="item.thumb"
					:title="item.title"
					:subtitle="item.content"
					:price="item.price"
					:originPrice="item.cost_price"
					:sales="item.sales"
					:tagTextList="item.activity_discounts_tags"
					:total="item.total"
					@click="toGoodsDetail(item.id)"
				></sh-goods-card>
			</block>
		</view>
		<button v-show="total > perPage" class="u-reset-button refresh-btn u-m-y-20 u-flex u-col-center u-row-center" @tap.stop="loadMore">
			<text class="u-m-r-6 u-iconfont uicon-reload" style="font-size: 28rpx;color: #999" :class="{ 'refresh-active': isRefresh }"></text>
			{{ listParams.page >= lastPage ? '收起' : '加载更多' }}
		</button>
	</view>
</template>

<script>
/**
 * 自定义之为你推荐
 * @property {Object} detail - 推荐商品信息
 */
import shGoodsCard from './sh-goods-card.vue';
export default {
	components: {
		shGoodsCard
	},
	data() {
		return {
			listParams: {
				page: 1
			}, //当前分页
			lastPage: 1, //总分页
			total: 0, //总商品数
			perPage: 0, //单页商品数
			goodsList: [],
			isRefresh: false,

			// 瀑布流 350-330
			addTime: 100, //排序间隙时间
			leftHeight: 0,
			rightHeight: 0,
			leftList: [],
			rightList: [],
			tempList: [],
			list: [],

			// goodsType: this.detail.style // 商品模板
		};
	},

	props: {
		detail: {
			type: Object,
			default: () => {}
		}
	},
	created() {
		if (this.detail.id) {
			this.listParams.category_id = this.detail.id;
			this.getGoodsList();
		}
		if (this.detail.ids) {
			this.listParams.goods_ids = this.detail.ids;
			this.getGoodsList();
		}
	},
		
	methods: {
		// 瀑布流相关
		async splitData() {
			if (!this.tempList.length) return;
			let item = this.tempList[0];
			if (!item) return;

			// 分左右
			if (this.leftHeight < this.rightHeight) {
				this.leftHeight += item.activity_discounts_tags?.length ? 350 : 330;
				this.leftList.push(item);
			} else if (this.leftHeight > this.rightHeight) {
				this.rightHeight += item.activity_discounts_tags?.length ? 350 : 330;
				this.rightList.push(item);
			} else {
				this.leftHeight += item.activity_discounts_tags?.length ? 350 : 330;
				this.leftList.push(item);
			}

			// 移除临时列表的第一项，如果临时数组还有数据，继续循环
			this.tempList.splice(0, 1);
			if (this.tempList.length) {
				setTimeout(() => {
					this.splitData();
				}, this.addTime);
			}
		},
		clear() {
			this.leftList = [];
			this.rightList = [];
			this.leftHeight = 0;
			this.rightHeight = 0;
			this.tempList = [];
		},

		// addRandomData() {
		// 	console.log('length', this.list.length)
		// 	for(let i = 0; i < this.list.length; i++) {
		// 		let index = this.$u.random(0, this.list.length - 1);
		// 		// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
		// 		let item = JSON.parse(JSON.stringify(this.list[index]))
		// 		console.log('item', item)
		// 		item.id = this.$u.guid();
		// 		this.goodsList.push(item);
		// 	}
		// 	console.log('转化后的goodsList',this.goodsList)
		// },
		// remove(id) {
		// 	this.$refs.uWaterfall.remove(id);
		// },
		// clear() {
		// 	this.$refs.uWaterfall.clear();
		// },

		// 商品列表
		// getGoodsList() {
		// 	let that = this;
		// 	that.$http('goods.lists', this.listParams).then(res => {
		// 		if (res.code === 1) {
					// this.lastPage = res.data.last_page;
					// this.total = res.data.total;
					// this.perPage = res.data.per_page;
					// this.isRefresh = false;
					// that.goodsList = [...that.goodsList, ...res.data.data];
					// that.tempList = res.data.data;
					// that.goodsList.length && that.splitData();
				// }
		// 	});
		// },
		
		getGoodsList() {
			console.log(this.$u.config.v);
			let that = this;
			let params = {
				
			}
			
			this.$store.dispatch('goods/List', params).then(res => {
				res = this.$store.state.goods.goodsList
				this.lastPage = res.data.last_page;
				this.total = res.data.total;
				this.perPage = res.data.per_page;
				this.isRefresh = false;
				// that.list = res.data.data;
				that.goodsList = [...that.goodsList, ...res.data.data];
				// that.tempList = res.data.data;
				// that.goodsList.length && that.splitData();
			});
		},

		// 加载更多
		loadMore() {
			if (!this.isRefresh) {
				// 加载更多
				if (this.listParams.page < this.lastPage) {
					this.isRefresh = true;
					this.listParams.page += 1;
					this.getGoodsList();
				} else {
					// 重置为1页数据
					this.listParams.page = 1;
					this.lastPage = 1;
					this.goodsList = [];
					this.clear();
					this.getGoodsList();
				}
			}
		},
		
		// 跳转到商品详情页
		toGoodsDetail(id) {
			console.log('查看id',id)
			uni.navigateTo({
				url:'/pages/goods/detail?id=' + id
			})
		}
		
	}
};
</script>

<style lang="scss">
@mixin vue-flex($direction: row) {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: $direction;
	/* #endif */
}
.u-waterfall {
	@include vue-flex;
	flex-direction: row;
	align-items: flex-start;
}

.u-column {
	@include vue-flex;
	flex: 1;
	flex-direction: column;
	height: auto;
}

.u-image {
	width: 100%;
}
// 为你推荐
.hot-goods {
	background: none;
	.refresh-btn {
		margin-left: 50%;
		transform: translateX(-50%);
		width: 156rpx;
		line-height: 50rpx;
		background: #ffffff;
		border-radius: 25rpx;
		font-size: 22rpx;
		font-weight: 500;
		color: #999999;
		white-space: nowrap;
	}
	.refresh-active {
		transform: rotate(360deg);
		transition: all linear 0.5s;
	}
}

/* ==================
    当前页面追加样式
 ==================== */
.u-p-10 {
  padding: 10rpx !important;
}
</style>
