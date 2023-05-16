import { request } from '@/common/request.js'

export const common = {
	/**
	 * 云附件上传
	 * @param {{
		 files: Array<formData>,
		 id: string|number
	 }} payload
	 @link http://175.178.88.155:9340/doc.html#/%E7%B3%BB%E7%BB%9F%E6%A8%A1%E5%9D%97/%E9%99%84%E4%BB%B6/uploadUsingPOST
	 */
	uploadFiles(payload){
		return request(`/blade-resource/attach/upload`,'post',payload,true,false,'application/form-data')
	},
	/**
	 * 新增用户选择地址
	 * @param {Object} payload
	 * @link http://175.178.88.155:9340/doc.html#/%E4%B8%9A%E5%8A%A1%E6%A8%A1%E5%9D%97/%E7%94%A8%E6%88%B7%E5%9C%B0%E5%9D%80%E5%85%B3%E8%81%94%E8%A1%A8%E6%8E%A5%E5%8F%A3/saveUsingPOST_1
	 */
	saveAddress(payload){
		return request(`/blade-business/address/save`,'post',payload,true,false,'application/json')
	},
	/**
	 * 用户历史选择的地址分页
	 * @param {Object} payload
	 * @link http://175.178.88.155:9340/doc.html#/%E4%B8%9A%E5%8A%A1%E6%A8%A1%E5%9D%97/%E7%94%A8%E6%88%B7%E5%9C%B0%E5%9D%80%E5%85%B3%E8%81%94%E8%A1%A8%E6%8E%A5%E5%8F%A3/listUsingGET_1
	 */
	addressList(payload){
		return request(`/blade-business/address/list`,'get',payload,true,false,'application/x-www-form-urlencoded')
	},
}


