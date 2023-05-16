import { request } from '@/common/request.js'

export const user = {
	// 查看用户详情
	detail(params){
		return request(`/blade-system/user/info`,'get',params, true, false, 'application/x-www-form-urlencoded')
	},
	
	// 获取用户列表
	list(params){
		return request(`/blade-system/user/list`,'get',params, true)
	},
	// 修改用户信息
	update(params){
		return request(`/blade-system/user/update`,'post',params, true)
	},
}

