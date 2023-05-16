<template>
	<!-- 添加兴趣 -->
	<view class="page">
		<view class="top-wrap">
			<view class="top">
				<u-search 
					placeholder="请输入搜索关键字" 
					show-action 
					v-model="queryParams.myfun"
					@custom="getInterestList(true)"
					animation 
					height="100" 
					bgColor="#FFF" 
					search-icon-color="#757575" 
					placeholder-color="#757575"
					class="search"
					@focus="onFocus"
					@blur="onCancel"
					></u-search>
			</view>	
		</view>
		<view class="cont">
			<block v-if="showSearch">
				<scroll-view scroll-y class="search-scroll-view">
					<view class="s-item">篮球</view>
					<view class="s-item">足球</view>
				</scroll-view>
				
			</block>
			<block v-else>
				<view class="acea-row row-between row-middle tabs">
					<view v-for="(item,index) in searchList" :key="index" @click="changeTab(index)">
						<view  class="searchBotton" :class="index == currentTab ? 'active' : ''">{{item.name}}</view>
					</view>
				</view>		
				<view class="tip">点击添加兴趣</view>
				<scroll-view show-scrollbar scroll-y class="scroll-view" @scrolltolower="scrolltolower">
					<view v-for="(item,index) in interestList" :key="index" @click="handleInterest(item, index)" class="item">
							<u-icon name="plus" color="#C9C8C8" size="28" class="plus"></u-icon>
							{{item.myfun}}
					</view>
				</scroll-view>
			</block>
			<view class="bottom-place"></view>
		</view>
		<!-- 按钮 -->
		<view class="footerBooton">
			<view class="footer fc-white fs-28">
				<navigator url="/pages/home/interest/create">没找到，我要添加新的兴趣!</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		interest
	} from '@/api/commonapi/interest.js'
	import {
		user
	} from '@/api/commonapi/user.js'
	export default {
		data() {
			return {
				keyword: "", // 输入框，输入内容
				currentTab: 0,
				searchList: [{
					name: "平台热门"
				}, {
					name: "本地热门"
				}], // 搜索按钮
				interestList: [], // 兴趣列表
				chooseId: '', // 选择的兴趣id
				queryParams: {
					current: 1,
					size: 60,
					// myfun: '', //兴趣名称
					// myfunBaseId: 0, //关联兴趣类型基础表id
				},
				total: 0,
				showSearch: !1
			}
		},
		onLoad() {
			this.getInterestList(true) // 获取兴趣基础表数据
		},
		methods: {
			onFocus(){
				this.showSearch = !0
			},
			onCancel(){
				this.showSearch = !!this.queryParams.myfun
			},
			// 切换搜索分类
			changeTab(index) {
				this.currentTab = index
			},
			// 获取兴趣基础表数据
			getInterestList(refresh) {
				if(refresh){
					this.queryParams.current = 1
					this.interestList = []
				}
				interest.baseList(this.queryParams).then(res => {
					if (res.code == 200) {
						this.interestList = [...this.interestList, ...res.data.records]
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
						this.getInterestList()
					}
				}
			},
			// 添加我的兴趣
			handleInterest(item, index) {
				this.chooseId = index
				let params = {
					createDept: 0,
					createTime: "",
					createUser: 0,
					isDeleted: 0,
					myfunBaseId: 0,
					myfunType: 0,
					myfunTypeName: "",
					status: 0,
					updateTime: "",
					updateUser: 0,
					myfun: item.myfun,
					// userId: "1123598821738675201" // TODO
					userId: this.userInfo.id,
				}
				interest.privateAdd(params).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '添加成功',
							success: ()=> {
								uni.navigateBack()
							}
						})
					}
				})
			},
			// 修改用户地址
			updateUser() {
				let that = this
				uni.chooseLocation({
					success: (e) => {
						if(e.name) {
							this.$u.func.updateUserInfo({
								id: that.userInfo.id,
								deptId: that.userInfo.deptId,
								latitude: e.latitude,
								longitude: e.longitude,
								userLocation: e.name
							})
						}
					}
				})
			
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	.top-wrap{
		flex-shrink: 0;
	}
	.top{
		padding: 12rpx 34rpx 50rpx;
	}
	.search{
		::v-deep .u-content{
			border-radius: 33rpx;	
			box-shadow: 0rpx 3rpx 13rpx 0rpx rgba(166,155,186,0.18);
		}
	}
	.tabs{
		padding: 0 50rpx;
	}
	.cont{
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.tip{
			text-align: center;
			color: #8c8c8c;
			font-size: 28rpx;
			line-height: 133rpx;
			height: 133rpx;
			flex-shrink: 0;
		}
	}
	.scroll-view{
		height: 51vh;
		padding: 0 28rpx;
		.item{
			display: inline-block;
			min-width: 195rpx;
			height: 75rpx;
			background-color: #fff;
			border: 1rpx solid #E4E4E4;
			color: #757575;
			font-size: 28rpx;
			text-align: center;
			line-height: 74rpx;
			border-radius: 1000rpx;
			box-sizing: border-box;
			padding:0 12rpx;
			white-space: nowrap;
			margin: 0 11rpx 23rpx;
			.plus{
				margin-right: 14rpx;
			}
		}
	}
	.search-scroll-view{
		height: 70vh;
	}
	.s-item{
		height: 100rpx;
		line-height: 98rpx;
		overflow: hidden;
		border-bottom: 1rpx dashed #EEEDEF;
		color: #757575;
		margin: 0 78rpx;
		padding-left: 22rpx;
	}
	.bottom-place{
		height: 200rpx;
		flex-shrink: 0;
	}
	.footer {
		width: 646rpx;
		height: 99rpx;
		background: #000000;
		box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(237,224,254,0.18);
		border-radius: 50rpx;
		color: #fff;
		font-size: 30rpx;
		font-weight: bold;
		margin: 0 auto;
		text-align: center;
		line-height: 98rpx;
	}

	.footerBooton {
		position: fixed;
		bottom: 83rpx;
		left: 0;
		right: 0;
	}
	.searchBotton {
		width: 315rpx;
		height: 99rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(237,224,254,0.18);
		border-radius: 50rpx;
		background-color: #fff;
		color: #757575;
		font-size: 28rpx;
		text-align: center;
		line-height: 98rpx;
		&.active{
			color: #000;
			background-color: #D6F389;
		}
	}
</style>
