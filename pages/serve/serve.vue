<template>
	<view class="server-content">
		<view class="invite" @click="inviteFamily">+邀请家属</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			inviteFamily(){
				uni.navigateTo({
					url:'/pages/familyMember/familyMember'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.server-content{
		padding: 100rpx 30rpx;
		text-align: center;
		.invite{
			width: 240rpx;
			border-radius: 10rpx;
			line-height: 70rpx;
			margin: 50rpx auto;
			font-size: 32rpx;
			color: #1296db;
			border: 1px solid #1296db;
		}
	}
</style>
