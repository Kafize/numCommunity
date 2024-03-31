<template>
	<view>
		<view class="add-info">
			<view class="add-item">
				<view class="left-info">房屋信息：</view>
				<view class="right-info">
					<picker @change="houseChange" mode = selector :value="hIndex"  range-key="name" :range="houseList">
						<view class="uni-input">{{houseList[hIndex].name}}</view>
					</picker>
				</view>
			</view>
			<view class="add-item">
				<view class="left-info">住户类型：</view>
				<view class="right-info">
					<picker @change="typeChange" :value="index" :range="typeArr">
						<view class="uni-input">{{typeArr[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="add-item">
				<view class="left-info">姓名：</view>
				<input type="text" placeholder="请输入姓名" v-model="name">
			</view>
			<view class="add-item">
				<view class="left-info">性别：</view>
				<radio-group @change="sexChange" class="sex-list">
					<label class="choose-sex" v-for="(item, index) in sexItem" :key="index">
							<radio :value="item.value" :checked="index === current" />
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<view class="add-item">
				<view class="left-info">手机号：</view>
				<input type="text" placeholder="请输入手机号" v-model="phone">
			</view>
			<view class="add-item">
				<view class="left-info">身份证号：</view>
				<input type="text" placeholder="请输入身份证号" v-model="idCard">
			</view>
			<view class="save-btn" @click="saveInfo">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexItem:[
					{ value: '男', name: '男',checked: 'true'},
					{ value: '女',name: '女'},
				],
				index:0,
				current: 0,
				typeArr:['住户','租户','户主'],
				houseList:[],
				hIndex:0,
				name:'',
				gander:'',
				phone:'',
				idCard:'',
			};
		},
		onLoad() {
			this.houseData();
		},
		methods:{
			// 住户类型
			typeChange(e){
				this.index = e.detail.value;
			},
			sexChange(e){
				console.log(e)
				this.gander = e.detail.value
			},
			houseData(){
				this.$request.get('/prod-api/api/community/house/list').then(res=>{
					console.log(res);
					this.houseList = res.data.rows;
				})
			},
			houseChange(e){
				this.hIndex = e.detail.value;
			},
			saveInfo(){
				this.$request.post('/prod-api/api/community/member—family',{
					householdType:this.typeArr[this.index],
					name:this.name,
					gander:this.gander,
					phone:this.phone,
					idCard:this.idCard,
					period:'长期有效',
					imgUrl:'/profile/upload/2023/04/23/aff11349-0af2-42f2-b6cf-6936333f8bd5.jpg'
				}).then(res=>{
					console.log(res)
					if(res.data.code==200){
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/familyMember/familyMember"
							})
						},2000)
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.save-btn{
	width: 80%;
	margin:  auto;
	margin-top: 80rpx;
	height: 70rpx;
	text-align: center;
	line-height: 70rpx;
	background-color: #1296db;
	color: #fff;
	border-radius: 10rpx;
	font-size: 28rpx;
}
.add-info{
	padding: 20rpx;
	.add-item{
		display: flex;
		align-items: center;
		height: 100rpx;
		border-bottom: 1px solid #ccc;
		.left-info{
			width: 160rpx;
			text-align: right;
			font-size: 30rpx;
			margin-right: 10rpx;
		}
		input{
			height: 80rpx;
		}
		.sex-list{
			display: flex;
			align-items: center;
		}
		.choose-sex{
			display: flex;
			margin-right: 20rpx;
		}
	}
}
</style>
