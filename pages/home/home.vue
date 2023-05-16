<template>
	<!-- 项目首页 -->
	<view class="container flex-col">
		<!-- 头部 s -->
		<view class="block_1 flex-row">
			<view class="single-avatar_1 flex-col" @click="goUserCenter">
				<image class="avatar" :src="userInfo.avatar" mode=""></image>
			</view>
			<view class="section_2 flex-col justify-between">
				<view class="image-text_1 flex-row">
					<text class="text-group_1">{{userInfo.account}}</text>
					<view class="icon_1 flex-col"></view>
				</view>
				<view class="image-text_2 flex-row" @click="updateUser">
					<image class="icon_2" referrerpolicy="no-referrer" src="../../static/images/home/position.png" />
					<text class="text-group_2">{{userInfo.userLocation || '暂无地址'}}</text>
				</view>
			</view>
			<view class="icon_3 flex-col" @click="goChannelOrAddInterset"></view>
		</view>
		<!-- 头部 e -->
		<!-- 我的兴趣 s -->
		<view class="my-interest">
			<view class="title">
				<view class="title-text title-text_1 align-center">我的兴趣<text class="count fs-24 fc-white">99+</text></view>
				<view class="title-text title-text_2 fs-26">MY INTERESTS</view>
			</view>
			<block v-if="interestList.length">
				<view class="wrap">
					<swiper class="swiper-box" vertical previous-margin="279rpx" next-margin="376rpx"  @change="onChange" :current="current">
						<swiper-item v-for="(item, index) in interestList" :key="item.id" :index="index" :class="['swiper-item', {current: index === currentIndex, current_pre: index === currentIndex - 1, current_next: index === currentIndex + 1}]">
							<view class="item"  @click="handleInterestDetail(item.id, item.myfun)">
								<view class="badge fs-24 fc-white">99+</view>
								<view class="top flex-row align-center">
									<view class="no align-center justify-center">{{index + 1}}</view>
									<view class="date flex-col fs-24 justify-center">
										<view>加入时间</view>
										<view>2023/3/12<text>12:00</text></view>
									</view>
								</view>
								<view class="middle flex-row">
									<view class="label">{{item.myfun}}</view>
									<view class="ul flex-row">
										<view class="li">
											<image src="../../static/images/home/tag-1.png" class="tag"
											/>
											<text class="text fs-24">123</text>
										</view>
										<view class="li">
											<image src="../../static/images/home/tag-2.png" class="tag"
											/>
											<text class="text fs-24">123</text>
										</view>
										<view class="li">
											<image src="../../static/images/home/tag-3.png" class="tag"
											/>
											<text class="text fs-24">123</text>
										</view>
									</view>
								</view>
								<view class="bottom justify-center align-center">
									<uni-icons type="left" color="#fff" class="icon"></uni-icons>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="indicator-dots">
					<view class="dots">
						<view :class="['dot', {current: i === currentIndex}]" v-for="(item, i) in interestList" :key="i"></view>
					</view>
					<view class="text">
						<text class="text-1">{{currentIndex + 1}}</text>/<text class="text-2">{{interestList.length}}</text>
					</view>
				</view>
			</block>
			<!-- 没有兴趣 -->
			<block v-else>
				<view class="empty-interest">
					<image src="../../static/images/logo.png" class="img"></image>
				</view>
			</block>
		</view>
		<!-- 我的兴趣 e -->
		<!-- footer 按钮 -->
		<view class="footer" :class="[{'footer-2': !interestList.length}]">
			<view class="group_2 flex-row" @click="addInterest">
				<view class="image-text_3 flex-col justify-between">
					<image class="icon_5"
						src="../../static/images/home/plus.png" />
					<text class="text-group_3">添加兴趣</text>
				</view>
			</view>
			<view class="group_2 group_3 flex-row"  @click="goAdopt">
				<view class="image-text_3 flex-col justify-between">
					<image class="icon_5"
						src="../../static/images/home/heart.png" />
					<text class="text-group_3">公益兴趣</text>
				</view>
			</view>
		</view>
		<Welcome ref="welcomeRef"/>
	</view>
</template>
<script>
	import {
		interest
	} from '@/api/commonapi/interest.js'
	import {
		user
	} from '@/api/commonapi/user.js'
import { ChannelTabbarTypeEnum } from '../../constant/channel'
	import Welcome from '@/components/welcome/welcome.vue'
import { HasShowGudieKey } from '@/constant/global'
	export default {
		components: {Welcome},
		data() {
			return {
				interestList: [], // 我得兴趣
				// userInfo: {}, // 用户信息
				queryParams: {
					current: 1,
					size: 999,
					userId: 0
				},
				total: 0,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				currentIndex: 0,
				current: 0
			}
		},
		onShow() {
			this.getUserInterest(true)
		},
		onLoad() {
			this.initWelcome()
		},
		onReachBottom() {},
		methods: {
			// 显示欢迎弹窗
			initWelcome(){
				const res = uni.getStorageSync(HasShowGudieKey)
				if(!res && this.userInfo.id){
					this.$refs.welcomeRef.doOpen()
				}
			},
			// 获取用户兴趣列表
			getUserInterest(refresh) {
				this.queryParams.userId = this.userInfo.id
				if(!this.queryParams.userId) return
				const currentId = this.interestList[this.currentIndex] ? this.interestList[this.currentIndex].id : null
				if (refresh) {
					this.queryParams.current = 1
					this.interestList = []
				}
				interest.privateList(this.queryParams).then(res => {
					if (res.code === 200) {
						this.interestList = [...this.interestList, ...res.data.records]
						if(refresh && currentId !== null){
							this.current = this.interestList.findIndex(item => item.id === currentId)
						}
						this.total = res.data.total
					}
				})
			},
			scrolltolower() {
				let query = this.queryParams
				if (query.current * query.size >= this.total) {
					wx.showToast({
						title: '没有更多数据了',
						icon: 'none',
						duration: 1000
					});
					setTimeout(() => {
						wx.hideLoading()
					}, 500)
				} else {
					if (query.current <= query.current - 1) {
						setTimeout(() => {
							wx.hideLoading()
						}, 500)
					} else {
						wx.showLoading({
							title: '加载中'
						});
						query.current = query.current + 1
						this.queryParams = query
						this.getUserInterest(true)
					}
				}
			},
			// 添加兴趣
			addInterest() {
				uni.navigateTo({
					url: '/pages/home/interest/index'
				})
			},
			// 跳转公益引导页
			goAdopt(){
				const {id, myfun} = this.interestList[this.currentIndex] || {id: -1, myfun: ''}
				uni.navigateTo({
					url: '/pages/home/adopt/guide?interest=' + JSON.stringify({
						id,
						myfun
					})
				})
			},
			// 兴趣看看页
			handleInterestDetail(id, myfun) {
				uni.navigateTo({
					url: '/pages/home/lookInterest/index?interest=' + JSON.stringify({
						id,
						myfun
					})
				})
			},
			deleteMyfun(index, index1) {
				let that = this
				if (index1 == 0) {
					uni.showModal({
						title: '提示',
						content: '确认删除兴趣' + this.interestList[index].myfun + '吗？',
						success: function(e) {
							if (e.confirm) {
								interest.myfunuserRemove({
									ids: that.interestList[index].id
								}).then(res => {
									if (res.code === 200) {
										uni.showToast({
											title: res.msg,
										})
										that.getUserInterest(true)
									}
								})
							} else if (e.cancel) {

							}
						}
					})
				}
			},
			// 修改用户地址
			updateUser() {
				uni.chooseLocation({
					success: (e) => {
						let params = {
							id: this.userInfo.id,
							deptId: this.userInfo.deptId,
							latitude: e.latitude,
							longitude: e.longitude,
							userLocation: e.name
						}
						if (e.name) {
							this.$u.func.updateUserInfo(params, !0)
						}

					}
				})

			},
			// 挑战个人中心
			goUserCenter(){
				uni.navigateTo({
					url: '/pages/user/center'
				})
			},
			// 兴趣滑动回调
			onChange(e){
				this.currentIndex = e.detail.current
			},
			// 跳转频道页
			goChannel(){
				const currentInterest = this.interestList[this.currentIndex]
				uni.navigateTo({
					url: `/pages/home/channel/index?page=${ChannelTabbarTypeEnum.chat}&interest=${JSON.stringify({
						id: currentInterest.id,
						myfun: currentInterest.myfun
					})}`
				})
			},
			// 跳转频道或者添加兴趣页面
			goChannelOrAddInterset(){
				if(!this.interestList.length){
					// 没有兴趣，跳转到添加兴趣页面
					this.addInterest()
				}else{
					this.goChannel()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		overflow: hidden;
		height: 100vh;
		
	}

	.block_1 {
		box-shadow: 0px 3px 13px 0px rgba(166, 155, 186, 0.18);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 25rpx;
		width: 677rpx;
		height: 159rpx;
		margin: 25rpx 0 0 40rpx;

		.single-avatar_1 {
			border-radius: 50%;
			width: 117rpx;
			height: 117rpx;
			margin: 21rpx 0 0 35rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.section_2 {
			width: 397rpx;
			height: 73rpx;
			margin: 50rpx 0 0 25rpx;
			overflow: hidden;
			.image-text_1 {
				height: 29rpx;
				.text-group_1 {
					max-width: 300rpx;
					height: 29rpx;
					color: #24223c;
					font-size: 29rpx;
					font-weight: bold;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 29rpx;
					}
				}

				.icon_1 {
					width: 28rpx;
					height: 26rpx;
					background: url("../../static/images/home/certified.png") 100% no-repeat;
					background-size: 100% 100%;
					margin-top: 1rpx;
					margin-left: 12rpx;
				}
			}

			.image-text_2 {
				height: 24rpx;
				margin-top: 20rpx;
				overflow: hidden;

				.icon_2 {
					width: 18rpx;
					height: 19rpx;
					margin-top: 1rpx;
					flex-shrink: 0;
					margin-right: 10rpx;
				}

				.text-group_2 {
					flex: 1;
					height: 24rpx;
					margin-right: 5rpx;
					color: rgba(140, 140, 140, 1);
					font-size: 23rpx;
					white-space: nowrap;
					line-height: 23rpx;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
		}

		.icon_3 {
			width: 64rpx;
			height: 64rpx;
			background: url("../../static/images/home/wx.png") 100% no-repeat;
			background-size: 100% 100%;
			margin: 50rpx 38rpx 0 0;	
		}



	.header {
		height: 10vh;

		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
		}

		.icon {
			width: 30rpx;
			height: 30rpx;
		}

		.right-icon {
			width: 60rpx;
			height: 60rpx;
			display: block;
		}
	}

	// 我得兴趣
	.my-interest {
		// height: 1202.51rpx;
		flex: 1;
		box-sizing: border-box;
		margin-top: 49.13rpx;
		overflow: hidden;
		position: relative;
		display: flex;
		.title{
			position: absolute;
			left: 40rpx;
			top: 0;
			font-size: 46rpx;
			&-text{
				position: relative;
				font-weight: bold;
				&_1{
					.count{
						background-color: #F25259;
						border-radius: 1000px;
						height: 36rpx;
						line-height: 36rpx;
						min-width: 62.17rpx;
						text-align: center;
						margin-left: 6.02rpx;
					}
				}
				&_2{
					font-weight: normal;
				}
			}
		}
		.wrap{
			position: relative;
			padding-left: 132.35rpx;
			flex: 1;
			align-items: center;
			display: flex;
			.swiper-box{
				// height: 595.59rpx;
				height: 1200.6rpx;
				width: 100%;
			}
			.swiper-item{
				overflow: visible;
				&.current{
					z-index: 2;
					.item{
						opacity: 1;
						background-color: rgba(0,0,0,.9);
						.middle{
							color: #fff;
							.li{
								background: #3a3a3a;
								.text{
									color: #D6F389;
								}
							}
						}						
					}
				}
				&.current_pre{
					z-index: 1;
					.item{
						opacity: 1;
						transform: translate(84px, 151px) rotate(15deg);
						background-color: #D6F389;
						.top .date{
							color: #626262;
						}
					}
				}
				&.current_next{
					z-index: 1;
					.item{
						opacity: 1;
						transform: translate(176rpx, -179rpx) rotate(-19deg);
						background-color: #8A68F4;
						.top .date{
							color: #000;
						}
					}
				}
			}
			.item{
				position: relative;
				width: 750rpx;
				// height: 595.59rpx;
				height: 545.59rpx;
				border-radius: 80rpx;
				box-sizing: border-box;
				background-color: #000;
				padding: 79rpx 50rpx 50rpx;
				opacity: 0;
				transition: all .2s linear;
				.badge{
					position: absolute;
					left: 83rpx;
					top: -10rpx;
					width: 55.15rpx;
					height: 60.16rpx;
					background: url("../../static/images/home/badge.png") no-repeat center top;
					background-size: 100% 100%;
					text-align: center;
					line-height: 46rpx;
				}
				.top{
					margin-bottom: 42rpx;
					.no{
						width: 118rpx;
						height: 118rpx;
						border-radius: 50%;
						background-color: #000;
						color: #fff;
						text-align: center;
						font-size: 60rpx;
						font-weight: bold;
						margin-right: 26rpx;
					}
					.date{
						height: 118rpx;
						color: #626262;
					}
				}
				.middle{
					color: #000;
					.label{
						font-size: 50rpx;
						font-weight: bold;
						margin-right: 55rpx;
					}
					.li{
						width: 95rpx;
						height: 121rpx;
						background: rgba(0,0,0,.3);
						border-radius: 33rpx;
						text-align: center;
						margin-right: 26rpx;
						.tag{
							width: 35rpx;
							height: 35rpx;
							display: block;
							margin: 23rpx auto 17rpx;
						}
						.text{
							color: #000;
						}
					}
				}
				.bottom{
					margin-top: 63rpx;
					width: 121rpx;
					height: 95rpx;
					background-color: #333;
					border-radius: 33rpx;
					.icon{
						
						animation: left .6s linear infinite;
					}
					@keyframes left {
						0%{
							transform: translateX(80%);
							opacity: 0;
						}
						100%{
							transform: translateX(-80%);
							opacity: 1;
						}
					}
				}
			}
		}
	}
.empty-interest{
	padding-top: 140rpx;
	flex: 1;
	.img{
		display: block;
		margin:0 auto;
		width: 335rpx;
		height: 500rpx;
	}
}
	// 底部
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		.group_2 {
			width: 132rpx;
			height: 121rpx;
			background: #000;
			border-top-right-radius: 33rpx;
			border-bottom-right-radius: 33rpx;
			margin-bottom: 7.2rpx;

			.image-text_3 {
				width: 96rpx;
				height: 75rpx;
				margin: 22rpx 0 0 13rpx;

				.icon_5 {
					width: 38rpx;
					height: 37rpx;
					margin-left: 31rpx;
				}

				.text-group_3 {
					height: 23rpx;
					color: rgba(214, 243, 137, 1);
					font-size: 23rpx;
					text-align: center;
					white-space: nowrap;
					line-height: 23rpx;
					margin-top: 15rpx;
				}
			}
		}

		.group_3 {
			background: #D6F389;
			margin-bottom: 0;
			.image-text_3 {
				.text-group_3 {
					color: #010101;
				}

			}
		}

		.footer-item {
			width: 46%;
			height: 30vh;

			&:nth-child(1) {
				background-color: #BEB7FD;
			}

			&:nth-child(2) {
				background-color: #DBF190;
			}

			.icon {
				font-size: 100rpx;
			}
		}
		// 无兴趣样式
		&-2{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			bottom: 106rpx;
			.group_2{
				width: 322rpx;
				height: 230rpx;
				border-radius: 26rpx;
				margin: 0 12rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.image-text_3{
					margin: 0;
					justify-content: center;
					align-items: center;
					width: unset;
					height: unset;
					.text-group_3 {
						font-size: 28rpx;
					}
					.icon_5 {
						width: 70rpx;
						height: 70rpx;
						margin: 0 0 25rpx 0;
					}
				}
			}
		}
	}
	.indicator-dots{
		position: absolute;
		left: 41rpx;
		top: 290rpx;
		color: #000 ;
		text-align: center;
		.dot{
			width: 9rpx;
			height: 9rpx;
			background: #DDDDDD;
			border-radius: 50%;
			margin:0 auto 9rpx;
			display: block;
			transition: all .2s;
			&.current{
				height: 28rpx;
				background-color: #000;
				border-radius: 100rpx;
			}
		}
		.text{
			width: 80rpx;
			&-1{
				font-size: 26rpx;
			}
			&-2{
				font-size: 15rpx;
			}
		}
	}
</style>
