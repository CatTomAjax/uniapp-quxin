<template>
	<view class="container">
		<view class="safe-area-inset-bottom">
			<rider-curd
				v-model="form"
				:option="option"
				:data="list"
				:rules="rules"
				:readonly.sync="readonly"
				formType="uniForm"
				@search="onSearch"
				@action-click="onActionClick"
				@submit="onSubmit"
				@del="onRemove"
				ref="crud"
			>
				<template #form>
					<view class="uni-form">
						<view class="uni-form-item">
							<view class="uni-form-item-label uni-form-item-required">通知标题</view>
							<view class="uni-form-item-input">
								<input
									class="uni-input"
									v-model="form.title"
									placeholder="通知标题"
									:placeholder-style="placeholderStyle"
									:disabled="readonly"
								/>
							</view>
						</view>
						<view class="uni-form-item">
							<view class="uni-form-item-label uni-form-item-required">通知类型</view>
							<view class="uni-form-item-input">
								<picker
									@change="e => onConfirm(e, 'category')"
									:range="categoryList"
									range-key="dictValue"
									class="curdPicker"
									:disabled="readonly"
								>
									<input
										class="uni-input"
										v-model="formLabel.category"
										disabled
										placeholder="通知类型"
										:placeholder-style="placeholderStyle"
									/>
								</picker>
							</view>
							<view class="uni-form-item-icon"><u-icon name="arrow-right" color="#999" size="28"></u-icon></view>
						</view>
						<view class="uni-form-item">
							<view class="uni-form-item-label uni-form-item-required">通知日期</view>
							<view class="uni-form-item-input">
								<picker
									@change="e => onConfirm(e, 'releaseTime')"
									mode="date"
									:value="form.releaseTime"
									:start="startDate"
									:end="endDate"
									class="curdPicker"
									:disabled="readonly"
								>
									<input
										class="uni-input"
										v-model="form.releaseTime"
										disabled
										placeholder="通知日期"
										:placeholder-style="placeholderStyle"
									/>
								</picker>
							</view>
							<view class="uni-form-item-icon"><u-icon name="arrow-right" color="#999" size="28"></u-icon></view>
						</view>
						<view class="uni-form-item">
							<view class="uni-form-item-label">通知内容</view>
							<view v-if="!readonly" class="uni-form-item-btn" @click="onRichEdit(form.content)">去编辑</view>
						</view>
						<mp-html :content="form.content"></mp-html>
					</view>
				</template>
				<template #loadmore>
					<u-loadmore :status="loadStatus" @loadmore="getList()" />
				</template>
			</rider-curd>
		</view>
	</view>
</template>

<script>
import riderCurd from '@/components/rider-crud/index'
import mpHtml from '@/components/rider-crud/components/mp-html/mp-html'
import { getList, add, update, remove } from '@/api/notice.js'
import { dictionary } from '@/api/system/dict.js'
import { logo } from '../../common/setting'
import { getDicLabel } from '@/components/rider-crud/util/tool.js'
export default {
	components: { riderCurd, mpHtml },
	data() {
		return {
			form: {
				content: ''
			},
			formLabel: { 
				category: '' ,
			},
			list: [],
			params: {
				current: 1,
				size: 10
			},
			readonly: false, // 查看时控制表单只读
			labelWidth: 160,
			placeholderStyle: 'color:rgb(192, 196, 204); font-size:14px',
			option: {
				navTitle: 'CRUD 操作', //标题
				manageBtn: true, // 右上角管理按钮，默认不显示
				searchShow: true, //是否显示搜索，默认不显示
				column: [
					{
						label: '通知标题',
						prop: 'title'
					},
					{
						label: '通知类型',
						prop: 'categoryName'
					},
					{
						label: '通知日期',
						prop: 'releaseTime'
					}
				],
				actions: [
					{
						name: '编辑', // 操作名称
						icon: 'edit-pen', //操作图标，有图标文字不显示
						color: '#333', // 字体颜色
						fontsize: 30, //字体大小，单位rpx
						width: 40, // 宽度，单位px
						background: '#fff' // 菜单按钮背景色
					},
					{
						name: '删除',
						icon: 'trash',
						color: '#333',
						fontsize: 30,
						width: 40,
						background: '#fff'
					}
				]
			},
			rules: {
				title: [{ required: true, message: '请输入通知标题', trigger: 'blur' }],
				category: [{ required: true, message: '请选择通知类型', trigger: 'change', type: 'number' }],
				releaseTime: [{ required: true, message: '请选择通知日期', trigger: 'change' }]
			},
			loadStatus: 'loadmore', // 列表加载状态
			checkedSwitch: false,
			timeShow: false,
			timeParams: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: true
			},
			categoryShow: false,
			categoryList: [], //类型
			category: '',
			pagesTotal: 0
		}
	},
	computed: {
		startDate() {
			return this.getDate('start')
		},
		endDate() {
			return this.getDate('end')
		}
	},
	onShow() {
		let that = this
		uni.$on('richBack', function(data) {
			that.$set(that.form, 'content', data)
		})
	},
	onReady() {
		this.getList(true)
		this.getCategoryList()
	},
	onPullDownRefresh() {
		this.getList(true)
	},
	onReachBottom() {
		if (this.loadStatus == 'nomore') return
		this.getList()
	},
	methods: {
		getDate(type) {
			const date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			if (type === 'start') {
				year = year - 60
			} else {
				year = year + 2
			}
			month = month > 9 ? month : '0' + month
			day = day > 9 ? day : '0' + day
			return `${year}-${month}-${day}`
		},
		// 获取列表
		getList(override = false) {
			if (override) {
				this.params.current = 1
			}
			const { size } = this.params
			getList(this.params)
				.then(res => {
					const { records, current } = res.data
					if (records.length < size) this.loadStatus = 'nomore'
					else this.loadStatus = 'loadmore'
					if (override) {
						this.list = records
					} else {
						this.list = this.list.concat(records)
					}
					this.params.current++

					uni.stopPullDownRefresh()
				})
				.catch(err => {
					uni.stopPullDownRefresh()
				})
		},
		// 通知类型
		getCategoryList() {
			dictionary({ code: 'notice' }).then(res => {
				this.categoryList = res.data
			})
		},
		// picker确定
		onConfirm(e, type) {
			if (type == 'category') {
				const i = this.categoryList[e.detail.value]
				this.$set(this.formLabel, type, i.dictValue)
				this.$set(this.form, type, Number(i.dictKey))
			} else {
				this.$set(this.form, type, `${e.detail.value} 12:00:00`)
			}
		},
		// 编辑富文本
		onRichEdit(e) {
			uni.navigateTo({
				url: `/pages/rich/index?data=${e}`
			})
		},
		// 搜索 (自行配置搜索内容)
		onSearch(val) {
			this.params = {
				current: 1,
				size: 10,
				title: val
			}
			this.getList(true)
		},
		// 左滑按钮点击
		onActionClick({ index, data, action, done }) {
			const { name } = action
			switch (name) {
				case '新增':
					this.formLabel = { category: '' }
					done()
					break
				case '删除':
					this.onRemove(data.id)
					break
				case '查看':
					this.readonly = true
				case '编辑':
					this.formLabel.category = getDicLabel(data.category, this.categoryList)
					done()
					break
			}
		},
		// 删除
		onRemove(id) {
			uni.showModal({
				title: '确定要删除吗？',
				success: action => {
					if (action.confirm) {
						remove(id).then(() => {
							uni.showToast({
								title: '删除成功',
								icon: 'none'
							})
							setTimeout(() => {
								this.$refs['crud'].allCheckHide(false)
							}, 100)
							// #ifdef APP
							this.getList(true)
							// #endif
							// #ifndef APP
							uni.startPullDownRefresh({})
							// #endif
						})
					}
				}
			})
		},
		// 表单提交
		onSubmit(form, action, unloading, done) {
			if (action == '新增') {
				add(form)
					.then(res => {
						uni.showToast({
							title: '新增成功',
							icon: 'none'
						})
						this.formLabel = { category: '' }
						done()
						uni.startPullDownRefresh({})
					})
					.catch(() => {
						unloading()
					})
			} else if (action == '编辑') {
				update(form)
					.then(res => {
						uni.showToast({
							title: '编辑成功',
							icon: 'none'
						})
						this.formLabel = { category: '' }
						done()
						uni.startPullDownRefresh({})
					})
					.catch(() => {
						unloading()
					})
			}
		}
	}
}
</script>
<style>
page {
	background: #f6f6f6;
}

.uni-picker-container {
	z-index: 99999 !important;
}
</style>
<style lang="scss" scoped>
.nav-right {
	color: #fff;
	font-size: 28rpx;
	font-weight: normal;
	padding-right: 24rpx;
}

.uni-form {
	&-item {
		position: relative;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		font-size: 14px;
		color: #303133;
		line-height: 70rpx;
		box-sizing: border-box;

		&-label {
			width: 160rpx;

			.required {
				color: #fa3534;
				vertical-align: middle;
			}
		}

		&-required {
			position: relative;

			&:after {
				content: '*';
				position: absolute;
				left: -8px;
				color: #fa3534;
				vertical-align: middle;
			}
		}

		&-input {
			flex: 1;

			.uni-input {
				font-size: 14px;
				color: #303133;
			}
		}

		&-btn {
			color: #fff;
			width: auto;
			font-size: 22rpx;
			line-height: 50rpx;
			padding: 0 20rpx;
			border-radius: 6rpx;
			background: linear-gradient(rgb(95, 136, 255), rgb(105, 176, 255));
		}
	}

	&-item:after {
		content: ' ';
		border-bottom-width: 2rpx;
		position: absolute;
		left: 0;
		top: 0;
		pointer-events: none;
		box-sizing: border-box;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		width: 199.8%;
		height: 199.7%;
		-webkit-transform: scale(0.5, 0.5);
		transform: scale(0.5, 0.5);
		border: 0 solid #e4e7ed;
		z-index: 2;
	}

	&-item:after {
		border-bottom-width: 2rpx;
	}
}
</style>
