<!-- 横版大图，商品卡片 -->
<template>
	<view class="big-goods u-flex u-p-20 u-col-top u-m-b-16" @tap="click"
		:style="type ? 'background-image: url(' + $IMG_URL + typeMap[type].goodsBg + ')' : ''">
		<image class="goods-img" lazy-load fade-show :src="image" mode="aspectFill"></image>
		<view class=" card-right u-m-l-20 u-flex-col u-row-between">
			<view class="">
				<view class="goods-title u-ellipsis-1 u-m-t-10 u-m-b-10">
					<view v-if="type" class=" sm cu-tag radius title-tag u-m-r-10"
						:style="{ backgroundColor: typeMap[type].tagBg, color: '#fff' }">{{ typeMap[type].text }}</view>
					{{ title }}
				</view>
				<view v-show="subtitle" class="subtitle-text u-m-b-10 u-ellipsis-1">{{ subtitle }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 *shoproGoodsCard - 商品列表卡片
	 * @property {Object} detail - 商品详情
	 * @property {String} type - 商品类型
	 * @property {String} image - 商品图片
	 * @property {String} title - 商品标题
	 * @property {String} subtitle - 商品副标题
	 * @property {String | Number} price - 商品价格
	 * @property {String | Number} originPrice - 商品原价
	 * @property {String | Number} sales - 商品销量
	 * @property {Array} tagTextList - 活动标签
	 * @event {Function} click 商品被点击
	 */
	export default {
		components: {},
		data() {
			return {
				showSku: false,
				goodsInfo: {}, //商品详情
				typeMap: {
					seckill: {
						text: '秒杀',
						tagBg: '#FF5854',
						goodsBg: '/imgs/tag/seckill_x_bg.png',
						btnText: '去抢购',
						btnBg: 'background: linear-gradient(90deg, #D01325, #ED3C30);'
					},
					groupon: {
						text: '拼团',
						tagBg: '#FE832A',
						goodsBg: '/imgs/tag/groupon_x_bg.png',
						btnText: '马上拼',
						btnBg: 'background: linear-gradient(90deg, #FF6600 0%, #FE832A 100%);'
					}
				}
			};
		},
		computed: {
		
		},
		props: {
			detail: {
				type: Object,
				default: () => {
					return {};
				}
			},
			type: {
				type: [String, null],
				default: ''
			},
			image: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			subtitle: {
				type: String,
				default: ''
			},
			price: {
				type: [String, Number],
				default: ''
			},
			originPrice: {
				type: [String, Number],
				default: ''
			},
			sales: {
				type: [String, Number],
				default: ''
			},
			tagTextList: {
				type: Array,
				default: () => []
			}
		},
		mounted() {},
		methods: {
	
		}
	};
</script>

<style lang="scss">
	// 大商品卡片
	.big-goods {
		width: 710rpx;
		min-height: 260rpx;
		background: #ffffff;
		border-radius: 20rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;

		.goods-img {
			width: 260rpx;
			height: 260rpx;
			background-color: #f5f5f5;
			border-radius: 6rpx;
		}

		.card-right {
			width: 430rpx;
			height: 220rpx;
		}

		.goods-title {
			font-size: 26rpx;
			font-weight: 600;
			width: 400rpx;
			color: #000000;
			padding-top: 6rpx;

			.title-tag {
				transform: scale(0.9);
				position: relative;
				top: -6rpx;
			}
		}

		.subtitle-text {
			font-size: 22rpx;
			width: 400rpx;
			font-weight: 500;
			color: #666666;
		}

		.tag-box {
			border: 1rpx solid #ff0000;
			display: inline-block;
			font-size: 20rpx;
			line-height: 30rpx;
			padding: 0 10rpx;
			color: #ff0000;
			border-radius: 8rpx;
		}

		// 购物车
		.cart-box {
			.cart-btn {
				width: 54rpx;
				height: 54rpx;
				border-radius: 50%;
				padding: 0;
				background: linear-gradient(90deg, #e9b461, #eecc89);
			}

			.buy-btn {
				width: 120rpx;
				line-height: 50rpx;
				background: linear-gradient(90deg, #e9b461, #eecc89);
				border-radius: 25rpx;
				font-size: 24rpx;
				font-weight: 500;
				color: #ffffff;
			}
		}

		// 价格
		.price {
			color: #ff0000;
			font-weight: 600;

			&::before {
				content: '￥';
				font-size: 20rpx;
			}
		}

		.origin-price {
			color: #c4c4c4;
			font-size: 24rpx;
			text-decoration: line-through;

			&::before {
				content: '￥';
				font-size: 20rpx;
			}
		}
	}
</style>
