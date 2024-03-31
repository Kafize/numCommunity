<template>
	<view class="notice-detail">
		<view class="info">
			<view class="info-left">公告标题：</view>
			<view>{{noteInfo.noticeTitle}}</view>
		</view>
		<view class="info">
			<view class="info-left">发布时间：</view>
			<view>{{noteInfo.createTime}}</view>
		</view>
		<view class="notice">
			通知内容：
			<view class="desc">{{noteInfo.contentNotice}}</view>
		</view>
		<view class="info">
			<view class="info-left">发布单位：</view>
			<view>{{noteInfo.releaseUnit}}</view>
		</view>
		<view class="info">
			<view class="info-left">联系电话：</view>
			<view>{{noteInfo.phone}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noteInfo:{}
			};
		},
		onLoad(option) {
			// this.state = option.id;
			this.noteData(option.id)
		},
		methods:{
			noteData(n){
				this.$request.get(`/prod-api/api/community/community_notice/${n}`).then(res=>{
					// console.log(res);
					this.noteInfo = res.data.data;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.notice-detail{
		padding: 20rpx;
		.notice{
			font-size: 30rpx;
			margin-top: 20rpx;
			border-bottom: 1px solid #ccc;
			padding-bottom: 20rpx;
			.desc{
				text-indent: 2em;
				line-height: 60rpx;
				font-size: 28rpx;
			}
		}
		.info{
			display: flex;
			font-size: 30rpx;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #ccc;
			color: #999;
			line-height: 80rpx;
			.info-left{
				color: #333;
				margin-right: 20rpx;
			}
		}
	}
</style>
