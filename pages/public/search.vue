<template>
	<view class="page_box">
		<!-- 搜索框 -->
		<view class="head_box">
			<u-search v-model="searchVal" margin="30rpx" placeholder="搜索商品" height="64" @search="onSearch" @custom="onSearch" @clear="clearSearch"></u-search>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			searchVal: '',
			historyTag: [],
			showModal: false
		};
	},
	computed: {},
	onShow() {
		
	},
	methods: {
		// 搜索
		onSearch(e) {
			
		},
		// 清除输入框
		clearSearch() {
			this.searchVal = '';
		},
	},
	
}
</script>

<style lang="scss">
.page_box {
	background-color: #fff;
}
.search-history {
	padding: 30rpx;
	.title-box {
		.title {
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
		}
		.clear-history-btn {
			font-size: 28rpx;
			font-weight: 500;
			color: #999999;
		}
	}
	.content {
		width: 100%;
		.item {
			padding: 0 20rpx;
			line-height: 60rpx;
			background: #f5f6f8;
			border-radius: 30rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			max-width: 690rpx;
		}
	}
}
</style>
