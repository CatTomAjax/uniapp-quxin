<template>
	<view class="page">
		<view class="bg"></view>
		 <u-navbar
			title="发布摇人"
			:autoBack="true"
			:background="{background: 'rgba(255,255,255,0)'}"
			:borderBottom="false"
			titleColor="#000000"
			backIconColor="#000000"
			>
			</u-navbar>
			<view class="banner-wrap">
				<image src="//cdn.quxin.chat/image/add-friend/banner.png"  mode="widthFix" class="banner"></image>
				<view class="h1">快发信号！</view>
				<view class="h2">
					<text class="text">和附近同兴趣的人</text>
					<text class="text">认识一下吧！</text>
				</view>
			</view>
		<form enctype="multipart/form-data" @submit="submitActivity">
			<picker mode="selector" :disabled="disabled" class="picker" range-key="myfun" :value="interestIndex" :range="interesList" @change="onInterestChange">
				<view class="field-row arrow-right">			
					<view class="label">
						<image src="//cdn.quxin.chat/image/add-friend/icon-1.png" class="icon"></image>兴趣频道
					</view>
				<view class="value-text">{{interesList[interestIndex].myfun}}</view>
				</view>
			</picker>
			<view class="field-row no-bb arrow-right" @click="chooseLocation">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-2.png" class="icon"></image>你的位置
				</view>
				<view class="value-text">
					<block v-if="queryForm.userLocation">{{queryForm.userLocation}}</block>
					<text v-else class="fc-8c">选择活动地点</text>
				</view>
			</view>
			<view class="location-list" v-if="addressList.length">
				<text class="text fc-8c fs-24" v-for="(item, index) in addressList" :key="index">{{item.address}}</text>
			</view>
			
			<view class="field-row no-bb">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-3.png" class="icon"></image>交友距离
				</view>
			</view>
			<view class="distance-row">
				<range-slider width="670" barHeight="18" :disabled="disabled" :isOneNumber="1" :max="60" :values="distanceData" @rangechange="changeDistance" backgroundColor="#F2F2F2" activeColor="linear-gradient(0deg, #7E5BEA, #B29AFD)" barTransparent>
					<template v-slot:maxBlock>
						<view class="max-block">{{queryForm.friendDistance === 60 ? '全城' :  queryForm.friendDistance + 'km'}}
						<view class="triangle-bottom">
							
						</view>
						</view>
					</template>
				</range-slider>
				<view class="acea-row row-between row-middle" style="margin-top: -16rpx">
					<view v-for="(item,index) in distanceList" :key="index">
						<view class="fs-24 fc-8c">{{ item.name }}</view>
					</view>					
				</view>
			</view>
			
			<view class="field-row">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-8.png" class="icon"></image>性别要求
				</view>
			<view class="value-text">
				<u-radio-group 
				    v-model="queryForm.sex"
				    placement="row"
						activeColor="#8667EE" 
						class="sex-group"
						:disabled="disabled">
					<u-radio class="sex-radio" v-for="(item, i) in sexList" :key="i" :label="item.label" :name="item.id">{{item.label}}</u-radio>
				</u-radio-group>
			</view>
			</view>
			<view class="field-row arrow-right" @click="$event => activityRemarksVisible = disabled || !activityRemarksVisible">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-5.png" class="icon"></image>交友留言
				</view>
			</view>
			<view class="textarea-row" v-if=" disabled || activityRemarksVisible">
				<textarea placeholder="交友留言" :disabled="disabled" maxlength="20" v-model="queryForm.activityRemarks" class="textarea" placeholder-class="textarea-placeholder"></textarea>
			</view>
			<view class="field-row arrow-right" @click="openMedia">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-6.png" class="icon"></image>兴趣靓影
				</view>
			</view>
			<view class="pic-row">		
			</view>
			<view v-if="!disabled" class="btns">
				<view @click="goBack" class="btn cancel">取消</view>
				<view @click="submitActivity" class="btn ok">发布</view>
			</view>
			</form>
		
	</view>
</template>

<script>
	import {
		easySelect
	} from "@/components/easy-select/easy-select.vue"
	import {
		rangeSlider
	} from "@/components/range-slider/range-slider.vue"
	import {
		ageList,
		distanceList,
		sexList
	} from './data.js'
	import {
		interest
	} from '@/api/commonapi/interest.js'
	import {
		activity
	} from '@/api/commonapi/activity.js'
import { getDefHeader, getToken } from "@/utils/global-utils.js"
import { ActivityTypeEnum } from "@/constant/activity.js"
import { common } from "../../../api/commonapi/common.js"

	const FormData = require('@/common/FormData')
	export default {
		components: {
			easySelect,
			rangeSlider
		},
		data() {
			return {
				disabled:false,
				queryForm: {
					activityType: ActivityTypeEnum.makeFriend, // 活动类别 0 交友 1活动 2公益
					myfun: '', // 兴趣
					myfunBaseId: 0, // 兴趣id
					latitude: 0, // 纬度
					longitude: 0, //经度
					userLocation: '', // 地址
					friendAgeBegin: 0, // 交友年龄开始
					friendAgeEnd: 94, // 交友年龄结束
					sex: 0,
					friendDistance: 60, // 交友距离
					activityRemarks:"", // 你的留言
				}, // 表单
				distanceData: [0, 60],
				ageData: [0, 94],
				distanceList,
				ageList,
				sexList,
				sex: '女', //性别
				options: [],
				interesList: [], // 兴趣列表
				fileList: [], // 图片列表
				myFunId:0,
				activityId:0,
				fileListDetail:[], // 详情图片
				interestIndex: null,
				activityRemarksVisible: false,
				picVisible: false,
				addressList: [], // 历史地址列表
			}
		},
		
		onShow() {
			if (getToken()) {
				this.getInterestList() // 获取兴趣列表
			}
		},
		onLoad(options) {
			if(options.type == 'detail'){
				this.disabled = true
				this.activityId = options.activityId
				this.getDetail()
			} else {
				this.disabled = false
				this.myFunId = options.myFunId
				this.getHistoryAddress()
			}
		},
		methods: {
			// 获取摇人详情
			getDetail() {
				this.fileList = []
				let params = {
					id:this.activityId,
					activityType:0
				}
				activity.detail(params).then(res=>{
					if(res.code === 200){
						this.ageData[0] = res.data.friendAgeBegin
						this.ageData[1] = res.data.friendAgeEnd
						this.distanceData[1] = res.data.friendDistance
						this.sex = res.data.sex == 0 ? '女' : '男'
						res.data.attachList.forEach((item,index)=>{
							this.fileList.push(item.link)
						})
						this.queryForm = res.data
					}
				})
			},
			// 获取历史地址记录
			async getHistoryAddress(){
				const res = await common.addressList({
					size: 10,
					current: 1,
					latitude: this.userInfo.latitude || '',
					longitude: this.userInfo.longitude || '',
					userId: this.userInfo.id
				})
				if(res.code === 200){
					this.addressList = res.data.records
				}
			},
			goBack(){
				uni.navigateBack()
			},
			// 获取兴趣基础表数据
			getInterestList(refresh) {
				let params = {
					current: 1,
					size: 10000
				}
				interest.baseList(params).then(res => {
					if (res.code == 200) {
						res.data.records.forEach((item,index)=>{
							if(this.myFunId == item.id){
								this.queryForm.myfunBaseId = item.id
								this.queryForm.myfun = item.myfun
								this.interestIndex = index
							}
						})
						this.interesList = res.data.records
					}
				})
			},
			// 发布活动
			submitActivity() {
				let userInfo = uni.getStorageSync('userInfo')
				let obj = {
					userId: userInfo.id, // 创建用户id
					contactInformation: userInfo.phone, // 联系方式
					createDept: userInfo.deptId, // 创建部门
					files: this.fileList
				}
				let params = Object.assign(this.queryForm, obj)
				if(!Boolean(params.userLocation)){
					uni.showToast({
						title:"请选择活动地址",
						icon:"none",
						duration:3000
					})
					return
				}
				if(params.activityRemarks.length > 20 || params.activityRemarks.length < 1){
					uni.showToast({
						title:"你的留言不超过20字并不得少于1字",
						icon:"none",
						duration:3000
					})
					return
				}
				if(this.fileList.length == 0){
					uni.showToast({
						title:"请选择照片",
						icon:"none",
						duration:3000
					})
					return
				}
				let formData = new FormData();
				for (let i in params) {
					if(i === 'files'){
						for (var j = 0; j < params[i].length; j++) {
							// formData.appendFile( 'files', params[i][j].url, params[i][j].url);
						}
					}else {
						formData.append(i, params[i]);
					}
				}
				let data = formData.getData();
				console.log('[data]', data);
				uni.uploadFile({
					url: 'http://175.178.88.155:9340/blade-business/activity/save',
					filePath: this.fileList[0].url,
					formData: data,
					header: getDefHeader(),
					name: 'files',
					success: res=>{
						console.log('[suucess]', res);
					},
					fail: res =>{
						console.log('[fail]', res);
					}
				})
				// activity.save(data.buffer, data.contentType).then(res => {
				// 	this.uploadFiles(res)
				// 	console.log('[activity.sav]', res);
				// })
			},
			uploadFiles(res){
				if(this.fileList.length){
				}
			},
			// ageData
			ageChange(e) {
				this.queryForm.friendAgeBegin = e.minValue
				this.queryForm.friendAgeEnd = e.maxValue
			},
			// 选择距离
			changeDistance(e) {
				let value = Number(e.maxValue)
				if (0 < value && value <= 4) {
					this.queryForm.friendDistance = 1
				} else if (4 < value && value <= 11) {
					this.queryForm.friendDistance = 2
				} else if (11 < value && value <= 14) {
					this.queryForm.friendDistance = 3
				} else if (14 < value && value <= 19) {
					this.queryForm.friendDistance = 4
				} else if (19 < value && value <= 23) {
					this.queryForm.friendDistance = 5
				} else if (23 < value && value <= 28) {
					this.queryForm.friendDistance = 7
				} else if (28 < value && value <= 32) {
					this.queryForm.friendDistance = 10
				} else if (32 < value && value <= 38) {
					this.queryForm.friendDistance = 20
				} else if (38 < value && value <= 43) {
					this.queryForm.friendDistance = 30
				} else if (43 < value && value <= 48) {
					this.queryForm.friendDistance = 40
				} else if (48 < value && value <= 54) {
					this.queryForm.friendDistance = 50
				} else if (0 == value) {
					this.queryForm.friendDistance = 0
				} else {
					this.queryForm.friendDistance = 60
				}
			},
			// 选择活动类型
			selectActivityType(e) {
				this.queryForm.activityType = e
			},
			// 选择兴趣
			selectMyfun(e) {
				this.queryForm.myfun = e.myfun
				this.queryForm.myfunBaseId = e.id
			},
			// 选择兴趣
			onInterestChange(e){
				console.log('[onInterestChange]',e);
				const item = this.interesList[e.detail.value]
				this.queryForm.myfun = item.myfun
				this.queryForm.myfunBaseId = item.id
				this.interestIndex = e.detail.value
			},
			// 选择性别
			selectSex(e) {
				this.queryForm.sex = e.id
				this.sex = e.label
			},
			// 选择活动位置
			chooseLocation() {
				if(this.disabled){
					return
				}
				uni.chooseLocation({
					success: async res =>{
						console.log('[chooseLocation]', res);
						this.queryForm.latitude = res.latitude  // 纬度
						this.queryForm.longitude = res.longitude // 经度
						this.queryForm.userLocation = res.name // 位置名称
						common.saveAddress({
							address: res.name,
							latitude: res.latitude,
							longitude: res.longitude,
							userId: this.userInfo.id
						})
					}
				})
			},
			// 点击创建活动
			addActivity () {
				uni.navigateTo({
					url:'/pages/home/activity/index?moduleType=add'
				})
			},
			togglePicVisible(){
				if(this.disabled) return
				this.picVisible = !this.picVisible
			},
			openMedia(){
				uni.$once('addFriend:updateFileList',  this.onUpdateFileList)
				uni.navigateTo({
					url:`/pages/home/addFriend/addMedia?add=${this.disabled ? 0 : 1}`
				})
			},
			onUpdateFileList(fileList){
				console.log('[onUpdateFileList]', fileList);
				this.fileList = fileList
			}
		}

	}
</script>

<style lang="scss" scoped>
	.page {
		
	}
	.bg{
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		background: linear-gradient(180deg, #8A68F4, #FBF8FF);
		height: 542rpx;
		width: 100%;
	}

.banner{
	display: block;
	width: 697rpx;
	height: 368rpx;
	margin: 0 auto;
}
.banner-wrap{
	position: relative;
	color: #fff;
	.h1{
		position: absolute;
		top: 80rpx;
		left: 70rpx;
		font-weight: bold;
		font-size: 38rpx;
	}
	.h2{
		position: absolute;
		top: 142rpx;
		left: 70rpx;
		font-size: 28rpx;
		opacity: .5;
		.text{
			display: block;
		}
	}
}
.field-row{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 40rpx;
	border-bottom: 1rpx dashed #E9E9E9;
	height: 114rpx;
	.icon{
		width: 28rpx;
		height: 28rpx;
		margin-right: 14rpx;
	}
	.cont{
		flex: 1;
		min-height: 114rpx;
	}
	.label{
		font-size: 28rpx;
		color: #000;
		flex-shrink: 0;
		display: flex;
		align-items: center;
	}
	.value-text{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: #8A68F4;
		font-size: 28rpx;
		padding-left: 22rpx;
	}
}
.no-bb{
	border-bottom: 0;
}
.location-list{
	overflow-x: auto;
	white-space: nowrap;
	margin: 0 40rpx;
	padding-bottom: 32rpx;
	border-bottom: 1rpx dashed #E9E9E9;
	.text{
		border-radius: 1000rpx;
		background-color: #fff;
		padding: 12rpx 22rpx;
		margin-right: 15rpx;
	}
}
.arrow-right{
	position: relative;
	padding-right: 36rpx;
	&:after{
		content: "";
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-40%);
		width: 16rpx;
		height: 28rpx;
		background: url("//cdn.quxin.chat/image/add-friend/icon-7.png") no-repeat center center;
		background-size: 100% 100%;
		pointer-events: none;
	}
}
.distance-row{
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin: 0 40rpx;
	padding-bottom: 42rpx;
	border-bottom: 1rpx dashed #E9E9E9;
}
.max-block{
		position: absolute;
		top: -54rpx;
		color: #8A68F4;
		font-size: 24rpx;
		left: 50%;
		width: 3em;
		text-align: center;
		transform: translateX(-50%);
}
.triangle-bottom{
	width:0;
	height:0;
	margin: 0 auto;
	border-left: 10rpx solid transparent;
	border-right:10rpx solid transparent;
	border-top:14rpx solid #8A68F4;
}
.sex-group{
	::v-deep .sex-radio{
		.u-radio__label{
			margin-right: 38rpx;
		}
		&:last-child{
			.u-radio__label{
				margin-right: 0;
			}
		}
	}	
}
.textarea-row{
	margin: 0 40rpx;
	border-bottom: 1rpx dashed #E9E9E9;
	padding-bottom: 20rpx;
}
.textarea{
	width: 100%;
	height: 120rpx;
	background-color: #fff;
	color: #000;
	box-sizing: border-box;
	padding: 10rpx;
}
.textarea-placeholder{
	color: #000;
}
.pic-row{
	margin: 0 40rpx;
}
.btns{
	display: flex;
	margin: 80rpx 40rpx 0;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 44rpx;
	.btn{
		border-radius: 1000rpx;
		text-align: center;
		font-size: 28rpx;
		height: 100rpx;
		line-height: 98rpx;
	}
	.cancel{
		background-color: #F2F2F2;
		color: #8C8C8C;
		width: 140rpx;
	}
	.ok{
		background-color: #8A68F4;
		color: #fff;
		width: 510rpx;
	}
}

	.fileImage:after {
	  content: "";
	  width: 30%;
	  height: 114px;
	}

	.footer_botton {
		width: 200rpx;
		height: 68rpx;
		text-align: center;
		line-height: 68rpx;
		border-radius: 20rpx;
	}

	.input_footer {
		background-color: #ECECEC;
		padding: 20rpx;
		width: 520rpx;
		border-radius: 10rpx;
	}

	.header_bg {
		background-color: #FA9B01;
		text-align: center;
		height: 68rpx;
		line-height: 68rpx;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}

	.header {
		margin: 16rpx 20rpx;
		padding: 28rpx;
		border: 2rpx solid #BBBBBB;
		box-shadow: 0rpx 10rpx 22rpx -10rpx rgba(0, 0, 0, 0.4);
		border-radius: 20rpx;
	}
</style>