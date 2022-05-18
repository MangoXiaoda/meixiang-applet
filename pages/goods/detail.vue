<!-- 商品详情 -->
<template>
	<view class="detail-wrap">
		<!-- 标题栏 -->
		<view class="nav-box" :style="{'top':backtop}">
			<view>
				<view hover-class="back-hover" class="back-box u-m-x-30 u-flex u-row-center u-col-center" @tap="goBack">
					<!-- <view class="u-iconfont uicon-arrow-left" style="color: #fff;font-size: 28rpx;"></view> -->
					<u-icon name="arrow-left" color="#fff" size="22"></u-icon>
				</view>
			</view>
		</view>
		
		<view class="detail_box">
			<view class="detail-content">
				<!-- 轮播 -->
				<u-swiper :height="750" borderRadius="0" :list="goodsInfo.images" indicator-pos="bottomRight" mode="number" :interval="3000"></u-swiper>
			
				<!-- 价格卡片组 -->
				<sh-price-card v-if="goodsInfo.id" :detail="goodsInfo" @change="getActivityRules"></sh-price-card>
				
				<!-- 标题 -->
				<view class="u-m-b-10 title-box u-p-20 u-skeleton-fillet">
					<view class="goods-title u-m-b-10 u-ellipsis-2">{{ goodsInfo.title }}</view>
					<!-- <view class="sub-title u-ellipsis-2">{{ goodsInfo.content }}</view> -->
				</view>
				
				<view class="tab-box u-flex">
					<view class="tab-item u-flex-col u-row-center u-col-center">
						<view class="tab-title">商品详情</view>
					</view>
				</view>
				
				<view class="tab-detail u-p-20 u-m-b-10">
					<!-- 详情富文本 -->
					<view class="rich-box"><u-parse :html="goodsInfo.content"></u-parse></view>
				</view>
				
			</view>
			
			<!-- 商品foot -->
			<view class="tabbar-foot safe-area-inset-bottom">
				<view class="detail-foot_box safe-area-inset-bottom u-flex u-col-ceter u-row-around">
					<!-- foot左侧 -->
					<view class="left u-flex">
						<view class="tools-item u-flex-col u-row-center">
							<image class="tool-img shopro-selector-circular" src="/static/images/tabbar/tabbar_cart1.png" mode=""></image>
							<!-- <text class="tool-title shopro-selector-rect">首页</text> -->
						</view>
					</view>
					<!-- foot右侧 -->
					<view class="detail-right">
						<!-- 正常按钮 -->
						<view class="detail-btn-box u-flex u-row-around">
							<button class=" u-reset-button tool-btn pay-btn" @tap="goPay">立即购买</button>
						</view>
					</view>
				</view>
			</view>	
		</view>
		
		
		
	</view>
</template>

<script>
let systemInfo = uni.getSystemInfoSync();
import shPriceCard from './components/sh-price-card.vue';
	
export default {
	components: {
		shPriceCard,
	},
	
	data() {
		return {
			gs_id: 0, // 商品id
			goodsInfo: [],
			activityRules: {},
			backtop:'',
		}
	},
	
	onLoad(options) {
		this.gs_id = options.id
		this.getGoodsDetail()
		this.getCapsule()
	},
	
	// computed: {
	// 	navbarHeight() {
	// 		// #ifdef APP-PLUS || H5
	// 		return 48;
	// 		// #endif
	// 		// #ifdef MP
	// 		let height = systemInfo.platform == 'ios' ? 44 : 48;
	// 		return height;
	// 		// #endif
	// 	}
	// },
	
	methods: {
		// 返回
		goBack() {
			uni.navigateBack();
		},
		
		goHome() {
			uni.navigateBack();
			// uni.navigateTo({
			// 	url:'/pages/public/search'
			// })
		},
		
		goPay() {
			
		},
		
		getActivityRules(e) {
			if (e) {
				this.activityRules = JSON.parse(e);
			}
		},
		
		//适配
		getCapsule() {
			//获取胶囊位置并改变顶部自定义导航栏的位置
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			console.log(menuButtonInfo, '胶囊top位置')
			//让自定义导航栏头部组件始终和胶囊对齐 做到兼容各手机型号
			this.backtop = menuButtonInfo.top+'px';		
		},
		
		// 商品详情
		getGoodsDetail() {
			let that = this
			const params = {
				gs_id: that.gs_id
			}
			
		   uni.request({
			url: 'https://www.meixiang.online/api/goods/detail', 
			method: 'GET',
			header: {  
				'content-type': 'application/json', 
				'Authorization' : 'Bearer ' + uni.getStorageSync('token')
			},   
			   data: params,
			   success: (res) => {
				   that.goodsInfo = res.data.data
				   console.log(that.goodsInfo)
				   console.log(that.goodsInfo.images)
			   }
		   });
		}
		
	}
	
}
	
</script>

<style lang="scss">
// 标题栏
.nav-box {
	position: fixed;
	width: 100%;
	// height: 32px;
	// background-color: red;
	// min-height: 140rpx;
	z-index: 888;
	top: 0;
	.back-box {
		background-color: rgba(#000, 0.18);
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		// margin-top: 14rpx;
	}
	.back-hover {
		background-color: rgba(#fff, 0.18);
	}
	.state-hack {
		width: 100%;
		// height: var(--status-bar-height);
		/* #ifdef H5 */
		// height: 20rpx;
		/* #endif */
	}
}
// 拼团玩法
.groupon-play {
	background: #fff;
	line-height: 94rpx;
	.title {
		font-size: 28rpx;
		color: #999;
	}

	.description {
		font-size: 28rpx;
		width: 500rpx;
		margin-left: 30rpx;
	}
}

// 选项卡
.tab-box {
	height: 102rpx;
	background: #fff;
	border-top: 1rpx solid rgba(#dfdfdf, 0.8);
	margin-top: 10rpx;

	.tab-item {
		flex: 1;
		height: 100%;
		position: relative;
		font-size: 30rpx;
		font-weight: bold;

		.tab-line {
			width: 123rpx;
			height: 4rpx;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			background: transparent;
			position: absolute;
			z-index: 2;
		}

		.line-active {
			background: rgba(168, 112, 13, 1);
		}
	}
}

// 选项卡内容
.tab-detail {
	min-height: 300rpx;
	background: #fff;
	// 规格参数
	.goods-size {
		.table-box {
			width: 710rpx;
			margin: auto;
			background: rgba(255, 255, 255, 1);
			border: 1rpx solid rgba(223, 223, 223, 1);

			.t-tr {
				border-bottom: 1rpx solid rgba(223, 223, 223, 1);
				&:last-child {
					border-bottom: none;
				}

				.t-head {
					font-size: 26rpx;
					color: #999;
					flex: 1;
					padding: 15rpx 20rpx;
					height: 100%;
				}

				.t-detail {
					font-size: 26rpx;
					border-left: 1rpx solid rgba(223, 223, 223, 1);
					flex: 4;
					padding: 15rpx 20rpx;
					height: 100%;
				}
			}
		}
	}
	// 富文本
	.rich-box {
		/deep/ img {
			display: block;
		}
	}
	// 评论
	.goods-comment {
		.more-box {
			height: 100rpx;
			background: #fff;

			.more-btn {
				width: 200rpx;
				line-height: 60rpx;
				border: 1rpx solid rgba(213, 166, 90, 1);
				border-radius: 30rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: rgba(168, 112, 13, 1);
				padding: 0;
				background: #fff;
			}
		}
	}
}

// 规格卡片
.sku-box {
	line-height: 82rpx;
	background: #fff;
	padding: 0 20rpx;
	margin: 10rpx 0;
	font-size: 28rpx;

	.title {
		color: #999;
		margin-right: 20rpx;
	}
}

// 标题卡片
.title-box {
	background-color: #fff;
	.goods-title {
		font-size: 28rpx;
		font-weight: 600;
		line-height: 42rpx;
	}

	.sub-title {
		color: #a8700d;
		font-size: 24rpx;
		font-weight: 500;
		line-height: 42rpx;
	}
}

// 底部工具栏
.tabbar-foot {
	min-height: 100rpx;
	width: 100%;
}
.detail-foot_box {
	min-height: calc(100rpx + env(safe-area-inset-bottom)) ;
	border-top: 1rpx solid rgba(238, 238, 238, 1);
	background-color: #fff;
	width: 100%;
	position: fixed;
	bottom: 0;
	z-index: 999;

	.left,
	.detail-right {
		flex: 1;
	}

	.tools-item {
		flex: 1;
		height: 100%;
		margin-left: 36rpx;
		.tool-img {
			width: 46rpx;
			height: 46rpx;
		}

		.tool-title {
			font-size: 22rpx;
			line-height: 22rpx;
			padding-top: 8rpx;
		}
	}

	.detail-btn-box {
		flex: 1;

		.tool-btn {
			font-size: 28rpx;
			font-weight: 500;
			color: rgba(#fff, 0.9);
			width: 210rpx;
			min-height: 70rpx;
			border-radius: 35rpx;
			padding: 0;
			margin-right: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.price {
				font-size: 24rpx;
				line-height: 24rpx;
				font-weight: bold;
				color: rgba(#fff, 0.9);
			}

			.price-title {
				font-size: 20rpx;
				line-height: 20rpx;
				font-weight: 500;
				color: rgba(#fff, 0.9);
				padding-top: 8rpx;
			}
		}

		.add-btn {
			box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
			background: linear-gradient(90deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
		}

		.pay-btn {
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		}

		.score-btn {
			width: 600rpx;
			line-height: 80rpx;
			background: linear-gradient(90deg, rgba(49, 133, 243, 1), rgba(80, 205, 242, 1));
			box-shadow: 0px 7px 6px 0px rgba(80, 205, 242, 0.2);
			border-radius: 40rpx;
			font-size: 30rpx;

			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			margin-right: 20rpx;
		}

		.seckill-btn {
			width: 432rpx;
			line-height: 70rpx;
			background: linear-gradient(93deg, rgba(208, 19, 37, 1), rgba(237, 60, 48, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(#ed3c30, 0.22);
			font-size: 28rpx;

			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			border-radius: 35rpx;
			padding: 0;
			margin-right: 20rpx;
		}

		.seckilled-btn {
			width: 432rpx;
			line-height: 70rpx;
			background: rgba(221, 221, 221, 1);
			font-size: 28rpx;

			font-weight: 500;
			color: #999999;
			border-radius: 35rpx;
			padding: 0;
			margin-right: 20rpx;
		}

		.groupon-btn {
			width: 210rpx;
			height: 70rpx;
			background: linear-gradient(90deg, rgba(254, 131, 42, 1), rgba(255, 102, 0, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(255, 104, 4, 0.22);
			border-radius: 35rpx;
		}
	}
}

/* ==================
    当前页面追加样式
 ==================== */
 .u-m-x-30 {
   margin-left: 30rpx !important;
   margin-right: 30rpx !important;
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
 .u-row-center {
   -webkit-box-pack: center;
   -webkit-justify-content: center;
           justify-content: center;
 }
 .u-col-center {
   -webkit-box-align: center;
   -webkit-align-items: center;
           align-items: center;
 }
 .u-iconfont {
 	position: relative;
 	display: -webkit-box;
 	display: -webkit-flex;
 	display: flex;
 	text-rendering: auto;
 	font-family: "uicon-iconfont" !important;
 	font-size: 16px;
 	font-style: normal;
 	-webkit-font-smoothing: antialiased;
 	-moz-osx-font-smoothing: grayscale;
 }
 .uicon-arrow-left:before {
 	content: "\e60e";
 }
 .u-m-b-10 {
   margin-bottom: 10rpx !important;
 }
 .u-p-20 {
   padding: 20rpx !important;
 }
.u-ellipsis-2 {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
