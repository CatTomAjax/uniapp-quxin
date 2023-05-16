<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="false" back-icon-name="arrow-leftward" title="登录"
			:background="{ background: '#fff' }" title-color="#000000">
			<view class="" slot="right">
				<image src="/static/images/user/c8.png" class="set-icon" mode="widthFix"></image>
			</view>
		</u-navbar>

		<view class="content">
			<view class="top">
				<image src="/static/images/logo.png" class="logo" mode="widthFix"></image>
				<view class="cell">
					<view class="name">手机号</view>
					<view class="input-box">
						<input type="number" v-model="phone" placeholder="请输入手机号码" class="ipt" placeholder-class="hold"
							@blur="handleInputCheck" />
					</view>
				</view>
				<view class="cell">
					<view class="name">短信验证码</view>
					<view class="input-box">
						<input type="number" v-model="code" placeholder="请输入验证码" class="ipt" placeholder-class="hold"
							@blur="handleInputCheck" />
						<view class="code" @click="sendCode" v-if="count === 60">获取验证码</view>
						<view class="code" v-else><text>{{ count }}</text>秒重新获取</view>
					</view>
				</view>
				<!-- <view class="agree">
					登录即代表同意
					<text class="a">《用户协议》</text>
					和
					<text class="a">《隐私政策》</text>
				</view> -->
				<button class="submit" @click="submit" :disabled="disabled">登录</button>
				<view class="tip">未注册用户验证后将自动注册并登录</view>
				<navigator url="/pages/login/login-account" hover-class="none" class="change">密码登录 ></navigator>
			</view>

			<!-- 社交账号登录 -->
			<view class="bottom">
				<view class="tag">社交账号登录</view>
				<view class="chat-arr">
					<image src="/static/images/wx.png" class="icon" mode=""></image>
					<image src="/static/images/qq.png" class="icon" mode=""></image>
					<image src="/static/images/wb.png" class="icon" mode=""></image>
				</view>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				code: '',
				disabled: true,
				count: 60,
				timer: ''
			};
		},
		methods: {
			submit() {
				this.$u.func.showToast({
					title: '新版本即将到来',
				})
			},
			handleInputCheck() {
				if (!this.phone && !/^1\d{10}$/.test(this.phone)) {
					this.disabled = true
					return uni.showToast({
						title: '请输入正确的手机号',
						duration: 2000,
						icon: 'none'
					});
				}
				if (!this.code) {
					this.disabled = true
					return uni.showToast({
						title: '请输入验证码',
						duration: 2000,
						icon: 'none'
					});
				}
				this.disabled = false
			},
			async sendCode() {
				this.count = this.count - 1;
				this.timer = setInterval(() => {
					if (this.count == 0) {
						clearInterval(this.timer);
						this.count = 60;
						return;
					}
					this.count = this.count - 1;
				}, 1000);
			}
		}
	};
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		overflow: hidden;

		.set-icon {
			vertical-align: middle;
			width: 41rpx;
			height: auto;
			margin-right: 35rpx;
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		height: 90vh;
		width: 100%;

		.top {
			width: 100%;
		}

		.logo {
			display: block;
			width: 281rpx;
			height: auto;
			margin: 0 auto 120rpx;
		}

		.cell {
			width: 100%;
			padding: 0 85rpx;
			box-sizing: border-box;
			margin-top: 36rpx;

			.name {
				font-size: 22rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #3e4a59;
				line-height: 30rpx;
				opacity: 0.72;
			}

			.input-box {
				padding: 30rpx 0;
				border-bottom: 2rpx solid #f0f2f5;
				display: flex;
				align-items: center;

				.code {
					font-size: 22rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #0d0d0d;
					line-height: 30rpx;

					text {
						// color: #14b9c8;
						color: #5f88ff;
					}
				}

				.ipt {
					flex: 1;
					// height: 24rpx;
					font-size: 24rpx;
				}

				.hold {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #3e4a59;
					line-height: 30px;
					opacity: 0.45;
				}
			}
		}

		.agree {
			margin: 27rpx 95rpx 0;
			font-size: 22rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #cacaca;
			line-height: 34rpx;

			.a {
				color: #000000;
			}
		}

		.submit {
			margin: 60rpx 90rpx 0;
			border: none;
			width: 572rpx;
			height: 86rpx;
			line-height: 86rpx;
			box-sizing: border-box;
			border-radius: 15rpx;
			background-color: #5f88ff;
			color: #ffffff;

			&::after {
				content: none;
			}

			&::before {
				content: none;
			}

			&[disabled='true'] {
				background: #e4e4e4;
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #ffffff;
			}
		}

		.tip {
			margin-top: 30rpx;
			text-align: center;
			font-size: 22rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #cacaca;
			line-height: 34rpx;
		}

		.change {
			margin-top: 20rpx;
			text-align: center;
			font-size: 22rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #69b0ff;
			line-height: 34rpx;
		}

		.tag {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 22rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #9f9f9f;
			line-height: 34rpx;

			&::before {
				content: '';
				display: block;
				width: 160rpx;
				height: 1px;
				background: #d8d8d8;
				opacity: 0.86;
			}

			&::after {
				content: '';
				display: block;
				width: 160rpx;
				height: 1px;
				background: #d8d8d8;
				opacity: 0.86;
			}
		}

		.chat-arr {
			margin-top: 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.icon {
				width: 73rpx;
				height: 73rpx;
			}
		}
	}
</style>
