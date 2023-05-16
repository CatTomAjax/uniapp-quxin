<template>
	<!-- 点击主页兴趣爱好 兴趣看看界面 -->
	<view class="" style="height: 100%;">
		<!-- 地图 s -->
		<view class="map">
			<!-- 头部 s -->
			<view class="header box-sizing" :style="{marginTop: sysInfo.statusBarHeight + 44 + 'px'}">
				<view class="header-info justify-between">
					<view class="house align-center justify-center bc-white" @click="goHome">
						<image class="img" src="//cdn.quxin.chat/icon/lookInterest/back.png"></image>
					</view>
					<view class="inner bc-white align-center justify-between ">
						<view class="select">
							<easy-select ref="easySelect" labelClassName="myfun" size="mini" width="233" borderColor="#EDEDED" fontColor="#000" backgroundColor="#EDEDED" height="86" borderRadius="1000" iconColor="#000"
								:value="queryParams.myfun" :options="interestBaseList" @selectOne="handleSelect"></easy-select>
						</view>
						<view class="acea-row address" @click="updateUser">
							<image class="icon" src="//cdn.quxin.chat/icon/lookInterest/market-blue.png" mode=""></image>
							<text class="address-text tx-over" style="white-space: nowrap !important;">{{userInfo.userLocation || '暂无'}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 头部 e -->
			<map id="map" :layer-style='5' style="height: 100%;width: 100%;" show-location :latitude="userInfo.latitude"
				:longitude="userInfo.longitude" :markers="marker" :scale="scale" @markertap="markertap" >
				 <cover-view slot="callout">
					 <block v-for="(item, index) in marker" :key="index">
						 <cover-view :marker-id="item.id" v-if="curMarkerId === item.id">
								 <!-- 有activityType字段是活动 -->
							 <activity-card :model="item.model" v-if="item.model.activityType >= 0"></activity-card>
							 <people-card :model="item.model" else></people-card>
								 
						 </cover-view>
					 </block>
				 </cover-view>
				</map>

<!-- 				<people-card v-if="false"></people-card>
				<activity-card v-if="false"></activity-card> -->

			<view class="geo align-center justify-center" @click="moveToUserLatLng">
				<image
					src="//cdn.quxin.chat/icon/lookInterest/geo.png"
					mode="scaleToFill"
					class="image"
				/>
			</view>
			<view class="map-describe-float align-center justify-center" @click="mapDescribeVisible = !mapDescribeVisible">
				<text v-if="!mapDescribeVisible">Tips</text>
				<image
					src="//cdn.quxin.chat/icon/lookInterest/back.png"
					mode="scaleToFill"
					class="icon"
					v-else
				/>
			</view>
			<view :class="['map-describe', 'px-24', 'box-sizing', mapDescribeVisible && 'show']">
				<view class="map-describe-info acea-row row-middle row-between  bc-white px-24">
					<view v-for="(item,index) in iconNote" :key="index" class="tabbar row row-middle" :class="curIconIndex === index && item.flag ? 'icon-list-active' : ''">
						<image :src="item.icon" mode=""></image>
						<view class="fs-20">
							<p class="fc-333 fw">{{item.name}}</p>
							<p class="fc-999 mar-t8">{{item.desc}}</p>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 地图 e -->
		<!-- 附近用户列表 s -->
		<view class="list">
			<u-sticky>
				<view class="bar align-center justify-between">
					<view class="nearby-bar align-center">
						<view :class="{'item': !0, active: item.active}" v-for="(item, index) in nearbyBarConf" :key="index" @click="doSelectType(index)">{{ item.label }}</view>
					</view>

					<view class="sort-bar justify-end fc-000 fw fs-28">
						<view class="item align-center" v-for="(item, index ) in list" :key="index">
							<picker @change="bindSortChange($event, item)" mode="selector" :value="item.value" :range="item.data" range-key="text" :header-text="item.title">
								<text class="mar-r8 text">{{ item.value !== null ? item.data[item.value].text : item.title }}</text>
								<uni-icons type="bottom" color="#000" size="20rpx"></uni-icons>
							</picker>
						</view>
					</view>
					
					<!-- <smh-select :list="list" @change="handleDropdown"></smh-select> -->
					
				</view>
			</u-sticky>

			<view class="px-24">
				<view v-for="(item,index) in peopleList" :key="index"
					class="list-item acea-row row-between row-middle px-24 mar-t20 br-24" @click="doSelectItem('people', item)">
					<image class="avatar" :src="item.avatar" mode=""></image>
					<view class="flex1 acea-column row-between fs-26">
						<view class="acea-row row-middle fc-999 mar-b20">
							<span class="name fw">{{item.name}}</span>
							<image class="icon mar-r8" :src="item.sex === 1 ? '../../../static/images/home/man.png' : '../../../static/images/home/lookInterest/woman.png'" mode=""></image>
						</view>
						<view class="remark fc-8c8c8c fs-24 line1">{{item.remarks}}</view>
					</view>
					<view class="flex-col fs-24 align-end">
						<text class="distance mar-b20">{{item.currentDistance}}</text>
						<text class="fc-8c8c8c">{{ item.latestLaunchMinute }}前</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 看看-摇人-频道 -->
		<InterestTabbar @change="onInterestTabbarChange"/>
	</view>
</template>

<script>
	import {
		user
	} from '@/api/commonapi/user.js'
	import {
		activity
	} from '@/api/commonapi/activity.js'
	import {
		interest
	} from '@/api/commonapi/interest.js'
	import { formatDuring } from "@/common/util.js"
	import PeopleCard from '@/components/people-card/people-card'
	import ActivityCard from '@/components/activity-card/activity-card'
	import { ActivityTypeEnum, InterestTabbarType, MakeFriendsFlagEnum } from '../../../constant/activity'
	import InterestTabbar from '@/components/interest-tabbar/interest-tabbar.vue'
	const TabType = {
		people: 'people',
		activity: 'activity'
	};
	export default {
		components: {
			PeopleCard,
			ActivityCard,
			InterestTabbar
		},
		data() {
			return {
				TabType,
				ActivityTypeEnum,
				currentInterest: '',
				iconNote: [
					{name:'TA还不想交友', desc: 'TA想先看看', icon:"//cdn.quxin.chat/icon/lookInterest/people2.png",data: 0,type: TabType.people,flag: false},
					{name:'TA想交友', desc: '快去打个招呼', icon:"//cdn.quxin.chat/icon/lookInterest/people1.png",data: 0, type: TabType.activity,flag: false},
					{name:'附近活动', desc: '快加入他们吧', icon:"//cdn.quxin.chat/icon/lookInterest/people3.png",data: 1,type: TabType.activity,flag: false}
				],
				mapDescribeVisible: false, // 显示:TA还不想交友/TA想交友/附近活动工具栏
				curIconIndex: '',
				scale: 11, //缩放级别
				bottomData: false,
				marker: [],
				markerKey: 0, // 用于解决地图缓存问题
				peopleList: [], // 人员列表
				activityList: [], // 活动列表
				queryParams: {
					current: 1,
					size: 1000,
					// myfunBaseId: '',
					// myfun: ''
				},
				total: 0,
				type: 'people',
				interestBaseList: [],// 用户基础表数据
				nearbyBarConf: [
					{label: '附近摇人', active: true, type: TabType.people},
					{label: '附近活动', active: false, type: TabType.activity},
				],
				list:[
					// {
					// 	title:'附近的摇人',
					// 	data:[
					// 		{text:'附近的摇人',identity:'附近的摇人',status:false,type: 'nearby'},
					// 	]
					// },
					{
						title:'排序',
						value: null,
						type: 'sex',
						data:[
							{text:'只看女性',identity:0,status:false,type: 'sex'},
							{text:'只看男性',identity:1,status:false,type: 'sex'},
							{text:'距离优先',identity:'',status:false,type: 'nearby'},
						]
					},
					{
						title:'距离',
						value: null,
						type: 'distance',
						data:[
							{text:'1KM',identity:1,status:false,type: 'distance'},
							{text:'3KM',identity:3,status:false,type: 'distance'},
							{text:'5KM',identity:5,status:false,type: 'distance'},
							{text:'10KM',identity:10,status:false,type: 'distance'},
						]
					},
				],
				curMarkerId: '',//当前显示的callout markerid
			}
		},
		computed: {
			mapheight() {
				let data = ''
				if (this.bottomData) {
					if (this.upTop) {
						data = '50px'
					} else {
						data = '200px'
					}
				} else {
					data = '90vh'
				}
				return data
			},
			coverbottom() {
				let data = ''
				if (this.bottomData) {
					data = '20rpx'
				} else {
					data = '100rpx'
				}
				return data
			}
		},
		onShow() {
			// 默认展示用户表里经纬度位置
			this.clearMarker()
			this.getInterestList() // 获取兴趣基础表数据
			this.getUserList(true, 'people') // 获取用户列表
			this.getActivityList(true)
		},
		onLoad(options) {
			this.mapCtx = uni.createMapContext('map')
			if(options) {
				let data = JSON.parse(options.interest)
				this.queryParams.myfun = data.myfun
				this.queryParams.myfunBaseId = data.id
			}
		},
		onReachBottom() {
			// 列表分页注释
			// let query = this.queryParams
			// if (query.current * query.size >= this.total) {
			// 	wx.showToast({
			// 		title: '没有更多数据了',
			// 		icon: 'none',
			// 		duration: 1000
			// 	});
			// 	setTimeout(() => {
			// 		wx.hideLoading()
			// 	}, 500)
			// } else {
			// 	if (query.current <= query.current - 1) {
			// 		setTimeout(() => {
			// 			wx.hideLoading()
			// 		}, 500)
			// 	} else {
			// 		wx.showLoading({
			// 			title: '加载中'
			// 		});
			// 		query.current = query.current + 1
			// 		this.queryParams = query
			// 		this.getUserList(false, this.type)
			// 	}
			// }
			
		},
		methods: {
			goHome(){
				uni.navigateBack()
			},
			// 筛选兴趣
			handleSelect(options) {
				this.queryParams.myfun = options.myfun
				this.queryParams.myfunBaseId = options.id
				// 默认展示用户表里经纬度位置
				this.clearMarker()
				this.getUserList(true)
				this.getActivityList(true)
			},
			// 默认展示用户表里经纬度位置
			clearMarker() {
				this.curMarkerId = 0
				this.marker = [{
					id:0,
					latitude: this.userInfo.latitude, //纬度
					longitude: this.userInfo.longitude, //经度
					iconPath: '//cdn.quxin.chat/icon/marker.png', //显示的图标
					rotate: 0, // 旋转度数
					width: 36, //宽
					height: 37 //高
				}]
			},
			// 点击icon搜索地图或列表
			handleSearch(value,type, flag, index) {
				// flag: 记录按钮点击的状态，当所有按钮状态都是false时，接口默认传约定参数不传 true 约定参数传
				this.iconNote[index].flag = !this.iconNote[index].flag
				flag = !flag
				this.type = type
				this.curIconIndex = index
				// 默认展示用户表里经纬度位置
				this.clearMarker()
				if(type === 'people') {
					// 点击高亮他还不想交友
					if(flag) this.queryParams.makeFriendsFlag = 0 // 点击icon他还不想交友
					else{
						// 取消高亮 则 获取全部数据
						delete this.queryParams.makeFriendsFlag
						this.getActivityList(true)
					}
					this.getUserList(true)
				}else {
				// 点击高亮活动
					if(flag) {
						// 根据活动类型获取活动列表
						this.getActivityList(!flag, value)
					} else {
						// 取消高亮 则获取全部数据
						this.getActivityList(true)
						this.getUserList(true)
					}
					
				}
			},
			// 排序/距离筛选
			handleDropdown(item) {
				console.log(item);
				switch (item.type){
					// 选择距离
					case 'distance':
						this.queryParams.distance = item.data[item.value].identity
						break;
					// 选择附近的摇人
					case 'nearby':
						this.queryParams.latitude = this.userInfo.latitude
						this.queryParams.longitude = this.userInfo.longitude
						break;
					// 选择性别
					case 'sex':
						this.queryParams.sex = item.data[item.value].identity
						break;
					default:
						break;
				}
				
				this.getUserList(true)
			},
			// 获取 兴趣关联用户列表
			getUserList(refresh) {
				this.queryParams.currentUserId = this.userInfo.id
				this.queryParams.isNotOneself = this.userInfo.id
				interest.interestPage(this.queryParams).then(res => {
					if (res.code === 200) {
						// 分页注释
						// this.peopleList = [...this.peopleList, ...res.data.records]
						this.peopleList = res.data.records
						// this.total = res.data.total
						let marker = this.peopleList.map((item,index) => {
							return {
								id: item.id,
								latitude: item.latitude, //纬度
								longitude: item.longitude, //经度
								iconPath: +item.makeFriendsFlag === MakeFriendsFlagEnum.yes ? '/static/images/home/lookInterest/people1.png' : '/static/images/home/lookInterest/people2.png', //显示的图标
								rotate: 0, // 旋转度数
								width: 26, //宽
								height: 28, //高
								customCallout: {
									display: 'ALWAYS',
									anchorY: 0,
									anchorX: 0,
								},
								model: item
							}
						})
						this.marker = [...this.marker, ...marker]
						this.peopleList.forEach((item,index)=>{
							item.latestLaunchMinute = formatDuring(Number(item.latestLaunchMinute) * 60 * 1000)
							if(item.currentDistance > 1000){
								item.currentDistance = (item.currentDistance / 1000).toFixed(2) + 'km'
							} else {
								item.currentDistance = item.currentDistance + 'm'
							}
						})
					}
				})
			},
			// 获取活动列表用于地图展示
			getActivityList(refresh, activityType) {
				let params = {
					myfunBaseId: this.queryParams.myfunBaseId,
					activityType,
					current: 1,
					size: 1000,
					userId:this.userInfo.id
				}
				if(refresh) {
					delete params.activityType
					this.activityList = []
				}
				activity.list(params).then(res => {
					if(res.code === 200) {
						let marker = res.data.records.map((item,index) => {		
							// markerid必须为数值
							const id =  typeof item.id === 'string' ? item.id.substr(3) : id
							return {
								id: +id,
								latitude: item.latitude, //纬度
								longitude: item.longitude, //经度  
								iconPath: item.activityType === ActivityTypeEnum.makeFriend ? '/static/images/home/lookInterest/people1.png' :  '/static/images/home/lookInterest/people3.png', //显示的图标 
								rotate: 0, // 旋转度数
								width: 26, //宽
								height: 28, //高
								activityType: item.activityType,
								activityId: item.id,
								customCallout: {
									display: 'ALWAYS',
									anchorY: 0,
									anchorX: 0,
								},
								model: item
							}
						})
						this.marker = [...this.marker, ...marker]
						this.activityList = [...this.activityList, ...res.data.records]
					}
				})
			},
			// 获取兴趣基础表数据
			getInterestList() {
				let params = {
					current: 1,
					size: 10000
				}
				interest.baseList(params).then(res => {
					if (res.code == 200) {
						this.interestBaseList = res.data.records
					}
				})
			},
			addFriend() {
				uni.navigateTo({
					url: '/pages/home/addFriend/index?myFunId='+ this.queryParams.myfunBaseId + "&type=add"
				})
			},
			addActivity() {
				uni.navigateTo({
					url:'/pages/home/actitivityPeople/index?myFunId='+ this.queryParams.myfunBaseId
				})
			},
			//地图点击事件
			markertap(e) {
				
				var clickmarkerId = e.mp.detail.markerId
				this.curMarkerId = clickmarkerId
				return
				//根据e.mp.detail.markerId跟撒点的id进行判断，如果相等就进行赋值
				for(var i=0;i<this.marker.length;i++){
					if(this.marker[i].id == clickmarkerId){
						if(this.marker[i].activityType == 1){
							// 查询活动详情
							uni.navigateTo({
								url: '/pages/home/activity/index?activityId=' + this.marker[i].activityId
							})
						} else if(this.marker[i].activityType == 0){
							// 查询交友摇人详情
							uni.navigateTo({
								url: '/pages/home/addFriend/index?activityId=' + this.marker[i].activityId + "&type=detail"
							})
						}
					}
				}
			},
			// 修改用户地址
			updateUser() {
				let that = this
				uni.chooseLocation({
					success: async (e) => {
						let params = {
							id: this.userInfo.id,
							deptId: this.userInfo.deptId,
							latitude: e.latitude,
							longitude: e.longitude,
							userLocation: e.name
						}
						if(e.name) {
							await this.$u.func.updateUserInfo(params, !0)
							this.clearMarker()
							this.getUserList(true, 'people') // 获取用户列表
							this.getActivityList(true)
						}
					}
				})
			
			},
			// 排序/距离picker回调
			bindSortChange(e, item){
				console.log(e.detail.value, item);
				item.value = e.detail.value
				this.handleDropdown(item)
			},
			// 摇人
			addPeopleOrActivity(){
				
			},
			onInterestTabbarChange(type){
				if(type === InterestTabbarType.shake){
					uni.navigateTo({
						url: '/pages/home/addPeopleOrActivity/index?myFunId='+ this.queryParams.myfunBaseId
					})
				}else if(type === InterestTabbarType.channel){
					uni.navigateTo({
						url: '/pages/home/channel/index'
					})
				}
				
			},
			// 点击列表
			doSelectItem(action, model){
				this.mapCtx.moveToLocation({
					longitude: model.longitude,
					latitude: model.latitude,
					complete:()=>{
						this.curMarkerId = model.id
					}
				})
			},
			// 选择列表类型
			doSelectType(index){
				this.nearbyBarConf.map((item, i) =>{
					item.active = index === i
				})
				const tab = this.nearbyBarConf[index]
				this.clearMarker()
				if(tab.type === TabType.people){
					delete this.queryParams.makeFriendsFlag
					this.getUserList(true)
				}else{
					this.getActivityList(true)
				}
			},
			// 地图移动到用户当前位置
			moveToUserLatLng(){
				this.mapCtx.moveToLocation({
					longitude: this.userInfo.longitude,
					latitude: this.userInfo.latitude
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 121rpx;
		position: absolute;
		top: 0rpx;
		left: 0;
		z-index: 3;
		padding-left: 34rpx;
		padding-right: 34rpx;
		.header-info {
			height: 100%;

			.house {
				width: 95rpx;
				height: 121rpx;
				border-radius: 33rpx;
				.img{
					width: 16rpx;
					height: 28rpx;
				}
			}
			.inner{
				border-radius: 33rpx;
				flex: 1;
				margin-left: 17rpx;
				padding: 0 38rpx 0 20rpx;
			}
			.select{
				flex: 1;
				/deep/ .easy-select{
					flex-shrink: 0;
					input{
						padding-left: 54rpx;
						font-weight: bold;
					}
				}
			}
			.acea-row{
				flex: 1;
				position: relative;
				align-items: center;
				justify-content: flex-end;
				width: 200rpx;
				.icon {
					width: 18rpx;
					height: 19rpx;
					margin-right: 12rpx;
					flex-shrink: 0;
				}
				.address-text{
					font-size: 24rpx;
					color: #000;
					margin-right: 12rpx;
					white-space: nowrap;
					max-width: 200rpx;
					font-weight: bold;
				}
				&:after{
					position: absolute;
					width: 7rpx;
					height: 13rpx;
					content: "";
					background: url("//cdn.quxin.chat/icon/lookInterest/right.png") no-repeat center center;
					background-size: 100% 100%;
					right: 0;
					top: 50%;
					transform: translateY(-20%);
				}
			}
		}
	}

	.map {
		height: 1046rpx;
		width: 100%;
		position: relative;
		.geo{
			position: absolute;
			right: 35rpx;
			bottom: 260rpx;
			width: 80rpx;
			height: 80rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 3rpx 8rpx 0rpx rgba(166,155,186,0.4);
			border-radius: 50%;
			.image{
				width: 42rpx;
				height: 42rpx;
			}
		}
		.map-describe-float{
			position: absolute;
			right: 35rpx;
			bottom: 154rpx;
			width: 80rpx;
			height: 80rpx;
			background-color: rgba(138,104, 244, .6);
			box-shadow: 0rpx 3rpx 8rpx 0rpx rgba(166,155,186,0.4);
			border-radius: 50%;
			color: #000;
			font-size: 24rpx;
			font-weight: bold;
			z-index: 10;
			.icon{
				width: 10rpx;
				height: 17.5rpx;
				animation: left .8s linear infinite both;
			}
			@keyframes left {
				0%{
					opacity: .2;
					transform: translateX(100%);
				}
				100%{
					opacity: 1;
					transform: translateX(-100%);
				}
			}
		}
		.map-describe {
			position: absolute;
			bottom: 146rpx;
			left: 0;
			z-index: 2;
			height: 100rpx;
			width: 100%;
			z-index: 8;
			transform: scaleX(0);
			transform-origin: 726rpx 50%;
			transition:transform .2s;
			&.show{
				transform: scaleX(1);
			}
			.icon-list-active {
				background-color: antiquewhite;
			}

			.map-describe-info {
				height: 100%;
				padding-right: 135rpx;
				border-radius: 1000rpx;
				image {
					width: 46rpx;
					height: 47rpx;
				}
			}
			.tabbar{
				height: 100rpx;
				
			}
		}
	}

	.list {
		background-color: #FBF8FF;
		border-top-left-radius: 80rpx;
		border-top-right-radius: 80rpx;
		overflow: hidden;
		transform: translateY(-140rpx);
		.bar{
			position: relative;
			padding: 68rpx 36rpx 36rpx;
			background-color: #FBF8FF;
			&::before{
				content: "";
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 22rpx;
				width: 111rpx;
				height: 10rpx;
				background: #000000;
				opacity: 0.2;
				border-radius: 5rpx;
			}
		}
		.nearby-bar{
			width: 360rpx;
			flex-shrink: 0;
			.item{
				width: 171rpx;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
				margin-right: 17rpx;
				background-color: #fff;
				color: #757575;
				font-size: 28rpx;
				border-radius: 1000px;
				&:last-child{
					margin-right: 0;
				}
				&.active{
					background-color: #D6F389;
					color: #000;
				}
			}
		}
		.sort-bar{
			.item{
				margin-left: 20rpx;
				&:last-child{
					.text{
						width: 80rpx;
					}
				}
			}
			.icon{
				width: 26rpx;
				height: 14rpx;
			}
			.text{
				width: 112rpx;
				display: inline-block;
				text-align: right;
			}
		}
		/deep/ .u-dropdown__content{
			height: 100vh !important;
		}

		.list-item {
			height: 118rpx;

			.avatar {
				width: 118rpx;
				height: 118rpx;
				border-radius: 50%;
				margin-right: 26rpx;
			}
			.fc-8c8c8c{
				color: #8C8C8C;
			}
			.name{
				color: #24223C;
				font-size: 30rpx;
			}
			.icon {
				width: 26rpx;
				height: 26rpx;
				margin-left: 13rpx;
			}
			.right{
				.distance{
					color: #000;
				}
			}
		}
	}

	.interest-tabbar {
		position: fixed;
		left: 50%;
		bottom: 0;
		width: 722rpx;
		height: 180rpx;
		transform: translateX(-50%);
		border: 1px solid rgba(255,255,255,0.57);
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(255,255,255,0.18), 0rpx 10rpx 18rpx 0rpx rgba(255,255,255,0.52);
		box-sizing: border-box;
		.bg{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			filter: blur(4rpx);
			background-color: #838383;
			border-top-left-radius: 80rpx;
			border-top-right-radius: 80rpx;
		}
		.inner{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
		}
		.item {
			width: 133rpx;
			height: 107rpx;
			background: #FFFFFF;
			border-radius: 33rpx;
			color: #000;
			text-align: center;
			.icon{
				&1{
					width: 47rpx;
					height: 30rpx;
				}
				&2{
					width: 44rpx;
					height: 43rpx;
				}
				&3{
					width: 43rpx;
					height: 43rpx;
				}
			}
			text{
				padding-top: 9rpx;
				font-weight: 400;
				font-size: 24rpx;
			}
			&.active {
				background-color: #D6F389;
			}
		}
	}
</style>