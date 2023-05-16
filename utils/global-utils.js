import store from "../store"

/**
 * 获取token
 * @param {Vue} vm
 */
export const getToken = (vm)=>{
	if(vm){
		return vm.$store.state.token || ''
	}
	return uni.getStorageSync('token').content || ''
}
/**
 * 清除token
 */
export const cleanToken = () =>{
	uni.removeStorageSync('token')
	store.commit('$uStore', {
		name: 'token',
		value: ''
	})
	store.commit('$uStore', {
		name: 'isLogin',
		value: false
	})
	store.commit('$uStore', {
		name: 'refreshToken',
		value: ''
	})
}

export const getDefHeader = ()=>{
	return {
		Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
		'Tenant-Id': '000000',
		'Blade-Auth': `bearer ${getToken()}`
	}
}