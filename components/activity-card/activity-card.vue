<template>
  <cover-view class="card flex-row bc-fff">
    <cover-image
      src="https://wx1.sinaimg.cn/mw690/005HGRfwgy1hbtn8phminj30u00u0gq3.jpg"
      mode="scaleToFill"
      class="poster"
    />
    <cover-view class="cont flex-col justify-between">
      <cover-view class="title align-center">
        <cover-view class="tag fc-fff">{{ActivityStatusLableEnum[model.status]}}</cover-view>
        <cover-view class="title-cover-view line1">{{model.activityName}}</cover-view>
      </cover-view>

      <cover-view class="ul fc-8c fs-18">
        <cover-view class="li">
          <cover-image
            src="//cdn.quxin.chat/icon/lookInterest/card-date.png"
            mode="scaleToFill"
            class="icon"
          />
          <cover-view>{{
						dateFormat(model)
					}}</cover-view>
        </cover-view>
        <cover-view class="li">
          <cover-image
            src="//cdn.quxin.chat/icon/lookInterest/card-address.png"
            mode="scaleToFill"
            class="icon"
          />
          <cover-view>{{model.userLocation}}</cover-view>
        </cover-view>
        <cover-view class="li li-last">
          <cover-image
            src="//cdn.quxin.chat/icon/lookInterest/card-remark.png"
            mode="scaleToFill"
            class="icon"
          />
          <cover-view class="tx-over2 activity-remark">{{model.activityRemarks}}</cover-view>
        </cover-view>
      </cover-view>
      <cover-view class="mark justify-between align-center">
        <cover-view class="count">{{model.handInNum}}人已加入</cover-view>
        <cover-view class="btns align-center">
          <cover-view class="btn" aria-role="button">详情</cover-view>
          <cover-view class="btn" aria-role="button">报名</cover-view>
        </cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script>
import {ActivityStatusLableEnum} from '@/constant/activity.js'
export default {
  name: 'ActivityCard',
	props: {
		model: {
			type: Object,
			default: ()=>{}
		}
	},
  data(){
    return {
			ActivityStatusLableEnum
    }
  },
	methods:{
		dateFormat(model){
			const m = {0 : '每天', 1: '每周', 2: '每月'}
			const r = (m[model.repeatFlag]  || '') + ' '
			return  r + model.activityBeginTime + '' + (model.activityEndTime ? '~' + model.activityEndTime : '')
		}
	}
}
</script>

<style lang="scss" scoped>
.card{
  position: relative;
  z-index: 11111;

  width: 602rpx;
  height: 306rpx;
  box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(166,155,186,0.4);
  opacity: 0.96;
  border-radius: 33rpx;
  box-sizing: border-box;
  padding: 27rpx 16rpx 20rpx 30rpx;
}
.poster{
  width: 189rpx;
  height: 251rpx;
  background: #C089F3;
  border-radius: 9rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}
.cont{
  overflow: hidden;
}
.tag{
    background-color: #ADDB34;
    padding: 4rpx 0;
    border-radius: 100rpx;
    font-size: 20rpx;
    margin-right: 10rpx;
    width: 80rpx;
    flex-shrink: 0;
		text-align: center;
}
.title{
  overflow: hidden;
  white-space: nowrap;
}
.title-cover-view{
  font-weight: bold;
  color: #24223C;
  font-size: 22rpx;
}
.ul{
  .li{
    padding: 12rpx 0;
    border-bottom: 1rpx dashed #eee;
    display: flex;
		&-last{
			overflow: hidden;
		}
		.activity-remark{
			line-height: 1.5em;
			max-height: 3em;
		}
  }
  .icon{
    width: 24rpx;
    height: 24rpx;
    flex-shrink: 0;
    margin-right: 19rpx;
  }
}
.mark{
  margin-top: 12rpx;
  .count{
    color: #828282;
    font-size: 18rpx;
    margin-right: 12rpx;
    flex: 1;
  }
  .btns{
    width: 225rpx;
    flex-shrink: 0;
    .btn{
      &::after{
        display: none;
      }
      width: 108rpx;
      height: 48rpx;
      line-height: 46rpx;
      font-size: 22rpx;
      color: #000;
      margin-right: 9rpx;
      padding: 0;
      border: 0;
      border-radius: 1000rpx;
      background-color: #EDEDED;
			text-align: center;
      &:last-child{
        margin-right: 0;
        color: #fff;
        background-color: #8A68F4;
      }
    }
  }
}
</style>