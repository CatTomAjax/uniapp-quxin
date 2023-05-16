<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward"
			back-icon-color="#fff" back-icon-size="35" :background="{ background: 'linear-gradient(90deg, #69b0ff, #5f88ff)' }" title="CRUD 操作"
			title-color="#fff">
		</u-navbar>
		<view class="u-demo">
			<view class="u-demo-wrap">
				<view class="u-demo-title">很快到来</view>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				data: {}
			};
		},
	}
</script>