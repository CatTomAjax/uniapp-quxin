<template>
	<view>
		<view class="card flex-row align-center" @click="addFriend">
			<image src="@/static/images/home/addPeopleOrActivity/people.png" mode="" class="icon"></image>
			<view class="cont">
				<view class="tit">交友<text>MAKE FRIEND</text></view>
				<view class="mark">与附近同兴趣的人成为朋友</view>
			</view>
			<view class="right">
				<uni-icons type="right" size="40" color="#fff"></uni-icons>
			</view>
		</view>
		<view class="card activity-card flex-row align-center" @click="addActivity">
			<image src="@/static/images/home/addPeopleOrActivity/activity.png" mode="" class="icon"></image>
			<view class="cont">
				<view class="tit">活动<text>ADD EVENT</text></view>
				<view class="mark">与附近同兴趣的人一起活动</view>
			</view>
			<view class="right">
				<uni-icons type="right" size="40" color="#000"></uni-icons>
			</view>
		</view>
		<view class="remark fc-8c fs-24">你的摇人需求将会展示在该兴趣的“看看”页面中</view>
		<interestTabbarVue :type="InterestTabbarType.shake" @change="onChange"></interestTabbarVue>
	</view>
</template>

<script>
import interestTabbarVue from '@/components/interest-tabbar/interest-tabbar.vue';
import { InterestTabbarType } from '@/constant/activity';
	
	export default {
		components: {interestTabbarVue},
		data() {
			return {
				InterestTabbarType
			};
		},
		onLoad(options){
			console.log(options);
			this.queryParams = options
		},
		methods: {
			onChange(type){
				if(type === InterestTabbarType.shake) return
				uni.redirectTo({
					url: type === InterestTabbarType.see ? '/pages/home/lookInterest/index': '/pages/home/channel/index'
				})
			},
			addFriend(){
				uni.navigateTo({
					url: '/pages/home/addFriend/index?myFunId='+ this.queryParams.myFunId + "&type=add"
				})
			},
			addActivity(){
				uni.navigateTo({
					url:'/pages/home/actitivityPeople/index?myFunId='+ this.queryParams.myFunId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.card{
	width: 637rpx;
	height: 258rpx;
	margin: 34rpx auto;
	background-color: #000;
	border-radius: 80rpx;
	padding: 62rpx 45rpx;
	box-sizing: border-box;
	position: relative;
	.icon{
		width: 124rpx;
		height: 134rpx;
		margin-right: 26rpx;
	}
	.cont{
		color: #fff;
		.tit{
			font-size: 46rpx;
			font-weight: bold;
			text{
				font-size: 26rpx;
				margin-left: 10rpx;
			}
		}
		.mark{
			color: #626262;
			font-size: 24rpx;
			padding-top: 28rpx;
		}
	}
	.right{
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	&.activity-card{
		background-color: #fff;
		.cont{
			color: #000;
		}
	}
}
.remark{
	margin-top: 21rpx;
	text-align: center;
}
</style>
