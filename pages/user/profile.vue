<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward" title="个人资料"
			back-icon-size="35" :background="{ background: '#fff' }" title-color="#000">
			<view class="complie" slot="right" @click="submit">完成</view>
		</u-navbar>

		<view class="content">
			<view class="avatar">
				<image :src="userInfo.avatar" class="avatar-image" mode=""></image>
				<view class="a" @click="handleChooseImg">更换头像</view>
			</view>
			<view class="form">
				<view class="cell">
					<view class="name">昵称</view>
					<input type="text" placeholder="请输入昵称" v-model="userInfo.nick_name" class="ipt"
						placeholder-class="hold" />
				</view>
				<view class="cell">
					<view class="name">生日</view>
					<picker mode="date" class="ipt" :class="{ hold: !detail.birthday }"
						@change="changeDefaultPicker('birthday', $event)">
						<view>{{ detail.birthday || '请选择生日' }}</view>
					</picker>
				</view>
				<view class="cell">
					<view class="name">性别</view>
					<picker mode="selector" :range="sexPicker" range-key="name" class="ipt"
						:class="{ hold: !detail.sex }" @change="changePicker('sex', $event)">
						<view>{{ detail.sex === 1?'男':'女' || '请选择性别' }}</view>
					</picker>
				</view>
				<view class="cell">
					<view class="name">手机号</view>
					<input type="number" placeholder="请填写手机号" v-model="detail.phone" class="ipt"
						placeholder-class="hold" />
				</view>
				<view class="cell">
					<view class="name">邮箱</view>
					<input v-model="detail.email" class="ipt" placeholder-class="hold" />
				</view>
				<!--<view class="cell">
					<view class="name">国家/地区</view>
					<pickRegions :defaultRegion="detail.region" v-model="detail.region"
						:class="{ hold: !detail.region, ipt: true }">
						<view>{{ detail.region || '请选择国家/地区' }}</view>
					</pickRegions>
				</view>-->
			</view>
		</view>
		<!--  -->
		<view class="back" @click="logout">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexPicker: [{
						name: '男'
					},
					{
						name: '女'
					}
				],
				detail: {}
			};
		},
		onLoad() {
			this.$u.api.userInfo().then(data => {
				console.log(data);
				if (data.success) {
					this.detail = data.data;
				}
			}).catch(err => {
				console.log(err)
				this.$u.func.showToast({
					title: err,
				})
			})
		},
		methods: {
			logout() {
				this.$u.func.logout();
			},
			submit() {
				let detail = this.detail
				if (!detail.phone && !/^1\d{10}$/.test(detail.phone)) {
					return uni.showToast({
						title: '请输入正确的手机号',
						duration: 2000,
						icon: 'none'
					});
				}
				console.log(JSON.stringify(detail));
			},
			changeDefaultPicker(name, e) {
				this.detail[name] = e.detail.value;
			},
			changePicker(name, e) {
				this.detail[name] = this[`${name}Picker`][e.detail.value].name;
			},
			handleChooseImg() {
				let that = this;
				uni.chooseImage({
					count: 1,
					success(e) {
						that.detail.avatar = e.tempFilePaths[0];
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.container {
		background-color: #f7f7f7;
		min-height: 100vh;
		padding: 0 0 200rpx;
		overflow: hidden;
	}

	.complie {
		vertical-align: middle;
		padding: 10rpx 20rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #5f88ff;
	}

	.content {
		background-color: #ffffff;
		overflow: hidden;
	}

	.avatar {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #5f88ff;
		.avatar-image {
			width: 162rpx;
			height: 162rpx;
			background: #ffffff;
			border-radius: 50%;
			background-color: #82848a;
			margin-bottom: 15rpx;
		}
	}

	.form {
		padding: 0 36rpx;

		.cell {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 40rpx 0;

			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #666666;

			&:not(:last-of-type) {
				border-bottom: 2rpx solid #efefef;
			}

			.ipt {
				flex: 1;
				margin-left: 40rpx;
				text-align: right;
				font-size: 23rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #333333;
			}

			.hold {
				font-size: 27rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #c8c8ce;
			}
		}
	}

	.back {
		margin-top: 40rpx;
		text-align: center;
		height: 109rpx;
		background: #ffffff;

		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #141414;
		line-height: 109rpx;
	}
</style>
