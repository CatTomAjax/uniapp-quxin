<template>
	<view class="tablist">
		<v-tabs v-model="currentTab" :field="s_key" :tabs="tabs" @change="change" line-height="0" activeColor="#000" height="100rpx" pillsColor="#D6F389" color="#757575" fontSize="28rpx" pillsBorderRadius="10000rpx" class="tab" bgColor="#FBF8FF" activeBgColor="#D6F389"></v-tabs>
	</view>
</template>

<script>
	export default{
		name: 'ChannelTablist',
		props: {
			// 当前选中id
			currentId: {
				type: Number | String,
				default: 0
			},
			// 当前作为选中的索引key
			eq_key: {
				type: String,
				default: 'id'
			},
			// tab item 显示文案索引
			s_key: {
				type: String,
				default: 'myfun'
			},
			tabs: {
				type: Array,
				default:()=> []
			}
		},
		data(){
			return {
				currentTab: -1, // 当前选中索引
				// tabs: [
				// 	{ id: 1, name: '篮球', disabled: false, showBadge: !0, count: 99 },
				// 	{ id: 2, name: '足球', disabled: false, showBadge: !0, count: 1 }
				// ],
			}
		},
		created(){
			this.currentTab = this.tabs.findIndex(item => item[this.eq_key] === this.currentId)
		},
		methods: {
			change(index) {
				index > -1 && this.$emit('change', index, this.tabs[index])
			}
		}
	}
</script>

<style>
</style>