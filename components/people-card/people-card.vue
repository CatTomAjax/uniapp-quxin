<template>
  <cover-view class="card">
    <cover-view class="top align-center">
      <cover-image
        :src="model.avatar"
        mode="scaleToFill"
        class="avatar mar-r12"
      />
      <cover-view>
        <cover-view class="name align-center">
          <cover-view class="fw fs-22 fc-000 mar-b10">{{model.name}}</cover-view>
          <cover-image
            :src="`//cdn.quxin.chat/icon/${sex === 1 ? 'man': 'woman'}.png`"
            mode="scaleToFill"
            class="sex mar-l10"
          />
        </cover-view>
        <cover-view class="fs-18 fc-000 align-center">
          <cover-image
            src="//cdn.quxin.chat/icon/lookInterest/market-blue.png"
            mode="scaleToFill"
            class="address-icon"
          />
          <cover-view>{{model.currentDistance}}</cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
    <cover-view class="remark flex-row">
      <cover-image
        src="//cdn.quxin.chat/icon/lookInterest/card-remark.png"
        mode="scaleToFill"
        class="remark-icon"
      />
      <cover-view class="fc-8c fs-18 text">{{model.remarks}}</cover-view>
    </cover-view>
    <cover-view class="btns align-center justify-center">
      <cover-view @click="checkDetail" class="btn fs-22 fc-000" aria-role="button">关于TA</cover-view>
      <cover-view @click="shakePeople" class="btn fs-22 fc-fff" aria-role="button" >摇TA</cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  name: 'PeopleCard',
	props: {
		model: {
			type: Object,
			default: ()=>{}
		}
	},
  data(){
    return {

    }
  },
	methods: {
		checkDetail(){
			console.log('@@关于TA');
			uni.navigateTo({
				url: '/pages/home/addFriend/index?activityId=' + this.model.activityId + "&type=detail"
			})
		},
		shakePeople(){
			// 查询活动详情
			uni.navigateTo({
				url: '/pages/home/activity/index?activityId=' + this.model.activityId
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.card{
  position: relative;
  z-index: 11111;

  box-sizing: border-box;
  width: 307rpx;
  height: 235rpx;
  background: #FFFFFF;
  box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(166,155,186,0.4);
  border-radius: 33rpx;
  padding: 18rpx;
  .top{
    height: 58rpx;
    margin-bottom: 25rpx;
  }
  .avatar{
    width: 58rpx;
    height: 58rpx;
    border-radius: 50%;
  }
  .sex{
    width: 20rpx;
    height: 20rpx;
  }
  .remark{
    padding: 0 14rpx;
    display: flex;
		min-height: 2em;
		box-sizing: border-box;
		width: 100%;
		max-height: 2em;
    .text{
      line-height: 1.8em;
    }
  }
  .remark-icon{
    width: 22rpx;
    height: 24rpx;
    margin-right: 16rpx;
    flex-shrink: 0;
  }
  .address-icon{
    width: 14rpx;
    height: 14rpx;
    margin-left: 4rpx;
  }
  .btns{
    margin-top: 20rpx;
    .btn{
      &::after{
        display: none;
      }
      border: 0;
      padding: 0;
      margin: 0 4rpx;
      width: 129rpx;
      height: 49rpx;
      line-height: 47rpx;
      background: #EDEDED;
      box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(237,224,254,0.18);
      border-radius: 1000rpx;
      text-align: center;
      &:last-child{
        background: #F9BB2C;
      }
    }
  }
}
</style>