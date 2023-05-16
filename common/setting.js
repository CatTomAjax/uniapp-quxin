/**
 * 全局变量配置
 */
module.exports = {
	// 应用名
	name: 'Rider',
	// 应用logo，支持本地路径和网络路径
	logo: '/static/images/logo.png',
	// 版本号
	version: '2.0.0',
	// 开发环境接口Url
	// #ifdef H5
	devUrl: '',
	// #endif
	// #ifndef H5
	devUrl: 'http://127.0.0.1',
	// #endif
	// 线上环境接口Url
	prodUrl: 'https://rider.bladex.vip',
	// 后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
	contentType: 'application/json;charset=UTF-8',
	// 后端返回状态码
	codeName: 'code',
	// 操作正常code
	successCode: 200,
	// 登录失效code
	invalidCode: 401,
	// 客户端ID
	clientId: 'rider',
	// 客户端密钥
	clientSecret: 'rider_secret',
	// token过期时间
	tokenTime: 3000,
}
