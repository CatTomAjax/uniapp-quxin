<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward"
			back-icon-color="#fff" back-icon-size="35" :background="{ background: 'linear-gradient(90deg, #69b0ff, #5f88ff)' }" title="API 请求"
			title-color="#fff">
		</u-navbar>
		<view class="u-demo">
			<view class="u-demo-wrap">
				<view class="u-demo-title">演示效果</view>
				<view class="u-demo-area u-flex u-row-center">
					<u-image width="300rpx" height="100rpx" :src="url"></u-image>
				</view>
			</view>
			<view class="u-config-wßrap">
				<view class="u-config-title u-border-bottom">参数操作</view>
				<view class="u-config-item">
					<view class="u-item-title">按钮点击</view>
					<u-button @click="doRequest">刷新验证码</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			};
		},
		methods: {
			doRequest() {
				let keyword = "";
				// 自动挂载至this.$u.api,无需引入
				// captcha 在 /api/demo.js 内定义
				this.$u.api.captcha().then(data => {
					this.url = data.image;
					this.$u.func.showToast({
						title: '数据获取成功',
					})
				}).catch(() => {

				})
			}
		},
	}
</script>
