<template>
	<view>
		<view class="header acea-row+" style="margin: 46rpx 20rpx 0;position: relative;background-color: #FFF;">
			<image src="/static/images/clip.png" class="clip" mode=""></image>
			<view class="threeform"></view>
			<view class="handAndEnd fs-24 fc-101">{{ activityInfo.status == 0 ? '进行中' : '已截止' }}</view>
			<view>
				<view class="fs-48 fc-white" style="opacity: 0.99;padding: 28rpx 0 0 28rpx;">{{activityInfo.myfun}}</view>
				<view class="fs-28 fc-white" style="opacity: 0.4;padding: 4rpx 0 0 4rpx;">INTEREST</view>
				<view class="fs-40 fw" style="color: #186DEE;padding-left: 120rpx;width: 400rpx;height: 110rpx;">{{ activityInfo.activityName }}</view>
				<view class="acea-row row-middle" style="padding:18rpx 0 0 18rpx;">
					<view class="fs-24 " style="color: #9D9C9C;">活动发起人:</view>
					<image style="width: 32rpx;height: 32rpx;padding-left: 12rpx;" src="../../../static/images/qq.png" mode=""></image>
					<view class="fs-24 fc-101">{{activityInfo.initiatorName}}</view>
				</view>
				<view class="acea-row row-middle" style="padding:0 0 0 18rpx;">
					<view class="fs-24 " style="color: #9D9C9C;">发布时间:</view>
					<view class="fs-24 fc-101" style="padding-left: 12rpx;">{{activityInfo.createTime}}</view>
				</view>
				<view class="acea-row row-middle header_back">
					<image src="../../../static/images/clap.png" style="width: 50rpx;height: 50rpx;" mode=""></image>
					<view class="fs-22 fc-101" style="width: 380rpx;margin-left: 10rpx;">
						最好玩的一群小伙伴组织的最好玩的活动等你来!
					</view>
				</view>
			</view>
			<image :src="activityInfo.attachList[0].link" style="height: 434rpx;border-radius: 20rpx;"></image>
		</view>
		<view class="bc-white br-20" style="margin: 12rpx 20rpx 0;padding: 32rpx 26rpx;">
			<view class="acea-row row-between row-middle">
				<view class="fs-28" style="color: #0039A4;width: 140rpx;">活动时间</view>
				<input disabled type="text" :value="activityInfo.activityBeginTime + '~~' + activityInfo.activityEndTime" class="inputBc" style="width: 400rpx;flex: 1;margin-right: 20rpx;">
				<view class="fs-28" style="color: #0039A4;">{{activityInfo.repeatFlag == 0 ? '每天重复' : '每周重复'}}</view>
			</view>
			<view class="acea-row row-middle" style="margin-top: 20rpx;">
				<view class="fs-28" style="color: #0039A4;width: 140rpx;">活动地点</view>
				<view class="acea-row row-between row-middle" style="width: 400rpx">
					<image src="/static/images/position.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
					<view class="fs-32 fw fc-101" style="width: 240rpx;">{{activityInfo.userLocation}}</view>
					<image style="width: 32rpx;height: 32rpx;" src="/static/images/share.png" mode=""></image>
				</view>
			</view>
			<view class="acea-row row-middle" style="margin-top: 20rpx;">
				<view class="fs-28" style="color: #0039A4;width: 140rpx;">活动人数</view>
				<input disabled type="number" :value="activityInfo.activityUserNum" class="inputBc" style="width: 252rpx;flex: 1;">
			</view>
			<view class="acea-row row-middle" style="margin-top: 20rpx;">
				<view class="fs-28" style="color: #0039A4;width: 140rpx;">性别要求</view>
				<input disabled type="text" :value="activityInfo.sex === 0 ? '男' : '女'" class="inputBc" style="width: 252rpx;flex: 1;">
			</view>
			<view class="acea-row row-middle" style="margin-top: 20rpx;">
				<view class="fs-28" style="color: #0039A4;width: 140rpx;">参加费用</view>
				<input disabled type="number" :value="activityInfo.activityCost" class="inputBc" style="width: 252rpx;flex: 1;">
			</view>
			<view class="acea-row row-middle" style="margin-top: 20rpx;">
				<view class="fs-28" style="color: #0039A4;width: 140rpx;">召集口号</view>
				<input disabled type="text" :value="activityInfo.activityTogetherRemarks" class="inputBc" style="width: 252rpx;flex: 1;">
			</view>
			<view class="fs-28" style="color: #0039A4;width: 140rpx;margin-top: 20rpx;">活动详情</view>
			<view style="border: 2rpx solid #101010;padding: 14rpx 24rpx 14rpx;border-radius: 8rpx;margin-top: 34rpx;">
				<textarea :value="activityInfo.activityRemarks" disabled auto-height maxlength="-1" disable-default-padding placeholder="请填写活动详情" placeholder-class="fs-28 fw-400" placeholder-style="color:#CAC9C9;" class="fs-28 fc-101 fw-400"></textarea>
			</view>
			<view class="acea-row row-middle" style="margin-top: 20rpx;">
				<view class="fs-28 fw" style="color: #0039A4;width: 140rpx;">当前参与</view>
				<view class="addHumanNumber fs-28 fc-white fw">5 / {{activityInfo.activityUserNum}}</view>
			</view>
			<!-- <view class="fs-28" style="color: #0039A4;width: 140rpx;margin-top: 20rpx;">评论</view>
			<view style="background-color: #DEEAFD;border-radius: 10rpx;padding: 10rpx 20rpx;margin-top: 20rpx;">
				<view v-for="(item,index) in 5" :key="index">
					<view style="margin-top: 10rpx;">
						<text class="fs-28" style="color: #0039A4;">东西</text>:
						<text>哈哈哈哈，不错不错</text>
					</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import { easySelect } from "@/components/easy-select/easy-select.vue"
	import {
		activity
	} from '@/api/commonapi/activity.js'
import { getToken } from "../../../utils/global-utils"
	// 1642807193796640769
	export default{
		data(){
			return {
				activityId:0,
				timeValue:"2023.01.25 星期六 下午15:00-18:00",
				actitvityNumber:"10人",
				sax:"不限",
				price:"￥0",
				options:[
					{
						value: '1',
						label: '每天重复'
					}, {
						value: '2',
						label: '每周重复'
					}
				],
				value:"每天重复",
				activityInfo: {}
			}
		},
		components:{
			easySelect
		},
		onLoad(options) {
			this.activityId = options.activityId
			if (getToken()) {
				this.getDetail()
			}
		},
		methods:{
			// 获取活动详情
			getDetail() {
				let params = {
					id:this.activityId
				}
				activity.detail(params).then(res=>{
					if(res.code === 200){
						this.activityInfo = res.data
					}
				})
			},
			selectOne(e){
				this.value = this.options[e.value-1].label
			}
		}
	}
</script>

<style>
	page{
		background-color: #ECECEC;
	}
	.addHumanNumber{
		width: 120rpx;
		height: 60rpx;
		border-radius: 10rpx;
		text-align: center;
		line-height: 60rpx;
		background-color: #186DEE;
	}
	.inputBc{
		padding: 20rpx;
		background-color: #ECECEC;
		border-radius: 10rpx;
		color: #101010;
	}
	.header{
		border-radius: 20rpx;
		border-top-left-radius: 0rpx;
	}
	.header_back{
		background-color: #FEEBCC;
		width: 428rpx;
		height: 90rpx;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		padding: 0 26rpx;
		margin-top: 20rpx;
	}
	.clip{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		top: -30rpx;
		left: 0;
		z-index: 2;
	}
	.threeform{
		position: absolute;
		width: 0;
		height: 0;
		border-top: 200rpx solid #FA9B01;
		border-right: 320rpx solid transparent;
		z-index: 0;
	}
	.handAndEnd{
		position: absolute;
		top: 16rpx;
		right: 10rpx;
		width: 90rpx;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
		background-color: #B3F984;
		
	}
</style>