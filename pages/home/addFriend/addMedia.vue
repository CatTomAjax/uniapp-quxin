<template>
	<view class="page">
		<view class="upload">
			<u-upload 
			:file-list="fileList" 
			:auto-upload="false"
			@on-success="onUploadSuccess" 
			name="files" 
			:max-count="6" 
			:max-size="10 * 1024 * 1024" 
			@on-remove="onRemove" 
			:previewFullImage="true" 
			:uploadIconColor="'#fff'" 
			:uploadText="false"  
			custom-btn 
			width="234" 
			height="234" 
			:header="header" 
			:before-upload="onBeforeUpload" @on-choose-complete="onChooseComplete">
				<template v-slot:addBtn>
					<view class="add">
						<u-icon name="plus" class="plus" color="#fff" size="40"></u-icon>
					</view>
				</template>
			</u-upload>			
		</view>
		<view class="tip">出彩的照片视频可帮你获得更多关注；图片限制每张最大10M视频限制每个最大30M，最多可上传6个附件。</view>
		<view class="btns">
			<view @click="goBack" class="btn cancel">返回</view>
			<view @click="submit" class="btn ok">保存</view>
		</view>
	</view>
</template>

<script>
	// 摇人->添加兴趣靓颖
	import { common } from '@/api/commonapi/common.js'
import { getToken } from '../../../utils/global-utils';
	export default{
		name: 'AddMedia',
		data(){
			return {
				fileList: [],
				header: {
					// 'Blade-Auth': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwicG9zdF9pZCI6IjExMjM1OTg4MTc3Mzg2NzUyMDEiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwidXNlcl9uYW1lIjoiYWRtaW4iLCJuaWNrX25hbWUiOiLnrqHnkIblkZgiLCJkZXRhaWwiOnsidHlwZSI6IndlYiJ9LCJ0b2tlbl90eXBlIjoiYWNjZXNzX3Rva2VuIiwiZGVwdF9pZCI6IjExMjM1OTg4MTM3Mzg2NzUyMDEiLCJhY2NvdW50IjoiYWRtaW4iLCJjbGllbnRfaWQiOiJzd29yZCIsImV4cCI6MTY4MzYxNzE3NiwibmJmIjoxNjgzNjEzNTc2fQ.4UwnLVscLpA1hreEPD3yE8gGOb7zbgIlj6P9YHaLmT0gmrH3ST5A8xmS7o-eG_nVWufHfl1hlTBY0Zs6O7Azjw' + getToken(),
					// 'Authorization': `Basic c3dvcmQ6c3dvcmRfc2VjcmV0`,
					// 'Tenant-Id': `000000`,
					// 'Content-type': 'multipart/form-data'
				}
			}
		},
		methods: {
			onRemove(index) {
				this.fileList.splice(index, 1)
			},
			onChooseComplete(list){
				console.log('[onChooseComplete]', list);
				this.fileList = list
			},
			goBack(){
				uni.navigateBack()
			},
			async submit(){
				uni.$emit('addFriend:updateFileList', this.fileList)
				uni.navigateBack()
			},
			onBeforeUpload(index, list){
				return true
			},
			// 上传成功
			onUploadSuccess(data, index, lists, name){
				console.log('[onUploadSuccess]',data, index, lists, name);
				if(data.code === 200){
					// 上传成功的链接
					lists[index].realUrl = data.data
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: '/blade-resource/attach/upload',
						filePath: url,
						name: 'file',
						formData: {
							id: Date.now()
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page{
		padding: 14rpx 0;
	}
	.tip{
		text-align: center;
		font-size: 28rpx;
		color: #8c8c8c;
		margin: 78rpx 42rpx 200rpx;
	}
	.add{
		background-color: #F2F2F2;
		width: 234rpx;
		height: 234rpx;
		border-radius: 33rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(237,224,254,0.18);
	}
	.upload{
		margin: 0 42rpx;
		::v-deep 	.u-list-item{
			border-radius: 33rpx;
			margin: 0 16rpx 16rpx 0;
		}
	}
.btns{
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
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
</style>