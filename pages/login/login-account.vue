<template>
	<view class="container">
		<view class="content">
			<view class="top">
				<image src="/static/images/logo.png" class="logo" mode="widthFix"></image>
				<view class="cell">
					<view class="name">账号</view>
					<view class="input-box">
						<input type="text" v-model="username" placeholder="请输入账号" class="ipt" placeholder-class="hold"
							@blur="handleInputCheck" />
					</view>
				</view>
				<view class="cell">
					<view class="name">密码</view>
					<view class="input-box">
						<input type="password" v-model="password" placeholder="请输入密码" class="ipt"
							placeholder-class="hold" @blur="handleInputCheck" />
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
				<!-- <navigator url="/pages/login/login-phone" hover-class="none" class="change">手机登录 ></navigator> -->
			</view>

			<!-- 社交账号登录 -->
			<view class="bottom">
				<view class="tag">社交账号登录</view>
				<view class="chat-arr">
					<!-- <image src="/static/images/qq.png" class="icon" mode=""></image> -->
					<image src="/static/images/wx.png" class="icon" mode="" @click="wxLogin"></image>
					<!-- <image src="/static/images/wb.png" class="icon" mode=""></image> -->
				</view>
			</view>
			<!-- 微信登录弹窗 -->
			<u-popup v-model="show" mode="center" border-radius="20" width="600">
				<view class="fs-32 fc-101 fw" style="text-align: center;padding: 14rpx 0;">微信登录</view>
				<view class="acea-row row-center row-middle" style="margin-top: 60rpx;padding-bottom: 80rpx;">
					<button hover-class="none" plain="true" open-type="getPhoneNumber" @getphonenumber="getUserInfo" style="border: none;">
						<view class="loginBotton fs-28 fc-white fw-400">手机号授权登录</view>
					</button>
				</view>
			</u-popup>
		</view>
		<!--  -->
	</view>
</template>

<script>
import { login } from '@/api/commonapi/login.js'
import { user } from '@/api/commonapi/user.js'
import md5 from '@/utils/md5.js'
	export default {
		onLoad(option) {
			const {
				redirect
			} = option
			if (redirect) this.redirect = redirect
		},
		data() {
			return {
				show:false,
				username: 'admin',
				password: 'admin',
				disabled: false,
				redirect: '',
				code:"", // 登录code
			}
		},
		onLoad(){
		},
		methods: {
			// 微信获取当前用户信息 并 传递后端 调用接口
			getButtonUserInfo(e){
				let that = this
				uni.getUserInfo({
					success(res1){
						that.getLogin(res1.rawData,e.detail.encryptedData,e.detail.iv)
					}
				})
			},
			// 微信登录获取token
			async getLogin(rawData,en,iv){
				let params = {
					rawData,
					code:this.code,
					encryptedData: en,
					iv
				}
				const res = await login.account(params)
				if(res.code === 200){
					this.getUserInfo(res.user_id)
				}
			},
			// 微信登录获取token
			wxLogin(){
				let that = this
				uni.login({
				    success(res) {
						that.code = res.code
						that.show = true
					}
				})
			},
			// 获取用户信息
			async getUserInfo(id, payload = {}){
				let params = {
					id
				}
				const res = await user.detail(params)
				if(res.code == 200){
					uni.setStorageSync('userInfo', res.data)
					this.$u.func.login({...res.data, ...payload})
					// uni.navigateBack()
				}
			},
			// 账号密码登录
			submit() {
				let params = {
					password: md5(this.password),
					tenantId: '000000',
					username: this.username
				}
				login.account(params).then(res => {
					if(res.access_token) {
						// uni.setStorageSync('token', res.access_token)
						this.$u.func.saveToken({access_token: res.access_token, refresh_token: res.access_token})
						this.getUserInfo(res.user_id)
					} else {
						this.$u.func.showToast({
							title: res.msg
						})
					}
				}).catch(err => {
					this.$u.func.showToast({
						title: err
					})
				})
			},
			handleInputCheck() {
				this.disabled = false
			}
		}
	}
</script>

<style lang="scss">
	.loginBotton{
		width: 534rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		background-color: #3FD094;
	}
	.container {
		background-color: #fff;
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
				border-bottom: 2rpx solid #f6f6f6;
				display: flex;
				align-items: center;
				background-color: #f4f4f4;
				text-indent: 20rpx;

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
			// color: #14b9c8;
			color: #5f88ff;
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
			justify-content: center;

			.icon {
				width: 73rpx;
				height: 73rpx;
			}
		}
	}
</style>
