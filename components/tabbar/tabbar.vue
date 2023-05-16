<template>
	<view class="tabbar-node">
		<view class="bg"></view>
		<view class="tabbar justify-between fc-000 fs-24">
			<view :class="['item', {active: item.active}]" v-for="(item, i) in confList" :key="i">
				<text class="count" v-if="item.count > 0 && item.showCount">{{item.count}}</text>
				<image class="icon" :src="item.icon"></image>
				<text class="text">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Tabbar',
		props: {
			/**
			 * tabbar配置
			 * @param {[{
				 text: string
				 icon: string
				 count: number 消息数量
				 active: boolean 选中与否
				 showCount: boolean 显示数字角标
			 }]}  
			 * */
			confList: {
				type: Array,
				default:()=> []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar-node{
		height: 180rpx;
		width: 100%;
	}
	.tabbar{
		position: fixed;
		left: 50%;
		bottom: 0;
		width: 722rpx;
		height: 180rpx;
		transform: translateX(-50%);
		box-sizing: border-box;
		padding: 46rpx 48rpx 0;
	}
	.bg{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 180rpx;
		background-size: 100% auto;
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
	.item{
		width: 133rpx;
		height: 107rpx;
		background-color: #fff;
		border-radius: 33rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		position: relative;
		justify-content: center;
		.icon{
			width: 43rpx;
			height: 43rpx;
			display: block;
			margin: 0 auto;
			vertical-align: middle;
		}
		.text{
			padding-top: 12rpx;
			font-weight: 400;
			font-size: 24rpx;
			font-weight: bold;
		}
		.count{
			position: absolute;
			right: 0;
			top: 0;
			background-color: #F25259;
			border-radius: 1000rpx;
			text-align: center;
			transform: translateY(-50%);
			font-size: 24rpx;
			color: #fff;
			min-width: 36rpx;
			height: 36rpx;
			lighting-color: 36rpx;
			white-space: nowrap;
		}
		&.active{
			background-color: #D6F389;
		}
	}
</style>