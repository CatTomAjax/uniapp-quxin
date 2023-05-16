<template>
	<view class="page">
		<view class="form">
			<button class="btn align-center justify-center wx"  open-type="getUserInfo"  @getuserinfo="onGetUserInfo">
				<u-icon name="weixin-fill" color="#000" size="36" class="icon"></u-icon>
				微信登录
			</button>
			<button class="btn align-center justify-center phone" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
				<u-icon name="weixin-fill" color="#000" size="36" class="icon"></u-icon>
				手机号登录
			</button>
			<view class="regist">
				<navigator url="/pages/login/register">没有账号？<text class="text">注册</text></navigator>
			</view>
			<view class="tip">
				登录或注册即同意趣聊<text class="text">《用户协议》</text>和<text class="text">《隐私协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
import {login}  from '@/api/commonapi/login.js'
import { APPID } from '@/constant/global';
import { Base64 } from '../../utils/base64';
import { user } from '@/api/commonapi/user.js'
import md5 from '@/utils/md5.js'
	export default {
		name: 'Login',
		data(){
			return {
				
			}
		},
		onLoad(options){
			this.redirect = options.redirect
		},
		methods: {
			onGetUserInfo(e){
				console.log('[getuserinfo]', e);
				const {userInfo} = e.detail
				this.submit('userinfo', {
					avatar: userInfo.avatarUrl,
					name: userInfo.nickName
				})
			},
			async submit(type, data = {}){
				const phone = data.phone || 'admin'
				const payload = {
					appid: APPID,
					userType: 2, // 小程序
					phone: phone,
					password: phone,
					account: phone,
					weixinOpenid: this.openid,
					...data
				}
				// 新账户使用固定帐号登录
				const tokenRes = await login.account({
					username: 'admin',
					password: md5('admin'),
					tenantId: '000000'
				})
				console.log('[tokenRes]', tokenRes);
				if(tokenRes.access_token){
					// 把token更新到vuex,并且会触发更新到stoage中
					this.$u.func.saveToken({access_token: tokenRes.access_token, refresh_token: tokenRes.access_token})
				}
				if(type === 'userinfo'){
					// 通过授权用户信息的没有手机号，就拿login.account返回的account字段当手机号填进去
					payload.phone = tokenRes.account
					payload.password = tokenRes.account
				}
				// 获取到token后创建更新为新的帐号
				console.log('[submit payload]', payload);
				const res =  await login.submit(payload)
				if(res.code === 200){
					this.getUserInfo(res.data.id)
				}
				
			},
			async onGetPhoneNumber(e){
				console.log('[getphone]', e);
				let { code  } = e.detail
				const res = await login.getPhoneNumber(code)
				if(res.code === 200){
					this.submit('phone', {phone: res.data.phoneNumber})
				}
			},
			async getUserInfo(id, payload = {}){
				let params = {
					id
				}
				const res = await user.detail(params)
				if(res.code == 200){
					// 更新登录状态，并且更新用户信息到vuex和storage中
					this.$u.func.login({...res.data, ...payload})
					// 登录后跳转
					uni.redirectTo({
						url: this.redirect ? decodeURIComponent(this.redirect) : '/pages/home/home'
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		height: 100vh;
		position: relative;
		text-align: center;
		background-repeat: no-repeat;
		background-position: 0 center;
		background-size: cover;
	}
	.form{
		position: absolute;
		left: 12rpx;
		bottom: 12rpx;
		right: 12rpx;
		background-color: #fff;
		border-radius: 80rpx;
		padding: 139rpx 0 36rpx;
	}
	.btn{
		border-radius: 1000rpx;
		width: 548rpx;
		height: 93rpx;
		font-size: 32rpx;
		margin: 0 auto;
	}
	.icon{
		margin-right: 21rpx;
	}
	.wx{
		background-color: #D6F389;
		margin-bottom: 42rpx;
	}
	.phone{
		background-color: #131413;
		color: #D6F389;
	}
	.regist{
		font-size: 22rpx;
		padding: 26rpx 0 70rpx;
		.text{
			color: #D6F389;
		}
	}
	.tip{
		color: #0E0F2E;
		font-size: 18rpx;
		.text{
			color: #8FB724;
		}
	}
</style>