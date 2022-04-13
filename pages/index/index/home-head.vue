<template>
	<!-- 首页标题栏，轮播图整合插件 -->
	<view class="banner-swiper-wrap u-m-b-10">
		<!-- 标题栏 -->
		<view class="u-navbar u-navbar-fixed" :style="[navbarStyle]">
			<view class="u-status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="u-navbar-inner" :style="[navbarInnerStyle]">
				<view class="u-back-wrap">
					<view class="u-icon-wrap u-back-text u-line-1" :style="[navTitleStyle]">{{ navTitle || '' }}</view>
				</view>
				<view hover-class="hover-search" class="search-box u-flex u-row-center u-col-center u-m-r-30" @click="toSearch()">
					<u-icon name="search" color="#fff" size="22"></u-icon>
				</view>
			</view>
		</view>
		<!-- 轮播组件 -->
		<swiper class="screen-swiper square-dot" @change="onChange" style="height: 520rpx" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item, index) in list" :key="index" @tap="onSwiper(index)"><image :src="item.image" mode="aspectFill"></image></swiper-item>
		</swiper>
	</view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
let menuButtonInfo = {};
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif
/**
 * home-head-轮播卡片,主要为了处理数据
 * @property {Array} list 轮播图数据，
 * @property {String} mode 指示器模式
 * @property {String} navTitle 项目名称
 */
export default {
	components: {},
	data() {
		return {
			navBgImage: '',
			changeNavBackground: false,
			swiperCur: 0,
			statusBarHeight: systemInfo.statusBarHeight
		};
	},
	props: {
		isScorll: {
			type: Boolean,
			default: false
		},
		// 轮播图的数据,格式如：[{image: 'xxxx', title: 'xxxx'}，{image: 'yyyy', title: 'yyyy'}]，其中title字段可选
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		navTitle: {
			type: String,
			default: '商城'
		},
		navTitleStyle: {
			type: Object,
			default: () => {
				return {
					color: '#fff',
					fontSize: '38rpx'
				};
			}
		}
	},
	watch: {
		isScorll(newValue, oldValue) {
			this.changeNavBackground = newValue;
			this.navBgImage = this.list[this.swiperCur].image;
		}
	},
	computed: {
		// 导航栏内部盒子的样式
		navbarInnerStyle() {
			let style = {};
			style.height = this.navbarHeight + 'px';
			// #ifdef MP
			let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
			style.marginRight = rightButtonWidth + 'px';
			// #endif
			return style;
		},
		// 整个导航栏的样式
		navbarStyle() {
			let style = {};
			style.zIndex = this.$u.zIndex.navbar;
			style.background = this.changeNavBackground ? `url(${this.navBgImage}) no-repeat top / 100% auto` : 'none';
			Object.assign(style, this.background);
			return style;
		},
		navbarHeight() {
			// #ifdef APP-PLUS || H5
			return 44;
			// #endif
			// #ifdef MP
			return systemInfo.platform == 'ios' ? 44 : 48;
			// #endif
		}
	},
	created() {
		this.navBgImage = this.list[0].image;
	},
	methods: {
		onSwiper(e) {
			this.$tools.routerTo(this.list[e].path);
		},
		onChange(e) {
			this.swiperCur = e.detail.current;
		},
		// 跳转到搜索页
		toSearch() {
			uni.navigateTo({
				url:'/pages/public/search'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
@mixin vue-flex($direction: row) {
	/* #ifndef APP-NVUE */
	display: flex;
	flex-direction: $direction;
	/* #endif */
}
// 轮播
.banner-swiper-wrap {
	height: 520rpx;
	position: relative;
	z-index: 100;
	.search-box {
		width: 66rpx;
		height: 66rpx;
		background: rgba(#000, 0.18);
		border-radius: 100%;
	}
	.hover-search {
		background: rgba(#fff, 0.18);
	}
}

.u-navbar {
	width: 100%;
}

.u-navbar-fixed {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 991;
}

.u-status-bar {
	width: 100%;
}

.u-navbar-inner {
	@include vue-flex;
	justify-content: space-between;
	position: relative;
	align-items: center;
}

.u-back-wrap {
	@include vue-flex;
	align-items: center;
	flex: 1;
	flex-grow: 0;
	padding: 14rpx 14rpx 14rpx 24rpx;
}
/* ==================
         轮播
 ==================== */
swiper .a-swiper-dot {
	display: inline-block;
	width: 16upx;
	height: 16upx;
	background: rgba(0, 0, 0, .3);
	border-radius: 50%;
	vertical-align: middle;
}

swiper[class*="-dot"] .wx-swiper-dots,
swiper[class*="-dot"] .a-swiper-dots,
swiper[class*="-dot"] .uni-swiper-dots {
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: center;
}

swiper.square-dot .wx-swiper-dot,
swiper.square-dot .a-swiper-dot,
swiper.square-dot .uni-swiper-dot {
	background-color: #ffffff;
	opacity: 0.4;
	width: 10upx;
	height: 10upx;
	border-radius: 20upx;
	margin: 0 8upx !important;
}

swiper.square-dot .wx-swiper-dot.wx-swiper-dot-active,
swiper.square-dot .a-swiper-dot.a-swiper-dot-active,
swiper.square-dot .uni-swiper-dot.uni-swiper-dot-active {
	opacity: 1;
	width: 30upx;
}

swiper.round-dot .wx-swiper-dot,
swiper.round-dot .a-swiper-dot,
swiper.round-dot .uni-swiper-dot {
	width: 10upx;
	height: 10upx;
	position: relative;
	margin: 4upx 8upx !important;
}

swiper.round-dot .wx-swiper-dot.wx-swiper-dot-active::after,
swiper.round-dot .a-swiper-dot.a-swiper-dot-active::after,
swiper.round-dot .uni-swiper-dot.uni-swiper-dot-active::after {
	content: "";
	position: absolute;
	width: 10upx;
	height: 10upx;
	top: 0upx;
	left: 0upx;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: #ffffff;
	border-radius: 20upx;
}

swiper.round-dot .wx-swiper-dot.wx-swiper-dot-active,
swiper.round-dot .a-swiper-dot.a-swiper-dot-active,
swiper.round-dot .uni-swiper-dot.uni-swiper-dot-active {
	width: 18upx;
	height: 18upx;
}

.screen-swiper {
	min-height: 375upx;
}

.screen-swiper image,
.screen-swiper video,
.swiper-item image,
.swiper-item video {
	width: 100%;
	display: block;
	height: 100%;
	margin: 0;
	pointer-events: none;
}

.card-swiper {
	height: 420upx !important;
}


.card-swiper swiper-item {
	width: 610upx !important;
	left: 70upx;
	box-sizing: border-box;
	padding: 40upx 0upx 70upx;
	overflow: initial;
}

.card-swiper swiper-item .swiper-item {
	width: 100%;
	display: block;
	height: 100%;
	border-radius: 10upx;
	transform: scale(0.9);
	transition: all 0.2s ease-in 0s;
	overflow: hidden;
}

.card-swiper swiper-item.cur .swiper-item {
	transform: none;
	transition: all 0.2s ease-in 0s;
}


.tower-swiper {
	height: 420upx;
	position: relative;
	max-width: 750upx;
	overflow: hidden;
}

.tower-swiper .tower-item {
	position: absolute;
	width: 300upx;
	height: 380upx;
	top: 0;
	bottom: 0;
	left: 50%;
	margin: auto;
	transition: all 0.2s ease-in 0s;
	opacity: 1;
}

.tower-swiper .tower-item.none {
	opacity: 0;
}

.tower-swiper .tower-item .swiper-item {
	width: 100%;
	height: 100%;
	border-radius: 6upx;
	overflow: hidden;
}

/* ==================
         搜索框样式
 ==================== */
.u-m-r-30 {
  margin-right: 30rpx !important;
}
.u-col-center {
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
}
.u-row-center {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
          justify-content: center;
}
.u-flex {

  display: -webkit-box;
  display: -webkit-flex;
  display: flex;

  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
          flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
}
</style>
