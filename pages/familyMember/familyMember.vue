<template>
	<view>
		<view class="family-top">{{communityName}}</view>
		<view class="family-content">
			<view class="family-list" v-for="(item,index) in familyList" :key="index">
					<image :src="imgUrl+'/prod-api'+item.imgUrl" mode=""></image>
					<view class="family-info" @click="goDetail(item.id)">
						<view class="relation">
							<view>{{item.name}}</view>
							<view class="family-icon">{{item.householdType}}</view>
						</view>
						<view class="desc">{{item.phone}}</view>
						<view class="desc">有效期：{{item.period}}</view>
					</view>
				<view class="family-right" @click="delMember(item.id)">删除</view>
			</view>
			<view class="addMember" @click="addFamily">+新增家庭成员</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				communityName:'',
				familyList:[],
				imgUrl:''
			};
		},
		onLoad() {
			this.imgUrl = this.$url
			this.getCommunity();
			this.familyData();
		},
		methods:{
			getCommunity(){
				this.$request.get('/prod-api/api/community/community/1').then(res=>{
					console.log(res)
					this.communityName = res.data.data.name
				})
			},
			familyData(){
				this.$request.get('/prod-api/api/community/member—family/list').then(res=>{
					console.log(res);
					this.familyList = res.data.rows;
				})
			},
			addFamily(){
				uni.navigateTo({
					url:"/pages/addFamily/addFamily"
				})
			},
			// 删除
			delMember(n){
				uni.showModal({
					title: '提示',
					content: '确定要删除吗',
					success: function (res) {
						if (res.confirm) {
							this.$request.del(`/prod-api/api/community/member—family/${n}`).then(res=>{
								console.log(res)
								if(res.data.code==200){
									this.familyData();
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)
				});
				
			},
			goDetail(val){
				uni.navigateTo({
					url:'/pages/familyDetail/familyDetail?id='+val
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.addMember{
		width: 80%;
		margin:  auto;
		margin-bottom: 30rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		background-color: #1296db;
		color: #fff;
		border-radius: 10rpx;
		font-size: 28rpx;
	}
	.family-top{
		width: 100%;
		height: 200rpx;
		background-color: #1296db;
		border-radius: 0 0 20rpx 20rpx;
		color: #fff;
		text-indent: .6em;
		line-height: 100rpx;
		position: relative;
		z-index: -1;
	}
	.family-content{
		padding: 30rpx;
		margin-top: -120rpx;
		.family-list{
			position: relative;
			margin-bottom: 30rpx;
			box-shadow: 0 0 10rpx #ccc;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			display: flex;
			.family-right{
				position: absolute;
				top: 30rpx;
				right: 20rpx;
				width: 90rpx;
				text-align: center;
				line-height: 46rpx;
				height: 46rpx;
				border: 1px  solid crimson;
				border-radius: 10rpx;
				font-size: 26rpx;
				color: crimson;
			}
				image{
					width: 160rpx;
					height: 160rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}
				.family-info{
					.relation{
						display: flex;
						align-items: center;
						height: 70rpx;
						.family-icon{
							background-color: rgba(144, 247, 175, .3);
							color: #42d338;
							font-size: 24rpx;
							padding: 6rpx 14rpx;
							border-radius: 10rpx;
							margin-left: 20rpx;
						}
					}
					.desc{
						color: #999;
						line-height: 40rpx;
						font-size: 26rpx;
					}
				}
		}
	}
</style>
