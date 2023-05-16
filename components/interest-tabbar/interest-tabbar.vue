<template>
	<view class="interest-tabbar_node">
		<view class="interest-tabbar">
			<view class="bg"></view>
			<view class="inner acea-row row-around row-middle">
				<view :class="['item', 'flex-col', 'justify-center', 'align-center', type === InterestTabbarType.see && 'active']" @click="select(InterestTabbarType.see)">
					<image
						src="//cdn.quxin.chat/icon/lookInterest/eye.png"
						mode="scaleToFill"
						class="icon1"
					/>
					<text class="text">看看</text>
				</view>
				<view :class="['item', 'flex-col', 'justify-center', 'align-center', type === InterestTabbarType.shake && 'active']" @click="select(InterestTabbarType.shake)">
					<image
						src="//cdn.quxin.chat/icon/lookInterest/hi.png"
						mode="scaleToFill"
						class="icon2"
					/>
					<text class="text">摇人</text>
				</view>
				<view :class="['item', 'flex-col', 'justify-center', 'align-center', type === InterestTabbarType.channel && 'active']" @click="select(InterestTabbarType.channel)">
					<image
						src="//cdn.quxin.chat/icon/lookInterest/channel.png"
						mode="scaleToFill"
						class="icon3"
					/>
					<text class="text">频道</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { InterestTabbarType } from '../../constant/activity'
	
	export default{
		name: 'InterestTabbar',
		props: {
			type: {
				type: Number,
				default: InterestTabbarType.see
			}
		},
		data(){
			return {
				InterestTabbarType
			}
		},
		methods: {
			select(type){
				this.$emit('change', type)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.interest-tabbar_node{
		height: 190rpx;
	}
	.interest-tabbar {
		position: fixed;
		left: 50%;
		bottom: 0;
		width: 722rpx;
		height: 180rpx;
		transform: translateX(-50%);
		border: 1px solid rgba(255,255,255,0.57);
		box-sizing: border-box;
		.bg{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			border-top-left-radius: 80rpx;
			border-top-right-radius: 80rpx;
			backdrop-filter: blur(10px);
			&:before{
				content: "";
				background-color: rgba(0, 0, 0, .2);
				position: absolute;
				left: 14rpx;
				right: 14rpx;
				top: 0;
				height: 100%;
				z-index: -1;
				border-top-left-radius: 80rpx;
				border-top-right-radius: 80rpx;
				box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(255,255,255,0.18), 0rpx 10rpx 18rpx 0rpx rgba(255,255,255,0.52);
			}
		}
		.inner{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
		}
		.item {
			width: 133rpx;
			height: 107rpx;
			background: #FFFFFF;
			border-radius: 33rpx;
			color: #000;
			text-align: center;
			.icon{
				&1{
					width: 47rpx;
					height: 30rpx;
				}
				&2{
					width: 44rpx;
					height: 43rpx;
				}
				&3{
					width: 43rpx;
					height: 43rpx;
				}
			}
			.text{
				padding-top: 9rpx;
				font-weight: 400;
				font-size: 24rpx;
			}
			&.active {
				background-color: #D6F389;
			}
		}
	}
</style>