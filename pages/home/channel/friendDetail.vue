<template>
	<view class="page">
		<u-navbar
			title="  "
			:autoBack="true"
			:background="{background: 'rgba(255,255,255,0)'}"
			:borderBottom="false"
			titleColor="#000000"
			backIconColor="#000000"
			>
			</u-navbar>
			<view class="user align-center justify-between">
				<view class="left">
					<image src="../../../static/images/logo.png" mode="aspectFit" class="head"></image>
					<view class="desc">
						<view class="name-wrap">
							<text class="name">刘昂上是的</text>
							<image src="//cdn.quxin.chat/icon/lookInterest/man.png" mode="" class="icon"></image>
							<image src="//cdn.quxin.chat/icon/friendDetail/icon.png" mode="" class="icon-2"></image>
						</view>
						<view class="fc-8c fs-24">趣信号：123451</view>
					</view>
				</view>
				<view class="right">
					<text class="address">中国深圳市</text>
					<view>
						<image src="//cdn.quxin.chat/icon/lookInterest/market-blue.png" class="icon-3"></image>
						<text class="count">150m</text>
					</view>
				</view>
			</view>
			
			<view class="container">
				<view class="mark bb">刚搬来这，想认识附近喜欢打球的朋友</view>
				<view class="section bb">
					<view class="list">
						<u-image src="../../../static/images/logo.png" radius="33rpx" width="165" height="147" lazyLoad class="pic"></u-image>
						<u-image src="../../../static/images/logo.png" radius="33rpx" width="165" height="147" lazyLoad class="pic"></u-image>
						<u-image src="../../../static/images/logo.png" radius="33rpx" width="165" height="147" lazyLoad class="pic"></u-image>
						<u-image src="../../../static/images/logo.png" radius="33rpx" width="165" height="147" lazyLoad class="pic"></u-image>
						<u-image src="../../../static/images/logo.png" radius="33rpx" width="165" height="147" lazyLoad class="pic"></u-image>
					</view>
				</view>
				
				<view class="section bb">
					<view class="tit">TA的兴趣<text class="badge">9</text></view>
					<view class="list">
						<view class="text-item">美食</view>
						<view class="text-item">美食</view>
						<view class="text-item">美食</view>
						<view class="text-item">美食</view>
						<view class="text-item">美食</view>
					</view>
				</view>
				
				<view class="section bb">
					<view class="tit">TA的活动<text class="badge">9</text></view>
					<view class="list">
						<view class="pic-item">
							<u-image src="../../../static/images/logo.png" radius="33" width="165" height="147" lazyLoad class="pic"></u-image>
							<view class="item-mark">
								<view class="status status-1">进行中</view>
							</view>
						</view>
						<view class="pic-item">
							<u-image src="../../../static/images/logo.png" radius="33" width="165" height="147" lazyLoad class="pic"></u-image>
							<view class="item-mark">
								<view class="status">已结束</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="section bb">
					<view class="tit">共同好友<text class="badge">9</text></view>
					<view class="list">
						<view class="pic-item">
							<u-image src="../../../static/images/logo.png" radius="33" width="165" height="147" lazyLoad class="pic"></u-image>
							<view class="item-mark">浪浪山小猪</view>
						</view>
						<view class="pic-item">
							<u-image src="../../../static/images/logo.png" radius="33" width="165" height="147" lazyLoad class="pic"></u-image>
							<view class="item-mark">浪浪山小猪</view>
						</view>
					</view>
				</view>
				
				<view class="section bb">
					<view class="tit">TA的动态<text class="tit-2">非好友不能查看</text></view>
					<view class="list">
						<view class="pic-item">
							<u-image src="../../../static/images/logo.png" radius="33" width="165" height="147" lazyLoad class="pic"></u-image>
							<view class="item-mark">浪浪山小猪</view>
						</view>
						<view class="pic-item">
							<u-image src="../../../static/images/logo.png" radius="33" width="165" height="147" lazyLoad class="pic"></u-image>
							<view class="item-mark">浪浪山小猪</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="btns align-center justify-between">
				<view class="btns-list align-center">
					<view class="btn">
						<image src="//cdn.quxin.chat/icon/friendDetail/icon-1.png" class="icon"></image>
						分享
					</view>
					<view class="btn">
						<image src="//cdn.quxin.chat/icon/friendDetail/icon-2.png" class="icon"></image>
						拉黑
					</view>
					<view class="btn">
						<image src="//cdn.quxin.chat/icon/friendDetail/icon-3.png" class="icon"></image>
						投诉
					</view>
				</view>
				<view class="shake-btn">摇他</view>
			</view>
	</view>
</template>

<script>
	// 其他用户详情
	export default {
		name: 'FriendDetail'
	}
</script>

<style lang="scss" scoped>
	.page{
		background-color: #000;
		background-position: center 0;
		background-size: 100% auto;
	}
	.user{
		padding: 165rpx 52rpx 30rpx;
		.left{
			display: flex;
			align-items: center;
		}
		.head{
			width: 156rpx;
			height: 156rpx;
			border-radius: 50%;
			flex-shrink: 0;
			margin-right: 46rpx;
		}
		.name-wrap{
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			margin-bottom: 22rpx;
			.name{
				color: #FEFEFE;
				font-size: 36rpx;
				font-weight: bold;
			}
		}
		.icon{
			flex-shrink: 0;
			width: 26rpx;
			height: 26rpx;
			margin: 0 12rpx;
			&-2{
				width: 24rpx;
				height: 29rpx;
			}
			&-3{
				width: 18rpx;
				height: 19rpx;
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			align-items: flex-end;
		}
		.address{
			color: #fff;
			font-size: 28rpx;
			text-align: right;
			margin-bottom: 22rpx;
		}
		.count{
			color: #fff;
			font-size: 24rpx;
			text-align: right;
		}
	}
	.container{
		background-color: #FBF8FF;
		border-top-left-radius: 80rpx;
		border-top-right-radius: 80rpx;
		color: #000;
		font-size: 28rpx;
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
			height: 96rpx;
			line-height: 96rpx;
			margin: 0 0 0 42rpx;
		}
		.section{
			padding-top: 34rpx;
			padding-bottom: 34rpx;
			margin-left: 42rpx;
		}
		.tit{
			display: block;
			font-weight: bold;
			color: #000;
			font-size: 30rpx;
			margin-bottom: 28rpx;
			display: flex;
			align-items: center;
			&-2{
				margin-left: 28rpx;
				font-size: 24rpx;
				color: #8c8c8c;
				font-weight: normal;
			}
			.badge{
				margin-left: 11rpx;
				height: 31rpx;
				line-height: 30rpx;
				text-align: center;
				color: #Fff;
				background-color: #000;
				font-size: 24rpx;
				min-width: 31rpx;
				border-radius: 200rpx;
				padding: 0 10rpx;
				box-sizing: border-box;
			}
		}
		.list{
			display: flex;
			flex-wrap: nowrap;
			overflow-x: scroll;
		}
		.pic{
			flex-shrink: 0;
			margin-right: 21rpx;
			border-radius: 33rpx;
			overflow: hidden;
		}
		.text-item{
			width: 171rpx;
			height: 99rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(237,224,254,0.18);
			border-radius: 250rpx;
			font-size: 28rpx;
			text-align: center;
			line-height: 98rpx;
			margin-right: 21rpx;
		}
	}
	.item-mark{
		padding: 12rpx 0 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #24223C;
		font-size: 28rpx;
	}
	.pic-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 21rpx;
		.pic{
			margin: 0 auto;
		}
	}
	.status{
		width: 122rpx;
		height: 41rpx;
		background: #F2F2F2;
		box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(237,224,254,0.18);
		border-radius: 18rpx;
		color: #8c8c8c;
		text-align: center;
		&-1{
			// 进行中
			background: #D6F389;
			color: #000;
		}
	}
	.btns{
		// position: fixed;
		// left: 0;
		// right: 0;
		// bottom: 0;
		color: #000;
		font-size: 30rpx;
		background-color: #FBF8FF;
		padding: 20rpx 51rpx 68rpx;
		.icon{
			width: 29rpx;
			height: 29rpx;
			margin-bottom: 8rpx;
		}
		&-list{
			.btn{
				margin-right: 50rpx;
				font-size: 24rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
		.shake-btn{
			width: 306rpx;
			height: 99rpx;
			background: #D6F389;
			box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(237,224,254,0.18);
			border-radius: 50rpx;
			text-align: center;
			line-height: 98rpx;
		}
	}
</style>