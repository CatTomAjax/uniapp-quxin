<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward"
			back-icon-color="#fff" back-icon-size="35" :background="{ background: 'linear-gradient(90deg, #69b0ff, #5f88ff)' }" title="Mock 调用"
			title-color="#fff">
		</u-navbar>
		<view class="u-demo">
			<view class="u-demo-wrap">
				<view class="u-demo-title">演示效果</view>
				<view class="u-demo-area u-flex u-row-center">
					数据为：{{data}}
				</view>
			</view>
			<view class="u-config-wrap">
				<view class="u-config-title u-border-bottom">参数操作</view>
				<view class="u-config-item">
					<view class="u-item-title">按钮点击</view>
					<u-button @click="doRequest">获取数据</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		fakeBannerList
	} from "@/api/mock/home.js";
	export default {
		data() {
			return {
				data: {}
			};
		},
		methods: {
			doRequest() {
				let keyword = "";
				fakeBannerList().then(data => {
					this.data = data;
					this.$u.func.showToast({
						title: '数据获取成功',
					})
				}).catch(() => {

				})
			}
		},
	}
</script>
