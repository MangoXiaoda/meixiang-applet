<template>
	<view class="home-wrap u-m-b-20">
		<!-- 空白页 -->
		<!-- #ifdef APP-PLUS -->
		<u-no-network @retry="init"></u-no-network>
		<!-- #endif -->
		
		<view class="content-box">
			<!-- 导航栏 -->
			<home-head :isScorll="isScorll" borderRadius="0"
				navTitle="mx" :list="list"></home-head>
			
			<!-- 滑动宫格 -->
			<sh-grid-swiper :list="grid_list"
				oneRowNum="4"></sh-grid-swiper>
			
		</view>
	</view>
</template>

<script>
	import homeHead from './index/home-head.vue';
	import shGridSwiper from './components/sh-grid-swiper.vue';
	
	export default {
		components: {
			homeHead,
			shGridSwiper,
		},
		data() {
			return {
				list:[
					{image: "https://cdn.uviewui.com/uview/swiper/swiper1.png"},
					{image: "https://cdn.uviewui.com/uview/swiper/swiper2.png"}
				],
				grid_list: [
					{
						image: "http://file.shopro.top/uploads/20210518/884360099a48d435e23e24091fb7084f.png",
						name: "签到有礼",
						path: "",
						path_name: "",
						path_type: 1
					},
					{
						image: "http://file.shopro.top/uploads/20210518/ce173c7d81d9521350620e51b0166808.png",
						name: "品质拼团",
						path: "",
						path_name: "",
						path_type: 1
					}
				],
				isScorll: false
			};
		},
		onPageScroll(e) {
			this.isScorll = e.scrollTop > 100 ? true : false;
		},
		
	}
</script>

<style lang="scss">
.u-m-b-20 {
  margin-bottom: 20rpx !important;
}
</style>
