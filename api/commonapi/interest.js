import { request } from '@/common/request.js'

export const interest = {
	// 获取用户兴趣列表 --- 用户
	privateList(params){
		return request(`/blade-business/myfunuser/list`,'get',params)
	},
	// 获取用户兴趣列表 --- 用户
	interestPage(params){
		return request(`/blade-business/myfunuser/page`,'get',params)
	},
	// 新增我的兴趣 ----用户
	privateAdd(params){
		return request(`/blade-business/myfunuser/save`,'post',params)
	},
	// 删除我的兴趣
	myfunuserRemove(params){
		return request(`/blade-business/myfunuser/remove`,'post',params, true, true, 'application/x-www-form-urlencoded')
	},
	
	/* 
	兴趣类型基础表
	 */
	// 查询兴趣基础表数据列表
	baseList(params){
		return request(`/blade-business/myfunbase/list`,'get',params)
	},
	
}

