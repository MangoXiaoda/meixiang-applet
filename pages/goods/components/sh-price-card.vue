<template>
	<view>
		<!-- 正常商品 -->
		<view class="normal-price-box">
			<view class="u-felx u-col-bottom">
				<text class="unit font-OPPOSANS">￥</text>
				<text class="price font-OPPOSANS">{{ detail.price }}</text>
				<text class="notice">优惠价</text>
			</view>
			<view class="u-flex u-row-left price-bottom-box">
				<view class="u-flex">
					<view class="original-price font-OPPOSANS">原价：￥{{ detail.cost_price }}</view>
					<text class="line"></text>
					<view class="sold font-OPPOSANS">已售：{{ detail.sales }}件</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 商品详情价格卡片
 * @property {Object} detail - 商品详情
 * @property {String} type - 商品分类
 */
let timer = null;
export default {
	components: {},
	data() {
		return {
			time: {}, //倒计时
			activityRules: {
				startTime: 0,
				endTime: 0,
				status: '',
				countDownTime: 0
			}
		};
	},
	props: {
		detail: Object,
		type: ''
	},
	created() {
		if (this.detail.activity && this.detail.activity.type) {
			this.doActivityRules();
		}
	},
	beforeDestroy() {
		clearInterval(timer);
		timer = null;
	},
	computed: {
		// 百分比
		percent() {
			let unit = 0;
			if (this.detail.id) {
				unit = this.detail.stock + this.detail.sales > 0 ? ((this.detail.sales / (this.detail.sales + this.detail.stock)) * 100).toFixed(2) : 0;
			}
			return Number(unit);
		}
	},
	methods: {
		// 触发活动规则
		doActivityRules() {
			let that = this;
			switch (that.detail.activity.type) {
				case 'seckill':
				case 'groupon':
					that.activityRules.startTime = that.detail.activity.starttime * 1000;
					that.activityRules.endTime = that.detail.activity.endtime * 1000;
					that.countDown();
					break;
			}
		},
		// 计时器
		countDown() {
			let that = this;
			let t = 0;

			timer = setInterval(() => {
				let nowTime = new Date().getTime();

				//当前日期大于活动结束日期，活动结束
				if (that.activityRules.endTime < nowTime) {
					that.activityRules.status = 'end';
					that.$emit('change', JSON.stringify(that.activityRules));
				}

				// 活动未结束
				if (nowTime < that.activityRules.startTime) {
					//当前日期小于开始时间，活动未开始
					that.activityRules.status = 'waiting';
					t = that.activityRules.startTime - nowTime;
				} else if (nowTime > that.activityRules.endTime) {
					//当前日期大于结束时间，活动结束
					that.activityRules.status = 'end';
					clearInterval(timer);
					return;
				} else {
					// 活动进行中
					that.activityRules.status = 'ing';
					t = that.activityRules.endTime - nowTime;
				}
				that.activityRules.countDownTime = that.formatToHours(t / 1000);
				t--;
				that.$emit('change', JSON.stringify(that.activityRules));
			}, 1000);
		},
		//时间格式化(格式化最大为小时)
		formatToHours(t) {
			let format = {
				h: '00',
				m: '00',
				s: '00'
			};
			if (t > 0) {
				let h = Math.floor(t / 3600);
				let m = Math.floor((t / 60) % 60);
				let s = Math.floor(t % 60);

				format.h = h < 10 ? '0' + h : h;
				format.m = m < 10 ? '0' + m : m;
				format.s = s < 10 ? '0' + s : s;
			}
			return format;
		}
	}
};
</script>

<style lang="scss">
// 正常商品
.normal-price-box {
	padding: 20rpx;
	// background: url('https://www.meixiang.online'+'/imgs/detail/detail_price_normal_bg.png') no-repeat;
	background: url('http://file.shopro.top/imgs/detail/detail_price_normal_bg.png') no-repeat;
	background-size: 100% 100%;
	.unit,
	.notice {
		font-size: 24rpx;
		color: #fff;
	}

	.price {
		font-size: 36rpx;
		color: #fff;
		font-weight: bold;
		margin: 0 10rpx;
	}

	.price-bottom-box {
		font-size: 24rpx;
		color: #fff;
		font-weight: 500;
		padding-top: 10rpx;
		.original-price {
			text-decoration: line-through;
		}
		.line {
			margin: 0 20rpx;
			display: inline-block;
			width: 3rpx;
			height: 24rpx;
			background-color: #fff;
		}
	}
}
</style>
