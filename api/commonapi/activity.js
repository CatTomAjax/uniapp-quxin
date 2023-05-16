import { request } from '@/common/request.js'

export const activity = {
	// 新增活动
	save(params, ContentType){
		return request(`/blade-business/activity/save`,'post',params,true,false,ContentType)
	},
	
	// 活动详情
	detail(params){
		return request(`/blade-business/activity/detail`,'get',params)
	},
	// 活动列表
	list(params){
		return request(`/blade-business/activity/list`,'get',params)
	},
	
	// 活动列表
	page(params){
		return request(`/blade-business/activity/page`,'get',params)
	},
	
}

