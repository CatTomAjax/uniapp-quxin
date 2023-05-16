<template>
	<view class="page">
		<u-navbar
			title="活动详情"
			:autoBack="true"
			:background="{background: 'rgba(255,255,255,0)'}"
			:borderBottom="false"
			titleColor="#000000"
			backIconColor="#000000"
			>
			</u-navbar>
			
			<view class="container">
				<view class="mark">
					<view class="tag tag-1">篮球</view>
					<view class="tag tag-2">进行中</view>
					<view class="text">都是固定发发</view>
				</view>
				
				<view class="user">
					<view class="top align-center justify-between">
						<view class="align-center">
							<image src="../../../static/images/logo.png" class="icon"></image>
							<view class="name">阿斯风格</view>
						</view>
						<view class="align-center">
							<image src="../../../static/images/logo.png" class="icon-1"></image>
							<view class="fc-8c">2022.2.2</view>
						</view>
					</view>
					<view class="bottom align-center">
						<image  src="../../../static/images/logo.png" class="icon"></image>
						<view>最好玩的一群小伙伴组织的最好的活动
等你来呀</view>
					</view>
				</view>
				
				<view class="row">
					<view class="label">
						<image src="//cdn.quxin.chat/icon/activityDetail/icon-6.png" class="icon"></image>
						<text class="text">活动时间</text>
					</view>
					<view class="v">
						每周周五晚20点
					</view>
				</view>
				<view class="row row-pb">
					<view class="label">
						<image src="//cdn.quxin.chat/icon/activityDetail/icon-3.png" class="icon"></image>
						<text class="text">活动地点</text>
					</view>
					<view class="v">
						海上世界广场海上世界广场海上世界广场海上世界广场
						<image src="//cdn.quxin.chat/icon/activityDetail/icon-3.png"  class="icon"></image>
					</view>
				</view>
				<view class="row">
					<view class="label">
						<image src="//cdn.quxin.chat/image/add-friend/icon-3.png" class="icon"></image>
						<text class="text">活动人数</text>
					</view>
					<view class="v">10人</view>
				</view>
				<view class="row">
					<view class="label">
						<image src="//cdn.quxin.chat/image/add-friend/icon-8.png" class="icon"></image>
						<text class="text">性别要求</text>
					</view>
					<view class="v">不限</view>
				</view>
				<view class="row">
					<view class="label">
						<image src="//cdn.quxin.chat/image/add-friend/icon-8.png" class="icon"></image>
						<text class="text">参与费用</text>
					</view>
					<view class="v">￥0</view>
				</view>
				<view class="row row-pb">
					<view class="label">
						<image src="//cdn.quxin.chat/image/add-friend/icon-5.png" class="icon"></image>
						<text class="text">活动详情</text>
					</view>
					<view class="v">一起来ikun</view>
				</view>
				<view class="row">
					<view class="label">
						<image src="//cdn.quxin.chat/image/add-friend/icon-8.png" class="icon"></image>
						<text class="text">当前参与</text>
					</view>
					<view class="v">不限</view>
				</view>
				
				<view class="commont-list">
					<view class="comment">
						<image src="../../../static/images/logo.png" class="avatar"></image>
						<view class="desc">
							<view class="name">旺旺</view>
							<view class="cont">
								<view class="text">hhhhhh,不错不错哦</view>
								<view class="date">03-18</view>
							</view>
						</view>
						<view class="like">
							<image src="//cdn.quxin.chat/icon/activityDetail/icon-1.png" class="icon"></image>
							<view class="text">989</view>
						</view>
					</view>
					<view class="comment">
						<image src="../../../static/images/logo.png" class="avatar"></image>
						<view class="desc">
							<view class="name">旺旺</view>
							<view class="cont">
								<view class="text">hhhhhh,不错不错哦</view>
								<view class="date">03-18</view>
							</view>
						</view>
						<view class="like">
							<image src="//cdn.quxin.chat/icon/activityDetail/icon-1.png" class="icon"></image>
							<view class="text">989</view>
						</view>
					</view>
				</view>
				<view class="chatbox">
					<u-input type="text" v-model="comment" placeholder="请输入评论内容.." class="input"/>
					<button class="btn">发送</button>
				</view>
				
			</view>
	</view>
</template>

<script>
	// 活动详情
	export default {
		name: 'ActivityDetail',
		data(){
			return {
				comment: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		background-color: #000;
		background-position: center 0;
		background-size: 100% auto;
	}
	.container{
		background-color: #FBF8FF;
		border-top-left-radius: 80rpx;
		border-top-right-radius: 80rpx;
		color: #000;
		font-size: 28rpx;
		margin-top: 345rpx;
		.bb{
			position: relative;
			&:after{
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				right: 42rpx;
				border-bottom: 1rpx dashed #EEEDEF;
			}
		}
		.mark{
			margin: 0 0 0 42rpx;
			padding: 52rpx 0 57rpx;
			display: flex;
			align-items: center;
			.tag{
				padding: 0 15rpx;
				height: 43rpx;
				line-height: 42rpx;
				color: #8c8c8c;
				background-color: #F2F2F2;
				font-size: 26rpx;
				text-align: center;
				margin-right: 9rpx;
				border-radius: 1000rpx;
				&-1{
					background-color: #7653E2;
					color: #fff;
				}
				&-2{
					background-color: #D6F389;
					color: #637F19;
				}
			}
			.text{
				color: #000;
				font-size: 28rox;
				font-weight: bold;
			}
		}
		.user{
			margin: 0 42rpx;
			border-radius: 50rpx;
			background-color: rgba(118, 83, 226, .1);
			padding: 29rpx 30rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			.top{
				border-bottom: 1rpx dashed #E0D7F5;
				padding-bottom: 26rpx;
				.name{
					
				}
				.icon{
					width: 66rpx;
					height: 66rpx;
					margin-right: 16rpx;
					flex-shrink: 0;
					border-radius: 50%;
					&-1{
						border-radius: 0;
						width: 28rpx;
						height: 28rpx;
						margin-right: 12rpx;
					}
				}
			}
			.bottom{
				color: #BDAEF0;
				padding-top: 33rpx;
				.icon{
					width: 30rpx;
					height: 30rpx;
					margin: 0 37rpx 0 17rpx;
				}
			}
		}
		.row{
			align-items: center;
			justify-content: space-between;
			font-size: 28rpx;
			border-bottom: 1rpx dashed #EEEDEF;
			height: 120rpx;
			margin: 0 36rpx 0 42rpx;
			box-sizing: unset;
			&-pb{
				padding-bottom: 120rpx;
			}
			.label{
				display: flex;
				align-items: center;
				flex-shrink: 0;
				.icon{
					width: 28rpx;
					height: 28rpx;
					margin-right: 15rpx;
				}
				.text{
					
				}
				
			}
			.v{
				padding-left: 14rpx;
				display: flex;
				align-items: center;
				color: #8A68F4;
				.icon{
					width: 26rpx;
					height: 26rpx;
					margin-left: 14rpx;
				}
			}
		}
	}
	.comment{
		margin: 0 36rpx 0 42rpx;
		position: relative;
		padding: 35rpx 84rpx 35rpx 0;
		display: flex;
		overflow: hidden;
		color: #8c8c8c;
		border-bottom: 1rpx dashed #EEEDEF;
		.avatar{
			width: 63rpx;
			height: 63rpx;
			flex-shrink: 0;
			margin-right: 22rpx;
		}
		.name{
			font-size: 26rpx;
			height: 54rpx;
			lighting-color: 30rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.desc{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.cont{
			display: flex;
			.text{
				color: #010101;
			}
			.date{
				width: 120rpx;
				text-align: right;
				flex-shrink: 0;
			}
		}
		.like{
			position: absolute;
			top: 38rpx;
			right: 0;
			.icon{
				width: 36rpx;
				height: 31rpx;
				margin: 0 auto;
				display: block;
			}
			.text{
				margin-top: 12rpx;
			}
		}
	}
	.chatbox{
		background: #FFFFFF;
		border-top-left-radius: 80rpx;
		border-top-right-radius: 80rpx;
		height: 187rpx;
		padding: 38rpx 26rpx 0 38rpx;
		margin: 0 10rpx;
		display: flex;
		justify-content: space-between;
		.input{
			background-color: #F1F1F1;
			color: #000;
			font-size: 28rpx;
			padding: 0 20rpx 0 33rpx;
			border-radius: 1000rpx;
			flex: 1;
			height: 68rpx;
		}
		.btn{
			margin-left: 19rpx;
			flex-shrink: 0;
			width: 150rpx;
			height: 68rpx;
			line-height: 66rpx;
			text-align: center;
			color: #fff;
			font-size: 28rpx;
			background-color: #7653E2;
			border-radius: 1000rpx;
			&:after{
				display: none;
			}
		}
	}
</style>