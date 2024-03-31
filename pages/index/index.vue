<template>
	<view class="content">
		<view class="home-name">{{communityName}}</view>
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots="true" autoplay="true" :interval="1000" duration="500">
				<swiper-item v-for="(item,index) in bannerList" :key="index" @click="goNewsDetail(item.id)">
					<image :src="imgUrl+'/prod-api'+item.advImg" mode="" style="width: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>
		<van-notice-bar scrollable :text="notice"/>
		<view class="serve-content">
			<view class="serve-list" v-for="(item,index) in serveList" :key="index" @click="goNotice(index)">
				<view class="serve-icon"> <image :src="imgUrl+'/prod-api'+item.imgUrl" mode=""></image></view>
				<view>{{item.name}}</view>
			</view>
		</view>
		<!-- 社区活动 -->
		<view class="community">
			<view class="top">社区活动</view>
			<view class="scroll-content">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
					<view class="scroll-view-item_H" v-for="(item,index) in activityList" :key="index">
						<view class="scroll-list">
							<image :src="imgUrl+'/prod-api'+item.imgUrl" mode=""></image>
							<view class="scroll-right">
								<view class="name van-ellipsis">{{item.comCategory}}</view>
								<view class="distance">距离{{item.comDistance}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 社区动态 -->
		<view class="community">
			<view class="top">社区动态</view>
			<view class="scroll-content">
				<view class="scroll-item" v-for="(item,index) in dynamicList" :key="index">
					<view class="scroll-right">
						<view class="name van-ellipsis">{{item.titile}}</view>
						<view class="num">评论数：{{item.number}}</view>
						<view class="time">发布时间：{{item.createTime}}</view>
					</view>
					<image :src="imgUrl+'/prod-api'+item.imgUrl" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList:[],
				communityName:'',
				imgUrl:'',
				notice:'',
				serveList:[],
				// 活动
				activityList:[],
				// 动态
				dynamicList:[],
			}
		},
		onLoad() {
			this.imgUrl = this.$url
			this.getComm();
			this.getBanner();
			this.noticeInfo();
			this.serveData();
			this.activityData();
			this.dynamicData();
		},
		methods: {
			getBanner() {
				this.$request.get("/prod-api/api/rotation/list?Num=1&pageSize=8").then(res => {
					// console.log(res);
					this.bannerList = res.data.rows;
				})
			},
			// 获取社区
			getComm(){
				this.$request.get("/prod-api/api/community/community/1").then(res=>{
					// console.log(res)
					this.communityName = res.data.data.name;
				})
			},
			goNotice(n){
				if(n==0){
					uni.navigateTo({
						url:"/pages/notice/notice"
					})
				}
			},
			// 通知
			noticeInfo(){
				this.$request.get("/prod-api/api/community/community_notice/1").then(res=>{
					// console.log(res);
					this.notice = res.data.data.contentNotice
				})
			},
			// 快捷服务
			serveData(){
				this.$request.get("/prod-api/api/community/community-express/list").then(res=>{
					console.log(res)
					this.serveList = res.data.rows
				})
			},
			// 社区活动
			activityData(){
				this.$request.get('/prod-api/api/community/community-activity/activity-list').then(res=>{
					// console.log(res);
					this.activityList = res.data.rows;
				})
			},
			// 社区动态
			dynamicData(){
				this.$request.get('/prod-api/api/community/community-activity/dynamic-list').then(res=>{
					// console.log(res);
					this.dynamicList =res.data.rows;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@mixin flex-name($val: flex-start) {
		display: flex;
		justify-content: $val;
	}
	.home-name{
		font-weight: bold;
		font-size: 32rpx;
		line-height: 70rpx;
		text-indent: 1em;
	}
	.serve-content{
		display: flex;
		flex-wrap: wrap;
		.serve-list{
			width: 25%;
			height: 200rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 28rpx;
			color: #999;
			margin-top: 16rpx;
			.serve-icon{
				width: 90rpx;
				height: 90rpx;
				text-align: center;
				margin: 20rpx auto;
				border-radius: 50%;
				border: 1px solid #ccc;
				image{
					width: 50rpx;
					height: 50rpx;
					margin-top: 20rpx;
				}
			}
			
		}
	}
	.community {
		padding: 20rpx;
		margin-top: 30rpx;
		.top {
			font-size: 36rpx;
			line-height: 50rpx;
			border-left: 10rpx solid #1890FF;
			text-indent: .6rem;
			font-weight: bold;
		}
		.scroll-content {
			.scroll-view_H {
				white-space: nowrap;
				width: 100%;
				margin-top: 40rpx;
	
				.scroll-view-item_H {
					display: inline-block;
					width: 340rpx;
					padding: 20rpx;
					margin-right: 20rpx;
					border-radius: 10rpx;
					border: 1rpx solid #ddd;
					.scroll-list {
						@include flex-name();
					}
	
					image {
						width: 150rpx;
						height: 150rpx;
						margin-right: 20rpx;
					}
					.scroll-item {
						width: 100%;
						@include flex-name(space-between);
					}
					.scroll-right {
						width: 160rpx;
						position: relative;
						.name {
							font-size: 32rpx;
							font-weight: bold;
						}
	
						.distance {
							position: absolute;
							bottom: 20rpx;
							font-size: 26rpx;
							color: #999;
						}
	
						.num {
							font-size: 28rpx;
							line-height: 70rpx;
							color: #999;
						}
	
						.time {
							font-size: 28rpx;
							line-height: 60rpx;
							color: #999;
						}
					}
				}
			}
	
			.scroll-item {
				@include flex-name(space-between);
				box-shadow: 0 0 10rpx #ccc;
				margin-top: 20rpx;
				padding: 20rpx;
				border-radius: 10rpx;
				image {
					width: 140rpx;
					height: 180rpx;
					margin-right: 30rpx;
				}
				.scroll-right {
					position: relative;
					.name {
						font-size: 34rpx;
						font-weight: bold;
					}
					.num {
						font-size: 28rpx;
						line-height: 70rpx;
						color: #999;
					}
					.time {
						font-size: 28rpx;
						line-height: 60rpx;
						color: #999;
					}
				}
			}
		}
	}
</style>
