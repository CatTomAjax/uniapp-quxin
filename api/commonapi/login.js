import { request } from '@/common/request.js'

export const login = {
	// 账户密码输入
	account(params){
		return request(`/blade-auth/oauth/token`,'post',params,true,false,'application/x-www-form-urlencoded')
	},
	/**
	 * 微信小程序自动登录注册
	 * @param {string} code
	 * @link http://175.178.88.155:9340/doc.html#/%E7%B3%BB%E7%BB%9F%E6%A8%A1%E5%9D%97/%E7%94%A8%E6%88%B7/doWxLoginUsingGET
	 */
	wxLogin(code){
		return request(`/blade-system/user/wxLogin`,'get', {code},true, false,'application/x-www-form-urlencoded')
	},
	/**
	 * 新增/修改 用户
	 * @param {Object} params
	 * @link http://175.178.88.155:9340/doc.html#/%E7%B3%BB%E7%BB%9F%E6%A8%A1%E5%9D%97/%E7%94%A8%E6%88%B7/submitUsingPOST_21
	 */
	submit(params){
		return request(`/blade-system/user/submit`,'post',params,true,false,'application/json')
	},
	/**
	 * 微信小程序获取手机号
	 * @param {string} code
	 * @link http://175.178.88.155:9340/doc.html#/%E7%B3%BB%E7%BB%9F%E6%A8%A1%E5%9D%97/%E7%94%A8%E6%88%B7/getPhoneNumberUsingGET
	 */
	getPhoneNumber(code){
		return request(`/blade-system/user/getPhoneNumber`,'get',{code},true,false,'application/x-www-form-urlencoded')
	},
}

