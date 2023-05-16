<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward"
			back-icon-size="35" :background="{ background: '#fff' }" title="设置" title-color="#000">
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
