<template>
	<view>
		<view class="bg"></view>
		 <u-navbar
			title="发布活动"
			:autoBack="true"
			:background="{background: 'rgba(255,255,255,0)'}"
			:borderBottom="false"
			titleColor="#000000"
			backIconColor="#000000"
			>
			</u-navbar>
			<view class="banner-wrap">
				<image src="//cdn.quxin.chat/image/activity-people/banner.png"  mode="widthFix" class="banner"></image>
				<view class="h1">快发起活动！</view>
				<view class="h2">
					<text class="text">和附近同兴趣的人</text>
					<text class="text">一起玩吧！</text>
				</view>
			</view>
			
			<picker mode="selector" class="picker" range-key="myfun" :value="interestIndex" :range="interesList" @change="onInterestChange">
				<view class="field-row arrow-right">			
					<view class="label">
						<image src="//cdn.quxin.chat/image/add-friend/icon-1.png" class="icon"></image>兴趣频道
					</view>
					<view class="value-text">{{interesList[interestIndex].myfun}}</view>
				</view>
			</picker>
			
			<view class="field-row arrow-right">
				<view class="label">
					<image src="//cdn.quxin.chat/image/activity-people/icon-2.png" class="icon"></image>活动封面
				</view>
				<view class="value-text">
					<u-upload width="90" height="90" action="#" 
					:auto-upload="false" 
					:file-list="fileList" 
					name="files" 
					:max-count="1" 
					:max-size="5 * 1024 * 1024" 
					@on-remove="onRemove" 
					@on-choose-complete="onChooseComplete" 
					:upload-text="null" 
					upload-icon=""
					:custom-btn="true"
					class="activity-upload"
					>
					<template v-slot:addBtn>
						<view class="add-btn"></view>
					</template>
					</u-upload>
				</view>
			</view>
			
			<view class="field-row arrow-right">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-5.png" class="icon"></image>活动名字
				</view>
				<view class="value-text">
					<input type="text" v-model="queryForm.activityName" class="c-input" placeholder="请输入活动名字">
				</view>
			</view>
			
			<view class="field-row arrow-right">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-3.png" class="icon"></image>活动时间
				</view>
				<view class="value-text">
					<view class="date-wrap">
						<input type="text" @focus="onShowDatePicker('rangetime')" v-model="time" class="date-input">
						<easy-select labelClassName="label" :options="options" :value="value" @selectOne="selectOne"  width="190"></easy-select>
					</view>
				</view>
			</view>
			
			<view class="field-row no-bb arrow-right" @click="chooseLocation">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-2.png" class="icon"></image>活动地点
				</view>
				<view class="value-text">
					<block v-if="queryForm.userLocation">{{queryForm.userLocation}}</block>
					<text v-else class="fc-8c">选择活动地点</text>
				</view>
			</view>
			<view class="location-list" v-if="false">
				<text class="text fc-8c fs-24">海上世界文化艺术</text>
			</view>
			
			<view class="field-row arrow-right">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-3.png" class="icon"></image>活动人数
				</view>
				<view class="value-text">
					<input type="text" v-model="queryForm.activityUserNum" class="c-input" placeholder="请输入活动人数">
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
							>
						<u-radio class="sex-radio" v-for="(item, i) in sexList" :key="i" :label="item.label" :name="item.id">{{item.label}}</u-radio>
					</u-radio-group>
				</view>
			</view>
			
			<view class="field-row arrow-right">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-3.png" class="icon"></image>参加费用
				</view>
				<view class="value-text">
					<input type="text" v-model="queryForm.activityCost" class="c-input" placeholder="请输入参加费用">
				</view>
			</view>
			
			<view class="field-row arrow-right">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-3.png" class="icon"></image>摇人口号
				</view>
				<view class="value-text">
					<input type="text" maxlength="30" v-model="queryForm.activityTogetherRemarks" class="c-input" placeholder="请输入摇人口号">
				</view>
			</view>
			<view class="field-row arrow-right">
				<view class="label">
					<image src="//cdn.quxin.chat/image/add-friend/icon-3.png" class="icon"></image>活动详情
				</view>
				<view class="value-text">
					<input type="text" v-model="queryForm.activityRemarks" class="c-input" placeholder="请输入活动详情">
				</view>
			</view>
			
			<view class="btns">
				<view @click="goBack" class="btn cancel">取消</view>
				<view @click="submitActivity" class="btn ok">发布</view>
			</view>
			
			
<!-- 		<view style="margin: 16rpx 20rpx;" class="bc-white">
			<view style="padding:26rpx;">
				<view class="acea-row row-between row-middle" style="margin-top: 20rpx;">
					<view class="fs-28  fc-101" style="width: 140rpx;">活动时间</view>
					<input type="text" @focus="onShowDatePicker('rangetime')" v-model="time" class="inputBc" style="width: 400rpx;flex: 1;margin-right: 20rpx;">
					<easy-select labelClassName="label" :options="options" :value="value" @selectOne="selectOne"></easy-select>
				</view>
				<view class="acea-row row-middle" style="margin-top: 20rpx;">
					<view class="fs-28  fc-101" style="width: 140rpx;">活动人数</view>
					<input type="number" v-model="queryForm.activityUserNum" class="inputBc" style="width: 252rpx;flex: 1;">
				</view>
				<view class="acea-row row-middle" style="margin-top: 20rpx;">
					<view class="fs-28  fc-101" style="width: 140rpx;">联系方式</view>
					<input type="number" maxlength="11" v-model="queryForm.contactInformation" class="inputBc" style="width: 252rpx;flex: 1;">
				</view>
				<view class="acea-row row-middle" style="margin-top: 20rpx;height: 80rpx;">
					<view class="fs-28 fc-101" style="width: 140rpx;">性别要求</view>
					<easy-select width="180" iconColor="#060606" borderColor="#ECECEC" fontColor="#060606"
						:options="sexList" backgroundColor="#ECECEC" :value="sex" @selectOne="selectSex"></easy-select>
				</view>
				<view class="acea-row row-middle" style="margin-top: 20rpx;">
					<view class="fs-28  fc-101" style="width: 140rpx;">参加费用</view>
					<input type="number" v-model="queryForm.activityCost" class="inputBc" style="width: 252rpx;flex: 1;">
				</view>
				<view class="acea-row" style="margin-top: 20rpx;">
					<view class="fs-28 fc-101" style="width: 140rpx;margin-top: 10rpx;">活动召集口号</view>
					<view class="input_footer">
						<view class="fs-24" style="color: #A9A2A2;">不超过30字</view>
						<input type="text" maxlength="30" v-model="queryForm.activityTogetherRemarks"
							style="background-color: #ECECEC;width: 500rpx;color: #0039A4;">
					</view>
				</view>
				<view class="acea-row" style="margin-top: 20rpx;">
					<view class="fs-28 fc-101" style="width: 140rpx;margin-top: 10rpx;">活动详情</view>
					<view class="input_footer">
						<view class="fs-24" style="color: #A9A2A2;">请填写活动详细介绍，至少20字</view>
						<textarea v-model="queryForm.activityRemarks" maxlength="-1" style="background-color: #ECECEC;width: 480rpx;color: #0039A4;height: 200rpx;line-height: 40rpx;margin-right: 10rpx;"></textarea>
					</view>
				</view>
				<view style="padding: 60rpx 0;width: 100%;" class="acea-row row-around row-middle box-sizing">
					<view class="footer_botton fs-24 fc-white" style="background-color: #000000;" @click="goBack">取消</view>
					<view class="footer_botton fs-24 fc-white" style="background-color: #8A68F3;padding: 0;"
						@click="submitActivity">发布
					</view>
				</view>
			</view>
		</view> -->
		<mx-date-picker :show="showPicker" :type="type" :value="time" :show-tips="true" :begin-text="'开始'" :end-text="'结束'" :show-seconds="true" @confirm="ed" @cancel="ed" ></mx-date-picker>
	</view>
</template>

<script>
	import { MxDatePicker } from "@/components/mx-datepicker/mx-datepicker.vue";
	import {interest} from '@/api/commonapi/interest.js'
	import { activity, save } from "@/api/commonapi/activity.js"
	import { easySelect } from "@/components/easy-select/easy-select.vue"
import { getToken } from "../../../utils/global-utils";
	const FormData = require('@/common/FormData')
	export default{
		data(){
			return {
				myFunId:0,
				fileList:[],
				showPicker: false,
				rangetime: ['2019/01/08 14:00','2019/01/16 13:59'],
				type: 'rangetime',
				time:"",
				queryForm: {
					activityTogetherRemarks:"", // 召集口号
					activityName:"", // 活动名称
					activityUserNum:"", // 活动人数
					repeatFlag:0, // 0 每天 1 每周 
					activityType:1, // 活动
					myfun: '', // 兴趣
					myfunBaseId: 0, // 兴趣id
					latitude: 0, // 纬度
					longitude: 0, //经度
					userLocation: '', // 地址
					sex: 0, //  0女 1男
					activityBeginTime:"", // 活动开始时间
					activityEndTime:"", // 活动结束时间
					activityCost:"", // 参与费用
					activityRemarks:"", // 活动详情
					userId:0, // userId
					files:"", // 图片地址
					contactInformation:"", // 联系方式
					status:0, // 开启状态
				}, // 表单
				interesList:'',
				sex:"女",
				sexList:[
					{
						id: 1,
						label: '男'
					}, {
						id: 0,
						label: '女'
					},
					{
						id: 2,
						label: '不限'
					}
				],
				options:[
					{
						id: 0,
						label: '每天重复'
					}, {
						id: 1,
						label: '每周重复'
					}
				],
				value:"每天重复",
				interestIndex: null, // 兴趣索引
			}
		},
		components:{
			easySelect,
			MxDatePicker
		},
		onShow() {
			if (getToken()) {
				this.getInterestList() // 获取兴趣列表
				this.queryForm.userId = uni.getStorageSync("userInfo").id
				this.queryForm.contactInformation = uni.getStorageSync("userInfo").phone
			}
		},
		onLoad(options) {
			this.myFunId = options.myFunId
		},
		methods:{
			// 返回上级页面
			goBack(){
				uni.navigateBack()
			},
			// 上传图片
			onChooseComplete(data,i) {
				this.fileList = data
			},
			onRemove(index) {
				this.fileList.splice(index, 1)
			},
			// 发布活动
			async submitActivity(){
				const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
				if(!Boolean(this.queryForm.contactInformation) || this.queryForm.contactInformation.length < 11){
				  wx.showToast({
					title:"请检查联系人是否有误",
					icon:"none",
					duration:2000
				  })
				  return
				}
				if(!Boolean(this.queryForm.contactInformation)){
				  wx.showToast({
					title:"请输入联系人",
					icon:"none",
					duration:2000
				  })
				  return
				}
				if(this.queryForm.activityRemarks.length < 21 ){
					uni.showToast({
						title:"请填写活动详细介绍，至少20字",
						icon:"none",
						duration:3000
					})
					return
				}
				if(this.queryForm.activityTogetherRemarks.length >= 30 || this.queryForm.activityTogetherRemarks.length < 1){
					uni.showToast({
						title:"召集口号不超过30字并不得为空",
						icon:"none",
						duration:3000
					})
					return
				}
				if(this.queryForm.activityName.length >= 14 || this.queryForm.activityName.length < 1){
					uni.showToast({
						title:"活动名称不超过14字并不得少于1字",
						icon:"none",
						duration:3000
					})
					return
				}
				if(!Boolean(this.queryForm.activityRemarks)){
					uni.showToast({
						title:"请输入活动详情",
						icon:"none",
						duration:3000
					})
					return
				}
				if(!Boolean(this.queryForm.activityUserNum)){
					uni.showToast({
						title:"请输入活动人数",
						icon:"none",
						duration:3000
					})
					return
				}
				if(!Boolean(this.queryForm.activityCost)){
					uni.showToast({
						title:"请输入活动费用",
						icon:"none",
						duration:3000
					})
					return
				}
				if(!Boolean(this.queryForm.myfun)){
					uni.showToast({
						title:"请选择活动兴趣",
						icon:"none",
						duration:3000
					})
					return
				}
				if(!Boolean(this.queryForm.userLocation)){
					uni.showToast({
						title:"请选择活动地址",
						icon:"none",
						duration:3000
					})
					return
				}
				if(!Boolean(this.queryForm.activityBeginTime)){
					uni.showToast({
						title:"请选择活动时间",
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
				this.queryForm.files = this.fileList
				this.queryForm.initiatorName = uni.getStorageSync("userInfo").account
				let formData = new FormData();
				let params = this.queryForm
				for (let i in params) {
					if(i === 'files'){
						for (var j = 0; j < params[i].length; j++) {
							formData.appendFile( 'files', params[i][j].url, params[i][j].url);
						}
					}else {
						formData.append(i, params[i]);
					}
				}
				let data = formData.getData();
				const res = await activity.save(data.buffer, data.contentType);
				if(res.code == 200){
					uni.showToast({
						title:"新增活动成功!",
						icon:"none",
						duration:2000
					})
					setTimeout(()=>{
						uni.navigateBack()
					},2000)
				}
			},
			// 选择活动位置
			chooseLocation() {
				let that = this
				uni.chooseLocation({
					success(res) {
						that.queryForm.latitude = res.latitude  // 纬度
						that.queryForm.longitude = res.longitude // 经度
						that.queryForm.userLocation = res.name // 位置名称
					}
				})
			},
			onShowDatePicker(type){//显示
				this.type = type;
				this.showPicker = true;
				// this.value = this[type];
			},
			ed(e) {//选择
				this.showPicker = false;
				if(e) {
					this.queryForm.activityBeginTime = e.value[0].replaceAll("/", "-");
					this.queryForm.activityEndTime = e.value[1].replaceAll("/", "-");
					this.time = this.queryForm.activityBeginTime + " ~ " + this.queryForm.activityEndTime
				}
			},
			// 选择兴趣
			onInterestChange(e){
				console.log('[onInterestChange]',e);
				const item = this.interesList[e.detail.value]
				this.queryForm.myfun = item.myfun
				this.queryForm.myfunBaseId = item.id
				this.interestIndex = e.detail.value
			},
			async getInterestList(){
				let params = {
					current: 1,
					size: 10000
				}
				const res = await interest.baseList(params);
				if(res.code == 200){
					res.data.records.forEach((item,index)=>{
						if(this.myFunId == item.id){
							this.queryForm.myfunBaseId = item.id
							this.queryForm.myfun = item.myfun
							this.interestIndex = index
						}
					})
					this.interesList = res.data.records
				}
			},
			// 选择性别
			selectSex(e) {
				this.sex = e.label
				this.queryForm.sex = e.id
			},
			selectOne(e){
				this.queryForm.repeatFlag = e.id
				this.value = e.label
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #ECECEC;
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
	.add-btn{
		width: 53vw;
		height: 114rpx;
	}
	.activity-upload{
		::v-deep .u-preview-wrap{
			overflow: visible;
			.u-delete-icon{
				top: -20rpx;
				right: -20rpx;
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
	.date-wrap{
		display: flex;
		align-items: center;
		.date-input{
			height: 114rpx;
		}
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
	.c-input{
		height: 114rpx;
		color: #8A68F4;
		font-size: 28rpx;
		text-align: right;
		width: 59vw;
		&::-webkit-input-placeholder{
			color: #8C8C8C;
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
		background-color: #000000;
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
	.inputBc{
		padding: 20rpx;
		background-color: #ECECEC;
		border-radius: 10rpx;
		color: #101010;
	}
</style>