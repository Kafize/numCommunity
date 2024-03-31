<template>
	<view class="social-container">
		<view class="social-info">
			<image :src="imgUrl+'/prod-api'+socialInfo.imgUrl" mode=""></image>
			<view>发布人：{{socialInfo.publishName}}</view>
			<view>发布时间：{{socialInfo.publishTime}}</view>
			<view>发布内容：
				<view class="social-content">{{socialInfo.publishContent}}</view>
			</view>
			<view class="common-list">
				<view class="num"> {{socialInfo.commentNum}} </view> &nbsp;条评论 
				<van-icon name="arrow" color="#999"/>
			</view>
			<view class="question-list">
				<view class="question-content" v-for="(question,index) in questionList" :key="index">
					<view class="question-item">
						<image v-if="question.avater" :src="imgUrl+'/prod-api'+question.avater " mode=""></image>
						<image v-else src="../../static/images/avatar.png" mode=""></image>
						<view >
							<view class="common-right">
								<view>{{question.userName}} &nbsp; {{question.pulishTime}}</view>
								<view class="like-num">
									<image src="../../static/images/like.png" mode=""></image>
									<view>{{question.likeNum}}</view>
									<!-- <van-icon name="good-job-o" size="20px"/><view class="totle-num"></view> -->
								</view>
							</view>
							<view>{{question.content}}</view>
						</view>
					</view>
				</view>
				<view>
					追问：
					<textarea style="height: 100rpx;" v-model="answer" placeholder="输入追问问题"/>
				</view>
			</view>
			
			<view class="sub-btn" @click="sendBtn">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				questionList:[],
				answer:'',
				socialId:11,
				socialInfo:{},
				id:0,
				imgUrl:''
			}
		},
		onLoad(option) {
			var self = this;
			self.imgUrl = self.$url;
			self.id = option.id
			self.socialData(self.id);
		},
		methods: {
			socialData(n){
				var that = this;
				that.$request.get(`/prod-api/api/community/friendly_neighborhood/${n}`).then(res=>{
					console.log(res)
					that.socialInfo = res.data.data;
					that.questionList = res.data.data.userComment;
				})
			},
				sendBtn(){
					console.log(this.answer)
					if(this.answer){
						this.$request.post("/prod-api/api/community/friendly_neighborhood/add/comment",{
							neighborhoodId:this.id,
							content:this.answer
						}).then(res=>{
							console.log(res)
							if(res.data.code==200){
								this.socialData(this.id);
								this.answer = "";
							}
						})
					}
					
				}
		}
	}
</script>

<style lang="scss" scoped>
.social-container{
	padding: 20rpx;
	color: #000;
	line-height: 80rpx;
	font-size: 28rpx;
	image{
		border-radius: 10rpx;
		width: 100%;
		height: 400rpx;
	}
	textarea{
		width: 80%;
		height: 150rpx;
		border: 1rpx solid #efefef;
		text-indent: 1em;
		font-size: 28rpx;
		color: #999;
		margin-left: 50rpx;
	}
	.social-content{
		text-indent: 2em;
		color: #999;
		line-height: 60rpx;
	}
	.common-list{
		display: flex;
		align-items: center;
	}
	.num{
		color: #f00;
		display: inline;
	}
	.answer-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 40rpx;
		font-size: 24rpx;
		view:nth-child(1){
			width: 500rpx;
			margin-left: 20rpx;
		}
	}
	.question-list{
		margin-left: 30rpx;
		.question-item{
			display: flex;
			// justify-content: space-between;
			align-items: center;
			line-height: 40rpx;
			font-size: 24rpx;
			image{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.common-right{
				width: 550rpx;
				height: 60rpx;
				align-items: center;
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				.like-num{
					display: flex;
					align-items: center;
					font-size: 24prx;
					color: #999;
					image{
						width: 40rpx;
						height: 40rpx;
					}
					.totle-num{
						margin-left: 10rpx;
						color: #1890FF;
					}
				}
			}
		}
	}
	.sub-btn{
		width: 80%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
		background-color: #1890FF;
		border-radius: 10rpx;
		margin: 20rpx auto;
	}
}
</style>
