import { request } from '@/common/request.js'

export const index = {
	// 请求
	getList(params){
		return request(`/url`,'post',params)
	},
}
