<template>
	<view class="container">
		<u-navbar :is-fixed="false" :border-bottom="false" :is-back="true" back-icon-name="arrow-leftward"
			back-icon-color="#fff" back-icon-size="35" title="新闻动态" :background="{ background: 'linear-gradient(90deg, #69b0ff, #5f88ff)' }"
			title-color="#fff">
			<image slot="right" src="/static/images/home/message.png" class="message-icon" mode="widthFix"></image>
		</u-navbar>

		<view class="tab">
			<u-tabs :list="tabs" :is-scroll="false" :current="current" active-color="#69b0ff" inactive-color="#595959"
				height="100" @change="change"></u-tabs>
		</view>

		<swiper id="swiperBox" :style="{ height: swiperHeight + 'px' }" :current="current" @change="tabsChange">
			<swiper-item class="swiper-item" v-for="(pitem, pindex) in tabs" :key="pindex">
				<scroll-view scroll-y style="width: 100%;height: 100%;" refresher-enabled
					:refresher-triggered="pitem.triggered" @scrolltolower="onreachBottom"
					@refresherrefresh="refresherrefresh(pindex)" @refresherrestore="refresherrestore(pindex)"
					@refresherabort="refresherabort(pindex)">
					<view class="content">
						<navigator class="news" v-for="(item, index) in contentList[pindex].list" :key="index"
							url="/pages/news/detail" hover-class="none">
							<view class="head">
								<image src="" class="avatar" mode=""></image>
								<view class="info">
									<view class="name">
										中国空间站
										<text class="tag">专栏作家</text>
									</view>
									<view class="date">11-12</view>
								</view>
								<u-icon name="arrow-right" size="35" color="#C5C5C5"></u-icon>
							</view>
							<view class="des">
								天舟五号创造多个航天新纪录。
							</view>
						</navigator>
						<view class="nomore">
							<u-loadmore :status="contentList[pindex].status" />
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperHeight: 0,
				tabs: [{
						name: '互动',
						triggered: false,
						_triggered: false
					},
					{
						name: '动态',
						triggered: false,
						_triggered: false
					},
					{
						name: '通知',
						triggered: false,
						_triggered: false
					}
				],
				contentList: [{
						list: 8,
						page: 1,
						status: 'loadmore'
					},
					{
						list: 8,
						page: 1,
						status: 'loadmore'
					},
					{
						list: 8,
						page: 1,
						status: 'loadmore'
					}
				],
				current: 0
			};
		},
		onLoad() {},
		onReady() {
			let that = this;
			uni.getSystemInfo({
				success(e) {
					console.log(e);
					let {
						windowWidth,
						windowHeight,
						safeArea
					} = e;
					const query = uni.createSelectorQuery().in(that);
					query
						.select('#swiperBox')
						.boundingClientRect(data => {
							that.swiperHeight = safeArea.bottom - data.top;
						})
						.exec();
				}
			});
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1500);
		},
		methods: {
			tabsChange(e) {
				this.current = e.detail.current;
			},
			refresherrefresh(index) {
				console.log('自定义下拉刷新被触发');
				let _this = this;
				if (_this.tabs[index]._triggered) {
					return;
				}
				_this.tabs[index]._triggered = true;
				//界面下拉触发，triggered可能不是true，要设为true
				if (!_this.tabs[index].triggered) {
					_this.tabs[index].triggered = true;
				}

				setTimeout(() => {
					_this.tabs[index].triggered = false; //触发onRestore，并关闭刷新图标
					_this.tabs[index]._triggered = false;
				}, 10);
			},
			refresherrestore(index) {
				console.log('自定义下拉刷新被复位');
				let _this = this;
				_this.tabs[index].triggered = false;
				_this.tabs[index]._triggered = false;
			},
			refresherabort(index) {
				console.log('自定义下拉刷新被中止	');
				let _this = this;
				_this.tabs[index].triggered = false;
				_this.tabs[index]._triggered = false;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				let current = this.current;
				if (this.contentList[current].page >= 3) return;
				this.contentList[current].status = 'loading';
				setTimeout(() => {
					this.contentList[current].page = ++this.contentList[current].page;
					this.contentList[current].list += 10;
					if (this.contentList[current].page >= 3)
						this.contentList[current].status = 'nomore';
					else this.contentList[current].status = 'loading';
				}, 2000);
			},
			change(index) {
				this.current = index;
			}
		}
	};
</script>

<style lang="scss">
	.message-icon {
		width: 32rpx;
		height: auto;
		margin-right: 27rpx;
	}

	.tab {
		margin: 0 0 10rpx;
		border-bottom: 1px solid #e4e7ed;
	}

	.content {
		padding: 0 0 150rpx;

		.news {
			&:not(:last-of-type) {
				border-bottom: 2rpx solid #e4e7ed;
			}
		}
	}

	.nomore {
		padding: 30rpx 20rpx;
	}

	.news {
		margin: 30rpx 30rpx 0;
		padding: 0 0 30rpx;

		.head {
			display: flex;

			.avatar {
				flex-shrink: 0;
				width: 69rpx;
				height: 69rpx;
				background: #ffffff;
				// border: 1px solid #14b9c8;
				border: 1px solid #5f88ff;
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
						margin-left: 15rpx;
						display: inline-block;
						padding: 8rpx 10rpx;
						font-size: 14rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #69b0ff;
						line-height: 21rpx;
						border: 1px solid #69b0ff;
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
		}

		.des {
			margin-top: 40rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			color: #000000;
			line-height: 47rpx;
		}
	}

	.swiper-box {
		height: 100vh;
	}
</style>
