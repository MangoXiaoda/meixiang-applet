<template>
	<view class="home-wrap u-m-b-20">
		<!-- 空白页 -->
		<!-- #ifdef APP-PLUS -->
		<u-no-network @retry="init"></u-no-network>
		<!-- #endif -->
		
		<view class="content-box">
			<!-- 导航栏 -->
			<home-head :isScorll="isScorll" borderRadius="0"
				:navTitle="initShop.name" :list="list"></home-head>
			<!-- 轮播 -->
			<!-- <sh-banner :Px="0" :Py="0"
				:borderRadius="0" :height="530" :list="list">
			</sh-banner> -->
			
		</view>
	</view>
</template>

<script>
	import shBanner from './components/sh-banner.vue';
	
	import homeHead from './index/home-head.vue';
	
	export default {
		components: {
			shBanner,
			
			homeHead
		},
		data() {
			return {
				list:[
					{image: "http://file.shopro.top/uploads/20210522/edb232dbdf32b7e4df0eb6d079d471b6.png"},
					{image: "http://file.shopro.top/uploads/20210522/89e158b63896889422342043af5e741f.png"}
				],
				isScorll: false
			};
		},
		onPageScroll(e) {
			this.isScorll = e.scrollTop > 100 ? true : false;
		},
		
	}
</script>

<style lang="scss"></style>
