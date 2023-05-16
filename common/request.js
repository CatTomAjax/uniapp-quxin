let apiHost

apiHost = `http://175.178.88.155:9340`
import { cleanToken, getDefHeader, getToken } from '../utils/global-utils';
let showLoginModal = false
module.exports = {
	apiHost,
	/**
	 * 网络请求封装
	 * @param {string} url 请求地址
	 * @param {'get' | 'post' | 'put' | 'delete'} method 请求方法，默认 get
	 * @param {any} options 请求体，请求参数等，默认 {}
	 * @param {boolean} needLogin 是否需要登录，默认 true
	 * @param {boolean}  showLoading  是否需要弹窗提示  默认 true
	 *
	 */
	request(url, method = 'get', options = {}, needLogin = true, showLoading = true , ContentType) {
		let header = {};
		let dataType = null
		if (needLogin) {
			header['Blade-Auth'] = 'bearer ' + getToken()
			header['Authorization'] = `Basic c3dvcmQ6c3dvcmRfc2VjcmV0`
			header['Tenant-Id'] = `000000`
			// header = {...getDefHeader(), ...header}
		}

		if (ContentType){
			header['Content-Type'] = ContentType
		}
		return new Promise((resolve) => {
			showLoading && (uni.showLoading({
				title: '加载中...',
			}))
			uni.request({
				url: `${apiHost}${url}`,
				method: method,
				data: options,
				header: header,
				sslVerify: false,
				withCredentials: true,
				success: res => {
					showLoading && uni.hideLoading()
					// console.log("请求结果===",res)
					if (res.statusCode === 200) {
						showLoading && uni.hideLoading()
						if (res.data.code === 200) {
							resolve(res.data)
						}else{
							resolve(res.data)
						}
					} else {
						if (res.data.code === 401) {
							cleanToken()
							// 防止多个接口同时显示多次登录弹窗
							// if(!showLoginModal){
							// 	showLoginModal = true
							// 	uni.showModal({
							// 		title: "温馨提示",
							// 		content: "登录已过期，请重新登录！",
							// 		success(resq) {
							// 			if (resq.confirm) {
							// 				uni.navigateTo({
							// 					url: "/pages/login/login-account"
							// 				})
							// 			}
							// 		},
							// 		complete(){
							// 			showLoginModal = false
							// 		}
							// 	})								
							// }
						} else {
							wx.showToast({
								title: '系统异常',
								icon: 'none',
								duration: 3000
							})
						}
					}
				},
				fail: err => {
					console.log(err)
					showLoading && uni.hideLoading()
					wx.showToast({
						title: '网络异常，请检查网络',
						icon: 'none',
						duration: 3000
					})
				}
			})
		}).catch((e)=>{})
	}
}
