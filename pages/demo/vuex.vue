<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward"
			back-icon-color="#fff" back-icon-size="35" :background="{ background: 'linear-gradient(90deg, #69b0ff, #5f88ff)' }" title="Vuex 操作"
			title-color="#fff">
		</u-navbar>
		<view class="u-demo">
			<view class="u-demo-wrap">
				<view class="u-demo-title">演示效果</view>
				<view class="u-demo-area u-flex u-row-center">
					<!-- vuex已做过封装，可以直接使用state内的变量 -->
					版本号为：{{version}}
				</view>
				<view class="u-demo-area u-flex u-row-center">
					[ BladeX ] 的作者为：{{userInfo.nickName}}
				</view>
			</view>
			<view class="u-config-wrap">
				<view class="u-config-title u-border-bottom">参数操作</view>
				<view class="u-config-item">
					<view class="u-item-title">按钮点击</view>
					<u-button @click="modifyVuex">修改变量</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			// vuex已做过封装，可以直接this.$u.vuex(key, value)修改，无需引入
			modifyVuex() {
				// version不在lifeData，每次刷新会丢失
				this.$u.vuex('version', '1.0.1');
				// userInfo在lifeData，刷新重启会保留
				this.$u.vuex('userInfo.nickName', '翼');
			}
		},
	}
</script>
