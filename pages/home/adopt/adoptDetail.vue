<template>
	<view class="page">
		<u-navbar
			title="领养详情"
			:autoBack="true"
			:background="{background: 'rgba(255,255,255,0)'}"
			:borderBottom="false"
			titleColor="#000000"
			backIconColor="#000000"
			>
			</u-navbar>
			<view class="bg"></view>
			<view class="banner-wrap">
				<image src="//cdn.quxin.chat/icon/adoptDetail/banner.png"  mode="widthFix" class="banner"></image>
				<view class="h1">趣有公益</view>
				<view class="h2">
					<text class="text">不离不弃</text>
					<text class="text">不转赠不丢弃</text>
				</view>
			</view>
			<view class="user align-center justify-between">
				<view class="left">
					<image src="../../../static/images/logo.png" mode="aspectFit" class="head"></image>
					<view class="desc">
						<view class="name-wrap">
							<text class="name">刘昂上是的</text>
							<image src="//cdn.quxin.chat/icon/lookInterest/man.png" mode="" class="icon"></image>
						</view>
					</view>
				</view>
				<view class="right">
					<view>
						<image src="//cdn.quxin.chat/icon/lookInterest/market-blue.png" class="icon-2"></image>
						<text class="address">深圳海上世界</text>
						<image src="//cdn.quxin.chat/icon/lookInterest/right.png" class="icon-3"></image>
					</view>
				</view>
			</view>
			
			<view class="traits align-center u-flex-nowrap">
				<text class="i">狸花猫</text>
				<text class="i">1-3岁</text>
			</view>
			
			<view class="slide-wrap">
				<swiper next-margin="226rpx" class="swiper" circular>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../../static/images/head_bg.png" class="pic"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="../../../static/images/head_bg.png" class="pic"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="dots align-center justify-center">
					<text class="dot"></text>
				</view>
			</view>
			
			<view class="container">
				
				<view class="section bb">
					<view class="tit">
						<image src="//cdn.quxin.chat/image/add-friend/icon-5.png" class="icon"></image>它的介绍
					</view>
					<view class="description">
						<view>大胖橘五个月了 公 亲人 性格活泼大胆 非常健康 一个多月小区救助的 已经打了第一针疫苗和每个月驱虫 因为原住民胆子小 家里住的地方也太小 没办法照顾两只猫 现在找领养</view>
						<view>领养要求：要求封窗 成年绝育 科学喂养 不随意弃养 田园猫好养活不容易生病适合新手铲屎官 领养赠送猫粮和猫砂还有猫砂盆。</view>
						<view>联系人：小杨</view>
						<view>联系电话：12345678909</view>

					</view>
				</view>
				
				<view class="section bb">
					<view class="tit tit-nomb">
						<image src="//cdn.quxin.chat/image/add-friend/icon-8.png" class="icon"></image>性别要求
						<text class="badge">不限</text>
					</view>
				</view>
				
				<view class="section bb">
					<view class="tit tit-nomb">
						<image src="//cdn.quxin.chat/icon/adoptDetail/icon-1.png" class="icon"></image>年龄要求
						<text class="badge">18-50</text>
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
						<image src="//cdn.quxin.chat/icon/friendDetail/icon-3.png" class="icon"></image>
						投诉
					</view>
				</view>
				<view class="shake-btn">摇TA</view>
			</view>
	</view>
</template>

<script>
	// 领养详情
	export default {
		name: 'AdoptDetail'
	}
</script>

<style lang="scss" scoped>
	.page{
		background-position: center 0;
		background-size: 100% auto;
		color: #000;
		font-size: 28rpx;
	}
	.bg{
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 813rpx;
		background: linear-gradient(180deg, #8BB224, #FBF8FF);
		opacity: 0.5;
		pointer-events: none;
	}
	.banner-wrap{
		position: relative;
		color: #fff;
		.h1{
			position: absolute;
			top: 80rpx;
			left: 88rpx;
			font-weight: bold;
			font-size: 38rpx;
		}
		.h2{
			position: absolute;
			top: 142rpx;
			left: 88rpx;
			font-size: 28rpx;
			opacity: .5;
			.text{
				display: block;
			}
		}
	}
	.banner{
		width: 697rpx;
		height: 347rpx;
		display: block;
		margin: 0 auto;
	}
	.user{
		padding: 66rpx 39rpx 0 42rpx;
		.left{
			display: flex;
			align-items: center;
		}
		.head{
			width: 90rpx;
			height: 90rpx;
			border-radius: 50%;
			flex-shrink: 0;
			margin-right: 21rpx;
		}
		.name-wrap{
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			.name{
				color: #24223C;
				font-size: 30rpx;
				font-weight: bold;
			}
		}
		.icon{
			flex-shrink: 0;
			width: 26rpx;
			height: 26rpx;
			margin: 0 12rpx;
			&-2{
				width: 18rpx;
				height: 19rpx;
				margin-right: 12rpx;
			}
			&-3{
				width: 7rpx;
				height: 13rpx;
				margin-left: 12rpx;
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			align-items: flex-end;
		}
		.address{
			color: #000;
			font-size: 24rpx;
			text-align: right;
			margin-bottom: 22rpx;
		}
		.count{
			color: #fff;
			font-size: 24rpx;
			text-align: right;
		}
	}
	.traits{
		padding: 40rpx 0 44rpx 42rpx;
		overflow-x: scroll;
		.i{
			flex-shrink: 0;
			width: 113rpx;
			height: 40rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(237,224,254,0.18);
			border-radius: 200rpx;
			text-align: center;
			line-height: 38rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-right: 12rpx;
		}
	}
	.slide-wrap{
		margin-left: 42rpx;
		.swiper{
			height: 451rpx;
		}
		.pic{
			width: 455rpx;
			height: 451rpx;
			border-radius: 33rpx;
		}
		.dots{
			margin: 22rpx 0 0;
			.dot{
				width: 10rpx;
				height: 10rpx;
				background: #DFDAE5;
				border-radius: 50%;
				margin: 0 3rpx;
				&.active{
					background: #8BB224;
				}
			}
		}
	}
	.container{
		background-color: #FBF8FF;
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
		.description{
			padding-right: 33rpx;
		}
		.tit{
			display: block;
			font-weight: bold;
			color: #000;
			font-size: 30rpx;
			margin-bottom: 28rpx;
			display: flex;
			align-items: center;
			&-nomb{
				margin-bottom: 0;
			}
			.icon{
				width: 25rpx;
				height: 29rpx;
				margin-right: 15rpx;
			}
			&-2{
				margin-left: 28rpx;
				font-size: 24rpx;
				color: #8c8c8c;
				font-weight: normal;
			}
			.badge{
				margin-left: 20rpx;
				height: 41rpx;
				line-height: 40rpx;
				text-align: center;
				color: #000;
				background-color: #fff;
				font-size: 28rpx;
				min-width: 113rpx;
				border-radius: 200rpx;
				padding: 0 10rpx;
				box-sizing: border-box;
				box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(237,224,254,0.18);
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