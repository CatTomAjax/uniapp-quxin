<script>
	import { calcDate } from '@/utils/date.js'
	import { tokenTime } from '@/common/setting.js'
	import {login} from '@/api/commonapi/login.js'
	import {user} from '@/api/commonapi/user.js'
	import md5 from '@/utils/md5.js'
	import { getToken } from '@/utils/global-utils.js'
	export default {
		data() {
			return { refreshLock: false }
		},
		onLaunch: function(options) {
			console.log('[App Launch]', options)
			
			this.initUser(options)
			// this.refreshToken()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 用户登录/注册等判断
			initUser(options){
				uni.login({
					provider: 'weixin',
					success: async(res) => {
						console.log('[wxcode]', res.code)
						
						const loginRes = await login.wxLogin(res.code)
						if(loginRes.code === 200){
							const {openid, existUser, account} = loginRes.data
							this.$u.vuex('openid', openid)
							let query = ''
							Object.keys(options.query).map(k => {
								query += `${k}=${options.query[k]}`
							})
							// 获取当前页面地址
							const redirect = `${options.path}?${query}`
							if(existUser === 'false'){
								// 该用户未授权则跳转登录注册页
								uni.navigateTo({
									url:`/pages/login/index?redirect=${encodeURIComponent(redirect)}`
								})
							}else{
								// 已在系统中注册过
								if(!getToken(this)){
									// 本地未找到token。直接登录获取token
									const tokenRes = await login.account({
										username: account,
										password: md5(account),
										tenantId: '000000'
									})
									console.log('@@获取token', tokenRes);
									if(tokenRes.access_token){
										await this.$u.func.saveToken({access_token: tokenRes.access_token, refresh_token: tokenRes.access_token})
										await this.getUserInfo(tokenRes.user_id)
										// 重新加载下当前页面
										uni.reLaunch({
											url: redirect
										})
											
									}									
								}
							}
						}
					}
				})
			},
			// 获取用户信息
			getUserInfo(id, payload = {}){
				return new Promise(async resolve=> {
					let params = {
						id
					}
					const res = await user.detail(params)
					if(res.code == 200){
						this.$u.func.login({...res.data, ...payload})
						resolve(null)
					}
					resolve(res)
				})
			},
			// 定时检测token
			refreshToken() {
				this.refreshTime = setInterval(() => {
					const token = uni.getStorageSync('token')
					const date = calcDate(token.datetime, new Date().getTime())
					if (!date) return
					if (date.seconds >= tokenTime && !this.refreshLock) {
						this.refreshLock = true
						this.$u.api
							.refreshToken(token.content, '000000')
							.then(res => {
								this.$u.func
									.refreshToken(res)
									.then(() => {
										this.refreshLock = false
									})
									.catch(() => {
										this.refreshLock = false
									})
							})
							.catch(() => {
								this.refreshLock = false
							})
					}
				}, 30000)
			}
		}
	}
</script>
<style lang="scss">
	/*uview全局样式*/
	@import 'uview-ui/index.scss';
	/*app全局样式*/
	@import 'static/style/app.scss';
	@import 'static/style/public.css';

	// 修改checkbox样式
	checkbox.curdCheck .wx-checkbox-input,
	checkbox.curdCheck .uni-checkbox-input {
		border-radius: 50% !important;
		border-color: #c8c9cc !important;
		color: #5f88ff !important;
	}

	checkbox.curdCheck .wx-checkbox-input-checked,
	checkbox.curdCheck .uni-checkbox-input-checked {
		// background-color: #5f88ff;
		color: #5f88ff !important;
		border-color: #5f88ff !important;
	}

	.uni-picker-container,
	.wx-picker-container {
		z-index: 10074;
	}

	uni-modal {
		z-index: 19999 !important;
	}
</style>
