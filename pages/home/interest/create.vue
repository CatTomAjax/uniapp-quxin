<template>
	<view class="page">
		<view class="wrap">
			<textarea class="textarea" placeholder="添加兴趣简介" placeholder-class="placeholder" v-model.trim="content" maxlength="100"></textarea>
			<view class="count">{{content.length}}/100</view>
		</view>
		<view class="tip">请设置2-100个字符。</view>
		<view class="btns align-center justify-between">
			<view class="btn">
				<navigator url="" open-type="navigateBack">返回</navigator>
			</view>
			<view class="btn ok" @click="submit">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CreateInterest',
		data(){
			return {
				content: ''
			}
		},
		methods: {
			submit(){
				if(this.content.length < 2) return uni.showToast({
					title: '请设置2-100个字符',
					icon:'error'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.textarea{
		width: 672rpx;
		height: 335rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 13rpx 0rpx rgba(166,155,186,0.18);
		border-radius: 33rpx;
		margin: 20rpx auto 44rpx;
		padding: 46rpx 50rpx;
		box-sizing: border-box;
		color: #000;
		font-size: 28rpx;
		line-height: 1.8em;
	}
	
	.wrap{
		position: relative;
		.count{
			pointer-events: none;
			position: absolute;
			right: 88rpx;
			bottom: 48rpx;
			font-size: 24rpx;
			color: #8c8c8c;
		}
	}
	.placeholder{
		color: #8c8c8c;
		font-size: 28rpx;
	}
	.tip{
		width: 672rpx;
		margin:  0 auto;
		color: #8C8C8C;
	}
	.btns{
		position: fixed;
		left: 40rpx;
		bottom: 66rpx;
		right: 40rpx;
		.btn{
			border-radius: 1000rpx;
			height: 100rpx;
			text-align: center;
			line-height: 98rpx;
			font-size: 28rpx;
			color: #8c8c8c;
			background-color: #F2F2F2;
			width: 140rpx;
			&.ok{
				width: 510rpx;
					color: #fff;
					background-color: #000;
			}
		}
	}
</style>