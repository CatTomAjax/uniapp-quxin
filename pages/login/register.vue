<template>
	<view class="page">
		<view class="form">
			<view class="badge"></view>
			<u-form
				labelPosition="left"
				:model="model"
				:rules="rules"
				label-width="117"
				ref="uForm">
				<u-form-item
					class="form-item"
					label="手机号"
					prop="phone"
					borderBottom>
					<u-input
						v-model="model.phone"
						border="none"
						placeholder="请输入手机号"
						:border="false"
						maxlength="11"></u-input>
				</u-form-item>
				<u-form-item
					class="form-item"
					label="验证码"
					prop="code"
					borderBottom>
					<view class="wrap">
						<u-input
							v-model="model.code"
							border="none"
							placeholder="请输入验证码"
							:border="false"
							maxlength="8">
							</u-input>
							<button class="get-code" :disabled="count > 0" @click="getCode">{{count > 0 ? `${count}s`: '获取验证码'}}</button>
					</view>
				</u-form-item>
				<u-form-item
					class="form-item"
					label="密码"
					prop="password"
					borderBottom>
					<view class="wrap">
						<u-input
							v-model="model.password"
							border="none"
							placeholder="请输入密码"
							:type=" noSee ? 'password': 'text'"
							:border="false"
							maxlength="-1"
							:clearable="false"
							class="password" suffixIcon>
							</u-input>
							<view class="icon-wrap" @click="toggleSee">
								<u-icon :name="noSee ? 'eye-fill' : 'eye-off'" size="36" color="#8C8C8C"></u-icon>
							</view>
					</view>
				</u-form-item>
				<u-form-item :border-bottom="false">
					<view class="agree">
						<image src="//cdn.quxin.chat/image/add-friend/icon-4-1.png" class="agree-icon"></image>
						圈子用户协议
					</view>
				</u-form-item>
				<button class="register-btn">注册</button>
				<view class="tip">
					<navigator url="/pages/login/index" open-type="redirect">
						已有账号？<text class="text">登录</text>
					</navigator>
				</view>
			</u-form>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Register',
		data(){
			return {
				model: {
					phone: '',
					code: '',
					password: ''
				},
				noSee: !0,
				count: 0,
				rules: {
					phone: {
						type: 'number',
						required: !0,
						message: '请填写手机号',
						trigger: ['blur', 'change']
					}
				}
			}
		},
		onReady(){
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			onGetUserInfo(e){
				console.log('[getuserinfo]', e);
			},
			onGetPhoneNumber(e){
				console.log('[getphone]', e);
			},
			toggleSee(){
				this.noSee = !this.noSee
			},
			getCode(){
				this.count = 60
				if(this.sid){
					clearInterval(this.sid)
					this.sid = null
				}
				this.sid = setInterval(() =>{
					if(this.count < 0){
						clearInterval(this.sid)
						this.sid = null
						return
					}
					this.count --
				}, 1e3)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		height: 100vh;
		position: relative;
		background-repeat: no-repeat;
		background-position: 0 center;
		background-size: cover;
		background-color: #f00;
	}
	.badge{
		position: absolute;
		left: 50%;
		top: 20rpx;
		transform: translateX(-50%);
		width: 111rpx;
		height: 10rpx;
		background: #000000;
		opacity: 0.2;
		border-radius: 5rpx;
	}
	.form{
		position: absolute;
		left: 12rpx;
		bottom: 12rpx;
		right: 12rpx;
		background-color: #fff;
		border-radius: 80rpx;
		padding: 139rpx 63rpx 0 87rpx;
		box-sizing: border-box;
	}
	.form-item{
		::v-deep .u-form-item {
			&:after{
				border-bottom-color: #E9E9E9;
				border-bottom-style: dashed;
			}			
		}
	}
	.tip{
		font-size: 22rpx;
		padding-bottom: 63rpx;
		color: #8C8C8C;
		text-align: center;
		.text{
			color: #8A68F4;
		}
	}
	.wrap{
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: nowrap;
	}
	.get-code{
		width: 182rpx;
		height: 50rpx;
		line-height: 48rpx;
		background-color: #8A68F4;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		padding: 0;
		margin: 0 0 0 10rpx;
		border-radius: 1000rpx;
		&[disabled]{
			background-color: #8A68F4;
			color: #fff;
		}
	}
	.icon-wrap{
		width: 50rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.password{
		flex: 1;
		::v-deep .u-input__right-icon{
			display: none;
		}
	}
	.agree{
		color: #8C8C8C;
		font-size: 28rpx;
		.agree-icon{
			width: 26rpx;
			height: 26rpx;
			margin-right: 16rpx;
		}
	}
	.register-btn{
		width: 548rpx;
		height: 93rpx;
		line-height: 92rpx;
		background: #8A68F4;
		border-radius: 47rpx;
		margin: 26rpx auto;
		padding: 0;
		font-size: 32rpx;
		color: #fff;
		font-weight: bold;
	}
</style>