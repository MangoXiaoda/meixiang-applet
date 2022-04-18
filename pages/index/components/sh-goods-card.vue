<!-- 横版大图，商品卡片 -->
<template>
	<view class="big-goods u-flex u-p-20 u-col-top u-m-b-16" @tap="click"
		:style="1 ? 'background-image: url(' + 'http://file.shopro.top/imgs/tag/seckill_x_bg.png' + ')' : ''">
		<image class="goods-img" lazy-load fade-show :src="image" mode="aspectFill"></image>
		<view class=" card-right u-m-l-20 u-flex-col u-row-between">
			<view class="">
				<view class="goods-title u-ellipsis-1 u-m-t-10 u-m-b-10">
					<view v-if="type" class=" sm cu-tag radius title-tag u-m-r-10"
						:style="{ backgroundColor: '#FF5854', color: '#fff' }">热销</view>
					{{ title }}
				</view>
				<view v-show="subtitle" class="subtitle-text u-m-b-10 u-ellipsis-1">{{ subtitle }}</view>
			</view>
			
	<!-- 		<view class="u-m-b-20" v-if="tagTextList.length">
				<view class="tag-box u-m-r-10" v-for="(item, index) in tagTextList" :key="index">{{ item }}</view>
			</view> -->
			
			<view class="u-m-b-20">
				<view class="tag-box u-m-r-10">价格实惠</view>
			</view>
			
			<view class=" u-flex u-row-between u-col-center">
				<view class="font-OPPOSANS">
					<view class="price">{{ price }}</view>
					<view class="origin-price">{{ originPrice }}</view>
				</view>
				
				<!-- 加入购物车 -->
				<view class="cart-box">
					<!-- 多规格 -->
					<button class="u-reset-button item-btn buy-btn" style="#FF5854" @tap.stop="selSku(detail)">
						购买
					</button>
				</view>
				
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
	
/* ==================
    当前页面追加样式
 ==================== */
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
	 
.u-p-20 {
  padding: 20rpx !important;
}

.u-col-top {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
          align-items: flex-start;
}

.u-m-b-16 {
  margin-bottom: 16rpx !important;
}

.u-m-l-20 {
  margin-left: 20rpx !important;
}

.u-flex-col {

  display: -webkit-box;
  display: -webkit-flex;
  display: flex;

  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
          flex-direction: column;
}

.u-row-between {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
          justify-content: space-between;
}

.u-ellipsis-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.u-m-t-10 {
  margin-top: 10rpx !important;
}

.u-m-b-10 {
  margin-bottom: 10rpx !important;
}

.cu-tag {
	font-size: 24rpx;
	vertical-align: middle;
	position: relative;
	display: -webkit-inline-box;
	display: -webkit-inline-flex;
	display: inline-flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	        align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	        justify-content: center;
	box-sizing: border-box;
	padding: 0rpx 16rpx;
	height: 48rpx;
	font-family: Helvetica Neue, Helvetica, sans-serif;
	white-space: nowrap;
}

.radius {
	border-radius: 6rpx;
}

.u-m-r-10 {
  margin-right: 10rpx !important;
}

.u-reset-button {
  padding: 0;
  margin: 0;
  font-size: inherit;
  line-height: inherit;
  background-color: transparent;
  color: inherit;
  -webkit-transform: translate(0rpx, 0rpx);
          transform: translate(0rpx, 0rpx);
}


	
</style>
