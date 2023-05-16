<template>
	<view>
		<uni-popup mode="center" ref="popup">
			<view class="modal">
				<image src="//cdn.quxin.chat/icon/logo.png" class="logo"></image>
				<view class="h1">{{title[type]}}</view>
				<view class="content" v-html="content[type]"></view>
				<view class="footer">
					<button class="btn btn-1" @click="doAction">同意</button>
					<button class="btn btn-2" @click="close">{{cancelBtn[type]}}</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: 'Welcome',
		data(){
			return {
				type: 0,
				title: [
					'欢迎使用趣信',
					'获取你的地理位置信息'
				],
				content: [
					`我们非常重视保护您的个人信息和隐私，请您认真阅读并理解《趣信用户协议》 和《趣信隐私权政策》，以了解我们是如何规范的收集和使用您的个人信息。
					
					1.为了保障您正常使用我们的服务及您的账号安全，我们将申请使用设备信息权限和存储权限收集并缓存设备信息及日志信息，左你估田力突发布眠冬时
					玳们可飥由请相`,
					
					`为您更方便的使用本软件，需要授权地理位置权限，是否同意开启？`
				],
				cancelBtn: ['不同意并退出', '暂不使用']
			}
		},
		methods: {
			doOpen(type = 0){
				this.type = type
				this.$refs.popup.open()
			},
			close(){
				if(this.type === 0){
					return this.type = 1
				}
				this.$refs.popup.close()
			},
			doAction(){
				if(this.type === 1){
					// 授权地理位置
					uni.authorize({
						scope:"scope.userLocation",
						success: res =>{
							console.log('@@scope.userLocation: ',res)
							this.close()
						},
						fail: res =>{
							// 拒绝授权
							console.log('@@scope.userLocation fail: ',res)
							uni.openSetting()
							this.close()
						}
					})
				}else{
					this.type = 1
					uni.setStorageSync('hasShowGuide', 1)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal{
		width: 624rpx;
		background: #fff;
		border-radius: 80rpx;
		color: #000;
		margin: 0 auto;
		padding: 80rpx 58rpx;
		.logo{
			width: 120rpx;
			height: 120rpx;
			margin: 0 auto 28rpx;
			display: block;
		}
		.h1{
			text-align: center;
			font-size: 38rpx;
		}
		.content{
			max-height: 445rpx;
			min-height: 82rpx;
			margin: 78rpx 0 62rpx;
			overflow-y: scroll;
		}
		.footer{
			.btn{
				display: block;
				font-size: 28rpx;
				text-align: center;
				background-color: transparent;
				height: 100rpx;
				line-height: 100rpx;
				&::after{
					display: none;
					padding: 0;
					margin: 0;
				}
				&-1{
					margin: 0 auto 33rpx;
					color: #000;
					background-color: #D6F389;
					border-radius: 1000rpx;
				}
				&-2{
					color: #8c8c8c;
					height: auto;
					line-height: 1.5em;
				}
			}
		}
	}
</style>