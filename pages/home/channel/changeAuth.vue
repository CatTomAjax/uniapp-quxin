<template>
	<view>
		<view class="tit fc-8c fs-28">公开范围</view>
		<view class="section">
			<view class="row align-center justify-between" v-for="item in openConf" :key="item.id"  @click="doSelect(item)">
				<view class="label">{{item.label}}</view>
				<view class="val" v-if="item.active"><u-icon name="checkbox-mark" size="30" color="#8A68F4"></u-icon></view>
			</view>
		</view>
		<view class="tit fc-8c fs-28">分享与下载</view>
		<view class="section">
			<view class="row align-center justify-between" v-for="item in contentConf" :key="item.id">
				<view class="label">{{item.label}}</view>
				<view class="val">
					<u-switch v-model="item.active" activeColor="#8A68F4" size="30">
						
					</u-switch>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 权限设置
	export default {
		name: 'ChangeAuth',
		data(){
			return {
				openConf: [
					{id: 0, label: '仅自己可见', active: !0},
					{id: 1, label: '仅好友可见', active: !1},
					{id: 2, label: '广场公开可见', active: !1}
				],
				contentConf: [
					{id: 0, label: '禁止转发分享', active: !0},
					{id: 1, label: '禁止下载保存', active: !1}
				]
			}
		},
		methods: {
			doSelect(data){
				this.openConf.map(item => item.active = item.id === data.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tit{
		padding: 50rpx 0 43rpx 86rpx;
	}
	.section{
		margin:0 36rpx;
		border-radius: 26rpx;
		background-color: #fff;
		padding: 0 40rpx 0 50rpx;
		.row{
			border-bottom: 1rpx dashed #EFEFEF;
			height: 120rpx;
			&:last-child{
				border-bottom: 0;
			}
		}
	}
	
</style>