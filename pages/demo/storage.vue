<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward"
			back-icon-color="#fff" back-icon-size="35" :background="{ background: 'linear-gradient(90deg, #69b0ff, #5f88ff)' }" title="Storage 操作"
			title-color="#fff">
		</u-navbar>
		<view class="u-demo">
			<view class="u-demo-wrap">
				<view class="u-demo-title">演示效果</view>
				<view class="u-demo-area u-flex u-row-center">
					[ BladeX ] 的官网为：{{domain}}
				</view>
			</view>
			<view class="u-config-wrap">
				<view class="u-config-title u-border-bottom">参数操作</view>
				<view class="u-config-item">
					<view class="u-item-title">按钮点击</view>
					<u-button @click="modifyStorage">修改变量</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				domain: ''
			}
		},
		onLoad() {
			this.domain = uni.getStorageSync('domain');
		},
		methods: {
			modifyStorage() {
				uni.setStorageSync('domain', 'https://bladex.vip');
				this.domain = uni.getStorageSync('domain');
			}
		},
	}
</script>
