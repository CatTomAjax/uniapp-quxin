import { user } from "../api/commonapi/user"

// 全局公共方法
const install = (Vue, vm) => {
	// 存储token
	const saveToken = (tokenData = {})=>{
		console.log('saveToken', tokenData);
		return new Promise(async resolve => {
			await vm.$u.vuex('token', tokenData.access_token)
			await vm.$u.vuex('refreshToken', tokenData.refresh_token)
			await vm.$u.vuex('isLogin', true)
			
			setTimeout(()=>{
				resolve(true)
			}, 0)
		})
	}
	// 登录操作
	const login = (userInfo, redirect) => {
		vm.$u.vuex('userInfo', userInfo)
		setTimeout(()=>{
		if (redirect) {
			uni.redirectTo({
				url: redirect,
				fail() {
					uni.switchTab({
						url: redirect
					})
				}
			})
		} else {
			uni.navigateBack()
		}			
		},10)
	}


	// 退出登录
	const logout = () => {
		vm.$u.vuex('userInfo', {
			avatar: '',
			nick_name: '游客',
			tenant_id: '暂无'
		})
		vm.$u.vuex('token', '')
		vm.$u.vuex('isLogin', false)
		uni.redirectTo({
			url: '/pages/login/login-account'
		})
	}

	// 检查登录状态
	const checkLogin = (e = {}) => {
		if (!vm.isLogin) {
			uni.navigateTo({
				url: '/pages/login/login-account'
			})
			return false
		}
		return true
	}

	// 跳转路由前检查登录状态
	const route = (url) => {
		if (!vm.isLogin) {
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			})
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			setTimeout(() => {
				uni.navigateTo({
					url: `/pages/login/login-account?redirect=/${currentPage.route}`
				})
			}, 500)
			return false
		}
		uni.navigateTo({
			url: url
		})
	}

	// URL参数转对象
	const paramsToObj = (url) => {
		if (url.indexOf('?') != -1) {
			let arr = url.split('?')[1]
		}
		let arr = url.split('&')
		let obj = {}
		for (let i of arr) {
			obj[i.split('=')[0]] = i.split('=')[1]
		}
		return obj
	}

	// 刷新当前页面
	const refreshPage = () => {
		const pages = getCurrentPages()
		const currentPage = pages[pages.length - 1]
		const path = '/' + currentPage.route + vm.$u.queryParams(currentPage.options)
		if (vm.$u.test.contains(currentPage.route, 'tabbar')) {
			uni.reLaunch({
				url: path,
				fail: (err) => {
					console.log(err)
				}
			})
		} else {
			uni.redirectTo({
				url: path,
				fail: (err) => {
					console.log(err)
				}
			})
		}
	}

	// 提示
	const showToast = (data = {}) => {
		if (typeof data == 'string') {
			uni.showToast({
				title: data,
				icon: 'none'
			})
		} else {
			uni.showToast({
				title: data.title,
				icon: data.icon || 'none',
				image: data.image || '',
				mask: data.mask || false,
				position: data.position || 'center',
				duration: data.duration || 1500,
				success: () => {
					setTimeout(() => {
						if (data.back) return uni.navigateBack()
						data.success && data.success()
					}, data.duration || 1500)
				}
			})
		}
	}

	// 刷新token
	const refreshToken = (data) => {
		return new Promise((resolve) => {
			vm.$u.vuex('token', data.access_token)
			vm.$u.vuex('refreshToken', data.refresh_token)
			resolve(data)
		})
	}
	/**
	 * 更新用户信息
	 * @return {Promise<Object>} userInfo
	 */
	const updateUserInfo = (param, showSuccessMessage) =>{
		return new Promise(async resolve => {
			let userInfo = {}
			const res = await user.update(param)
			if(res.code === 200){
				showSuccessMessage && uni.showToast({
					title: res.msg
				})
				const info = await user.detail({id: param.id})
				userInfo = info.data
				vm.$u.vuex('userInfo', userInfo)
			}
			resolve(userInfo)
		})
	}
	
	// 将定义的方法挂载，使用this.$u.func.xx调用
	Vue.prototype.$u.func = {
		login,
		logout,
		route,
		checkLogin,
		paramsToObj,
		refreshPage,
		showToast,
		refreshToken,
		saveToken,
		updateUserInfo
	}
}
export default {
	install
}
