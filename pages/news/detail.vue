<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward" title="新闻详情页"
			:background="{ background: '#fff' }" title-color="#000000">
			<view class="right-nav" slot="right">
				<image src="/static/images/news/search.png" class="icon icon-search" mode="widthFix"></image>
				<image src="/static/images/news/menu.png" class="icon icon-menu" mode="widthFix"></image>
			</view>
		</u-navbar>

		<view class="header">
			<image src="" class="avatar" mode=""></image>
			<view class="info">
				<view class="name">
					中国空间站
					<text class="tag">专栏作家</text>
				</view>
				<view class="date">11-12</view>
			</view>
			<view class="btn">+关注</view>
		</view>

		<view class="content">
			<view class="title">
				天舟五号创造多个航天新纪录
			</view>
			<view class="static">
				<view class="left">
					<view class="block">
						<image src="/static/images/news/gf.png" class="gf"></image>
						官方
					</view>
					<view class="block">
						<image src="/static/images/news/x.png" class="gf"></image>
						焦点新闻
					</view>
				</view>
				<view class="right">
					<image src="/static/images/news/l.png" class="l" mode="widthFix"></image>
					66666
				</view>
			</view>
			<view class="detail">
				<u-parse :html="content"></u-parse>
			</view>
		</view>

		<view class="footer">
			<input type="text" value="" placeholder="说点什么..." class="ipt" />
			<view class="control">
				<view class="block">
					<image src="/static/images/news/c.png" class="icon c" mode="widthFix"></image>
					458
				</view>
				<view class="block">
					<image src="/static/images/news/s.png" class="icon s" mode="widthFix"></image>
				</view>
				<view class="block">
					<image src="/static/images/news/t.png" class="icon t" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				content: `<p>在北京航天飞行控制中心拍摄的天舟五号货运飞船与空间站组合体完成自主快速交会对接示意图。孙丰晓摄（新华社发）</p>
				<p>北京时间2022年11月12日10时03分，在文昌航天发射场，搭载天舟五号货运飞船的长征七号遥六运载火箭点火发射，将天舟五号货运飞船送入预定轨道。随后，天舟五号货运飞船与在轨运行的空间站组合体进行自主快速交会对接，中国航天员首次在空间站迎接货运飞船来访。</p>
				<p>朝着在距离地面约400公里轨道上运行的中国空间站组合体，天舟五号首次实现2小时自主快速交会对接，创造世界纪录。这一技术突破对于提升我国空间交会对接水平，提升空间站任务应急物资补给能力具有重要意义。</p>
				<p>空间站阶段最快交会对接，让人类航天器交会对接用时进入“2小时”时代。</p>
				<p>此次任务是中国空间站“T”字基本构型在轨组装完成后，“太空快递”首次送达，执行运输任务的仍是长七火箭。</p>`
			};
		}
	};
</script>

<style lang="scss">
	.container {
		padding: 0 0 150rpx;
	}

	.right-nav {
		display: flex;
		align-items: center;
		margin-right: 40rpx;

		.icon {
			height: auto;

			&-search {
				width: 40rpx;
				margin-right: 40rpx;
			}

			&-menu {
				width: 40rpx;
			}
		}
	}

	.header {
		display: flex;
		align-items: center;
		padding: 44rpx;

		.avatar {
			flex-shrink: 0;
			width: 69rpx;
			height: 69rpx;
			background: #ffffff;
			border: 1px solid #69b0ff;
			border-radius: 50%;
		}

		.info {
			flex: 1;
			margin-left: 14rpx;

			.name {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #000000;
				line-height: 36rpx;

				.tag {
					margin-left: 10rpx;
					display: inline-block;
					padding: 8rpx 10rpx;
					font-size: 14rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #4cbeca;
					line-height: 21rpx;
					border: 1px solid #0bb9c8;
					border-radius: 6px;
				}
			}

			.date {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #a3a3a3;
				line-height: 36rpx;
			}
		}

		.btn {
			padding: 8rpx 19rpx;
			background: #e6e6e6;
			border-radius: 6rpx;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #4cbeca;
			line-height: 1;
		}
	}

	.content {
		padding: 0 44rpx;

		.title {
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #000000;
			line-height: 47rpx;
		}

		.static {
			margin-top: 34rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left,
			.right {
				display: flex;
				align-items: center;

				.block {
					display: flex;
					align-items: center;
					margin-right: 10rpx;
				}
			}

			.left {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #787878;
				line-height: 1;

				.gf {
					width: 24rpx;
					height: 24rpx;
					margin-right: 8rpx;
				}
			}

			.right {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #787878;
				line-height: 1;

				.l {
					width: 25rpx;
					height: auto;
					margin-right: 6rpx;
				}
			}
		}

		.detail {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 47rpx;
			margin-top: 50rpx;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		height: 100rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;

		.ipt {
			width: 380rpx;
			height: 77rpx;
			background: #f7f7f7;
			border-radius: 38px;
			padding: 0 37rpx;
			box-sizing: border-box;
			margin-right: 20rpx;
		}

		.control {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.block {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;
			}

			.icon {
				height: auto;
			}

			.c {
				width: 41rpx;
				margin-right: 10rpx;
			}

			.s {
				width: 36rpx;
			}

			.t {
				width: 31rpx;
			}
		}
	}
</style>
