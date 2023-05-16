/**
 * 活动类型 0交友 1活动 2公益
 */
export const ActivityTypeEnum = {
	makeFriend: 0,
	activity: 1,
	public: 2
}
/**
 * 是否交友标识 0(默认不交友) 1(发布活动即)交友
 */
export const MakeFriendsFlagEnum = {
	no: 0,
	yes: 1
} 
/**
 * 活动状态 0进行中 1已截止
 */
export const ActivityStatusEnum = {
	running: 0,
	over: 1
}

export const ActivityStatusLableEnum = {
	[ActivityStatusEnum.running]: '进行中',
	[ActivityStatusEnum.over]: '已截止'
}
// 兴趣页tabbar类型
export const InterestTabbarType = {
	see: 0, // 看看
	shake: 1, // 摇人
	channel: 2 // 频道
}