<template>
	<view class="notice-container">
		<view class="notice-top">
			<view class="nav-item" :class="active==1 ? 'active':''" @click="navChange(1)">全部</view>
			<view class="nav-item" :class="active==2 ? 'active':''" @click="navChange(2)">未读</view>
			<view class="nav-item" :class="active==3 ? 'active':''" @click="navChange(3)">已读</view>
		</view>
		<view class="notice-content" v-if="active==1"  >
			<view v-for="(item,index) in noticeList" :key="index" class="notice-item">
				<view class="top-list">
					<view>消息通知</view>
					<view class="read-state" :class="item.noticeStatus ? '':'readed'"> {{item.noticeStatus==1 ? '已读' : '未读'}}</view>
				</view>
				<view class="notice-desc">{{item.contentNotice}}</view>
				<view class="notice-bottom">
					<view class="time">{{item.createTime}}</view>
					<view class="detail"  @click="goDetail(item.id)">查看详情</view>
				</view>
			</view>
		</view>
		<view class="notice-content" v-if="active==2"  >
			<view v-for="(item,index) in noticeList" :key="index" class="notice-item">
				<view class="top-list">
					<view>消息通知</view>
					<view class="read-state readed" > 未读</view>
				</view>
				<view class="notice-desc">{{item.contentNotice}}</view>
				<view class="notice-bottom">
					<view class="time">{{item.createTime}}</view>
					<view class="detail" @click="goDetail(item.id)">查看详情</view>
				</view>
			</view>
		</view>
		<view class="notice-content" v-if="active==3"  >
			<view v-for="(item,index) in noticeList" :key="index" class="notice-item">
				<view class="top-list">
					<view>消息通知</view>
					<view class="read-state">已读</view>
				</view>
				<view class="notice-desc">{{item.contentNotice}}</view>
				<view class="notice-bottom">
					<view class="time">{{item.createTime}}</view>
					<view class="detail" @click="goDetail(item.id)">查看详情</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:1,
				noticeList:[]
			};
		},
		onLoad() {
			this.noticeData();
		},
		methods:{
			navChange(n){
				this.active = n;
				if(n==1){
					this.noticeData('');
				}else if(n==2){
					this.noticeData(0);
				}else if(n==3){
					this.noticeData(1);
				}
			
			},
			noticeData(n=''){
				this.$request.get('/prod-api/api/community/community_notice/list?noticeStatus='+n).then(res=>{
					this.noticeList = res.data.rows;
				})
			},
			goDetail(val){
				uni.navigateTo({
					url:"/pages/noticeDetail/noticeDetail?id="+val
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice-container{
		padding: 20rpx;
		background-color: #f5f5f5;
		.notice-top{
			width: 85%;
			line-height: 60rpx;
			padding: 0 60rpx;
			background-color: #fff;
			border-radius: 50rpx;
			margin: 20rpx auto;
			display: flex;
			justify-content: space-between;
			text-align: center;
			font-size: 30rpx;
			.nav-item{
				width: 18%;
			}
			.active{
				color: #1296db;
				border-bottom: 6rpx solid #1296db;
			}
		}
		.notice-content{
			border-radius: 10rpx;
			.notice-item{
				margin-bottom: 20rpx;
				background-color: #fff;
				padding: 20rpx;
				border-radius: 20rpx;
			}
			.top-list{
				display: flex;
				justify-content: space-between;
				line-height: 80rpx;
				align-items: center;
				.read-state{
					font-size: 28rpx;
					color: #666;
				}
				.readed{
					color: #00cf00;
				}
			}
			.notice-desc{
				font-size: 26rpx;
				padding: 20rpx 0 30rpx 0;
				border-bottom: 1px solid #ccc;
				border-top: 1px solid #ccc;
				line-height: 46rpx;
			}
			.notice-bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 70rpx;
				.time{
					font-size: 26rpx;
					color: #ccc;
				}
				.detail{
					color: blue;
					font-size: 32rpx;
				}
			}
		}
	}
</style>
