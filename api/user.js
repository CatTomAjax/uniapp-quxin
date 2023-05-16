import http from '@/http/api.js'

// 获取token
const token = (tenantId, username, password, type) => {
	return http.request({
		url: '/api/blade-auth/oauth/token',
		method: 'POST',
		header: {
			'Tenant-Id': tenantId
		},
		params: {
			tenantId,
			username,
			password,
			grant_type: "password",
			scope: "all",
			type
		}
	})
}

const refreshToken = (refresh_token, tenantId) => {
	return http.request({
		url: '/api/blade-auth/oauth/token',
		method: 'post',
		headers: {
			'Tenant-Id': tenantId
		},
		params: {
			tenantId,
			refresh_token,
			grant_type: "refresh_token",
			scope: "all",
		}
	})
}

// 获取用户信息
const userInfo = () => {
	return http.request({
		url: '/api/blade-user/info',
		method: 'GET',
	})
}

// 获取用户信息
export const getUser = (id) => {
	return http.request({
		url: '/api/blade-user/detail',
		method: 'GET',
		params: { id }
	})
}


export default {
	token,
	userInfo,
	refreshToken
}
