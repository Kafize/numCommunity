<template>
	<view class="social-content">
		<view class="social-list" v-for="(item,index) in socialList" :key="index" @click="goDetail(item.id)">
			<image :src="imgUrl+'/prod-api'+item.imgUrl" mode=""></image>
			<view class="social-bottom">
				<view class="bottom-left">
					<view class="txt">{{item.publishName}}</view>
				</view>
				<view class="bottom-right">
					<van-icon name="like-o" color="#999999"/>
					<view class="txt">{{item.likeNum}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				socialList:[],
				imgUrl:''
			};
		},
		onLoad() {
			this.imgUrl = this.$url;
			this.socialData()
		},
		methods:{
			socialData(){
				this.$request.get('/prod-api/api/community/friendly_neighborhood/list').then(res=>{
					// console.log(res);
					this.socialList = res.data.rows;
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'/pages/socialDetail/socialDetail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.social-content{
		padding: 20rpx;
		display: flex;
		flex-wrap: wrap;
		.social-list{
			width: 44%;
			padding: 1%;
			margin: 2%;
			height: 480rpx;
			box-shadow: 0 0 10rpx #ccc;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
			image{
				width: 100%;
				height: 420rpx;
				border-radius: 10rpx;
				border: 1px solid #efefef;
			}
			.social-bottom{
				line-height: 60rpx;
				display: flex;
				justify-content: space-between;
				.bottom-left,.bottom-right{
					display: flex;
					align-self: center;
					font-size: 28rpx;
					image{
						width: 20rpx;
						height: 20rpx;
					}
					.txt{
						margin-left: 10rpx;
						&:nth-child(2){
							color: #999;
						}
					}
				}
			}
		}
	}
</style>
