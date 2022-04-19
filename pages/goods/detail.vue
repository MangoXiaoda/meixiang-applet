<!-- 商品详情 -->
<template>
	<view class="detail-wrap">
		
	</view>
</template>

<script>
</script>

<style lang="scss">
// 标题栏
.nav-box {
	position: fixed;
	width: 100%;
	min-height: 140rpx;
	z-index: 888;
	top: 0;
	.back-box {
		background-color: rgba(#000, 0.18);
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-top: 14rpx;
	}
	.back-hover {
		background-color: rgba(#fff, 0.18);
	}
	.state-hack {
		width: 100%;
		height: var(--status-bar-height);
		/* #ifdef H5 */
		height: 20rpx;
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
	border-bottom: 1rpx solid rgba(#dfdfdf, 0.8);
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
</style>
