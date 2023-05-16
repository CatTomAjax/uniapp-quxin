<template>
	<view>
		<view class="top-node">
			<channel-tablist :currentId="currentIntersetId" :tabs="interestList" v-if="!!interestList.length" @change="onInterestChange"></channel-tablist>
			
		</view>
		<!-- 人员列表 -->
		<view class="pd-t40">
			<pp-waterfall-flow :value="list"></pp-waterfall-flow>
		</view>
		
		<Tabbar :confList="tabbarConfList" itemBR="33rpx"/>
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
				tabbarConfList: [
					{text: '频道', icon: '//cdn.quxin.chat/icon/tabbar-chat.png', count: 12, active: !1, showCount: !0},
					{text: '趣友', icon: '//cdn.quxin.chat/icon/tabbar-friend.png', count: 1, active: !1, showCount: !0},
					{text: '趣圈', icon: '//cdn.quxin.chat/icon/tabbar-timeline.png', count: 0, active: !0, showCount: !0},
					{text: '广场', icon: '//cdn.quxin.chat/icon/tabbar-feed.png', count: 0, active: !1}
				],
				currentIntersetId: null, // 当前选中兴趣id
				interestList: [], // 兴趣列表
				list: [{
					desc: "描述文字1",
					image: "https://via.placeholder.com/200x200.png/2878ff",
					title: "标题文字1标题文字1标题文字1标题文字1标题文字1",
					avatar: 'https://via.placeholder.com/200x200.png/2878ff',
					name: '小树枝小树枝小树枝',
					likeNum: 212
				},{
					desc: "描述文字2",
					image: "https://via.placeholder.com/140x280.png/7FFFAA",
					title: "标题文字2",
					avatar: 'https://via.placeholder.com/200x200.png/2878ff',
					name: '大撒旦',
					likeNum: 212
				}]
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
			// 切換兴趣
			onInterestChange(index, interestItem) {
				console.log('当前选中的项：' + index)
				uni.showToast({
					title: interestItem.myfun,
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
