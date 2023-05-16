<template>
	<view class="page">
		<u-navbar
			title="趣有公益"
			:autoBack="true"
			:background="{background: 'rgba(255,255,255,0)'}"
			:borderBottom="false"
			titleColor="#000000"
			backIconColor="#000000"
			/>
			<view class="footer">
				<view class="btn" @click="doNavigate">立即进入</view>
				<view class="mask">
					目前此功能只覆盖深圳、广州两个城市，
					<view>我们仍在努力扩大范围。欢迎您联系与支持！</view>
				</view>
			</view>
	</view>
</template>

<script>
import { PageOrigin } from '@/constant/global'
	export default{
		onLoad(options){
			this.queryParams =  JSON.parse(options.interest)
		},
		methods: {
			doNavigate(){
				uni.redirectTo({
					url:'/pages/home/lookInterest/index?interest=' + JSON.stringify({
						...this.queryParams,
						origin: PageOrigin.adoptGuide
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		color: #8c8c8c;
		font-size: 22rpx;
	}
	.footer{
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		padding-bottom: 80rpx;
	}
	.btn{
		width: 548rpx;
		height: 93rpx;
		line-height: 92rpx;
		background: #D6F389;
		border-radius: 47rpx;
		color: #000;
		font-size: 32rpx;
		text-align: center;
		margin: 0 auto 26rpx;
	}
	.mask{
		text-align: center;
	}
</style>