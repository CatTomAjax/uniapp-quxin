<template>
	<view>
		<view class="top-node">
			<view class="search-node flex-row justify-between align-center">
				<view class="left">
					<uni-search-bar class="u-search-bar" @confirm="onSearchConfirm" @input="onSearchInput"  cancelButton="none" placeholder="请输入搜索关键字" bgColor="#fff" radius="1000">
						<template v-slot:searchIcon>
							<image src="//cdn.quxin.chat/icon/channel-search.png" class="search-icon"></image>
						</template>
					</uni-search-bar>
				</view>
				<view class="right align-center justify-center">
					<image src="//cdn.quxin.chat/icon/channel-menu.png" class="icon" @click="toggleMenu"></image>
					<view class="menu-list" v-if="menuVisible">
						<view class="li align-center" v-for="item in menuListConf" :key="item.type" @click="doSelectMenu(item)">
							<image :src="item.icon" mode="aspectFit" class="icon"></image>
							{{item.text}}
						</view>
					</view>
				</view>				
			</view>
			
			<channel-tablist :currentId="currentIntersetId" :tabs="interestList" v-if="!!interestList.length" @change="onInterestChange"></channel-tablist>
			
		</view>
		<!-- 人员列表 -->
		<view class="pd-t40">
		 <uni-list class="list" :border="false">
				<uni-list-item class="list-item" :border="false">
					<template v-slot:header>
						<view class="header">
							<view class="right-top">
									<uni-badge text="11" type="error" max-num="99" absolute="rightTop" :offset="[0, -10]"></uni-badge>
								</view>
							<image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" class="avatar"></image>
						</view>
					</template>
					<template v-slot:body>
						<view class="body">
							<view class="name line1"><image src="//cdn.quxin.chat/icon/lookInterest/people3.png" class="icon"></image>小明</view>
							<view class="remark">你好哈</view>
						</view>
					</template>
					<template v-slot:footer>
						<view class="date">10:15</view>
					</template>
				 </uni-list-item>
		</uni-list>
		</view>
		
		<Tabbar :confList="tabbarConfList"/>
	</view>
</template>

<script>
import Tabbar from '@/components/tabbar/tabbar.vue'
import ChannelTablist from '@/components/channel-tablist/channel-tablist.vue'
import { interest } from '@/api/commonapi/interest';
	export default {
		components: {Tabbar, ChannelTablist},
		data() {
			return {
				menuListConf: [
					{text: '发起群聊', icon: '//cdn.quxin.chat/icon/channel-group.png', type: 0},
					{text: '添加朋友', icon: '//cdn.quxin.chat/icon/channel-add-people.png', type: 1},
					{text: '扫一扫', icon: '//cdn.quxin.chat/icon/channel-scan.png', type: 2},
					{text: '清除未读', icon: '//cdn.quxin.chat/icon/channel-cleanup.png', type: 3},
				],
				tabbarConfList: [
					{text: '频道', icon: '//cdn.quxin.chat/icon/tabbar-chat.png', count: 12, active: !0, showCount: !0},
					{text: '趣友', icon: '//cdn.quxin.chat/icon/tabbar-friend.png', count: 1, active: !1, showCount: !0},
					{text: '趣圈', icon: '//cdn.quxin.chat/icon/tabbar-timeline.png', count: 0, active: !1, showCount: !0},
					{text: '广场', icon: '//cdn.quxin.chat/icon/tabbar-feed.png', count: 0, active: !1}
				],
				menuVisible: false, // 右上角弹出层展示/隐藏
				currentIntersetId: null, // 当前选中兴趣id
				interestList: [], // 兴趣列表
			};
		},
		onLoad(options){
			this.interest = JSON.parse(options.interest)
			this.currentIntersetId = this.interest.id
			this.getInterestList()
		},
		methods: {
			async getInterestList(){
				const res = await interest.privateList({
					userId: this.userInfo.id,
					current: 1,
					size: 9999
				})
				if(res.code === 200){
					this.interestList = res.data.records
				}
			},
			onSearchConfirm(){
				
			},
			onSearchInput(){
				
			},
			// 切換兴趣
			onInterestChange(index, interestItem) {
				console.log('当前选中的项：' + index)
				uni.showToast({
					title: interestItem.myfun,
					icon: 'none'
				})
			},
			// 右上角弹出层关闭
			toggleMenu(){
				this.menuVisible = !this.menuVisible
			},
			// 选择 右上角弹出层功能
			doSelectMenu(item){
				this.toggleMenu()
				console.log('[右上角弹出层]', item);
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-node{
	padding:10rpx 22rpx 48rpx 40rpx;
	.icon{
		width: 41rpx;
		height: 41rpx;
	}
	.left{
		width: 560rpx;
	}
	.u-search-bar{
		color: #757575;
		font-size: 28rpx;
		::v-deep .uni-searchbar{
			padding: 0;
		}
		::v-deep .uni-searchbar__box{
			justify-content: flex-start;
			height: 100rpx;
		}
		::v-deep .uni-searchbar__box-icon-search{
			padding-left: 44rpx;
		}
	}
	.search-icon{
		width: 34rpx;
		height: 34rpx;
	}
	.right{
		width: 100rpx;
		height: 100rpx;
		flex-shrink: 0;
		background-color: #fff;
		border-radius: 33rpx;
		position: relative;
	}
}
.menu-list{
	position: absolute;
	right: 0;
	bottom: -431rpx;
	width: 295rpx;
	height: 425rpx;
	background: #4C4C4C;
	box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(166,155,186,0.4);
	border-radius: 33rpx;
	z-index: 9000;
	box-sizing: border-box;
	padding-top: 18rpx;
	&:before{
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		right: 41rpx;
    top: -12rpx;
		border-left: 10rpx solid transparent;  
		border-right: 10rpx solid transparent;  
		border-bottom: 16rpx solid #4C4C4C; 
	}
	.li{
		margin: 0 35rpx;
		padding: 28rpx 0;
		font-weight: bold;
		color: #fff;
		font-size: 28rpx;
		border-bottom: 1rpx dashed #909090;
		&:last-child{
			border-bottom: 0;
		}
	}
	.icon{
		width: 41rpx;
		margin-right: 33rpx;
	}
}
.pd-t40{
	margin-top: 40rpx;
}
.list{
	::v-deep .uni-list{
		background-color: #FBF8FF !important;
	}
	::v-deep .uni-list-item__container {
		align-items: center;
	}
	&-item{
		::v-deep .uni-list-item{
			background-color: #FBF8FF !important;
			&:after{
				content: "";
				position: absolute;
				right: 50rpx;
				bottom: 0;
				width: 534rpx;
				border-bottom: 1px dashed #E9E9E9;
			}
		}
		&:last-child{
			::v-deep .uni-list-item:after{
				display: none;
			}
		}
		.header{
			position: relative;
			flex-shrink: 0;
			margin-right: 25rpx;
		}
		.right-top{
			position: absolute;
			right: 0;
			top: 0;
		}
		.avatar{
			width: 118rpx;
			height: 118rpx;
			border-radius: 50%;
		}
		.body{
			flex: 1;
			overflow: hidden;
			padding-right: 50rpx;
		}
		.name{
			font-size: 30rpx;
			color: #24223C;
			font-weight: bold;
			display: flex;
			align-items: center;
			flex: 1;
			display: flex;
			flex-wrap: nowrap;
			.icon{
				width: 44rpx;
				height: 44rpx;
				margin-right: 7rpx;
			}
		}
		.remark{
			font-size: 24rpx;
			color: #8C8C8C;
			margin-top: 20rpx;
		}
		.date{
			flex-shrink: 0;
			font-size: 24rpx;
			color: #8C8C8C;
		}
	}
}
</style>
