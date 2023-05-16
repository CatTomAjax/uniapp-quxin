import {
	clientId,
	clientSecret
} from '@/common/setting'
import {
	options
} from '@/http/config.js';
import {
	Base64
} from '@/utils/base64.js';
import Request from '@/utils/luch-request/index.js';
import { getToken } from '../utils/global-utils';
const http = new Request(options);
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	// 假设有token值需要在头部需要携带
	let token = getToken();
	if (token) {
		config.header['Blade-Auth'] = 'bearer ' + token;
	}
	// 客户端认证参数
	config.header['Authorization'] = 'Basic ' + Base64.encode(clientId + ':' + clientSecret);
	
	// #ifndef H5
	let url = config.url
	if (process.env.NODE_ENV == 'development' && !url.startsWith("http")) {
		url = url.substring(url.indexOf('/api') + 4)
		config.url = url
	}
	// #endif

	// 额外参数
	// config.data = config.data || {};
	// config.data.pf = uni.getSystemInfoSync().platform;
	// config.data.sys = uni.getSystemInfoSync().system;

	// 演示custom 用处
	// if (config.custom.auth) {
	//   config.header.token = 'token'
	// }
	// if (config.custom.loading) {
	//  uni.showLoading()
	// }
	/**
	 /* 演示
	 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	    return Promise.reject(config)
	  }
	 **/
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})
http.interceptors.response.use((response) => {
	// 若有数据返回则通过
	if (response.data.access_token || response.data.key) {
		return response.data
	}
	// 服务端返回的状态码不等于200，则reject()
	if (response.data.code !== 200) {
		uni.showToast({
			title: response.data.msg,
			icon: 'none'
		});
		return Promise.reject(response);
	}
	return response.data;
}, (response) => {
	/*  对响应错误做点什么 （statusCode !== 200）*/
	uni.showToast({
		title: response.data.msg,
		icon: 'none'
	});
	if (response.statusCode == 401) {
		// const pages = getCurrentPages()
		// const currentPage = pages[pages.length - 1]
		// uni.redirectTo({
		// 	url: `/pages/login/login-account?redirect=/${currentPage.route}`
		// })
	}
	return Promise.reject(response)
})
export default http;
